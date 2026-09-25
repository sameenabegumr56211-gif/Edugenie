import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-3.5-flash";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

async function getGeminiApiKey(): Promise<string> {
  if (!supabase) throw new Error("Server is not properly configured.");
  const { data, error } = await supabase
    .from("app_secrets")
    .select("key_value")
    .eq("key_name", "GEMINI_API_KEY")
    .maybeSingle();
  if (error) throw new Error(`Failed to read API key: ${error.message}`);
  if (!data?.key_value) throw new Error("Gemini API key is not configured.");
  return data.key_value;
}

interface RequestBody {
  task: "explain" | "qa" | "quiz" | "summarize" | "path";
  input: string;
}

function buildPrompt(task: string, input: string): string {
  switch (task) {
    case "explain":
      return `You are EduGenie, a friendly educational assistant. Explain the following topic in simple, beginner-friendly language. Use clear structure with headings and bullet points where helpful. Keep it concise but thorough.\n\nTopic: ${input}`;
    case "qa":
      return `You are EduGenie, a knowledgeable educational assistant. Answer the following question clearly and accurately. Provide context where helpful. Keep it concise.\n\nQuestion: ${input}`;
    case "quiz":
      return `You are EduGenie, a quiz generator. Generate 5 multiple-choice questions based on the following topic or passage. Return ONLY a valid JSON array with no markdown formatting, no code blocks, no backticks. Each question object must have exactly this shape:\n{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"..."}\n\nTopic or passage: ${input}`;
    case "summarize":
      return `You are EduGenie, a summarization assistant. Summarize the following text into key points that are easy to revise. Use bullet points. Keep important details but remove filler.\n\nText: ${input}`;
    case "path":
      return `You are EduGenie, a learning path generator. Create a structured learning path for the following topic from beginner to advanced. Return ONLY a valid JSON array with no markdown formatting, no code blocks, no backticks. Each step object must have exactly this shape:\n{"level":"Beginner|Intermediate|Advanced","topics":["..."],"duration":"...","resources":["..."]}\n\nTopic: ${input}`;
    default:
      return input;
  }
}

async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}

function tryParseJson(text: string): unknown[] | null {
  try {
    const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = await getGeminiApiKey();

    const body: RequestBody = await req.json();
    const { task, input } = body;

    if (!task || !input || typeof input !== "string" || input.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "A task type and non-empty input are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const prompt = buildPrompt(task, input);
    const rawText = await callGemini(prompt, apiKey);

    let responseBody: Record<string, unknown> = { result: rawText };

    if (task === "quiz") {
      const quiz = tryParseJson(rawText);
      if (quiz) responseBody = { result: "Quiz generated successfully.", quiz };
      else responseBody = { result: rawText };
    } else if (task === "path") {
      const path = tryParseJson(rawText);
      if (path) responseBody = { result: "Learning path created successfully.", path };
      else responseBody = { result: rawText };
    }

    if (supabase) {
      await supabase.from("edugenie_history").insert({
        task_type: task,
        user_input: input.trim(),
        response: responseBody,
      });
    }

    return new Response(
      JSON.stringify(responseBody),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
