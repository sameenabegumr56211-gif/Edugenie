import type { GeminiResponse, TaskType } from '@/types';

const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/edugenie-ai`;

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
};

export async function callEduGenie(task: TaskType, input: string): Promise<GeminiResponse> {
  const response = await fetch(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ task, input }),
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.error) message = errorBody.error;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  const data = await response.json();
  if (data?.error) throw new Error(data.error);
  if (!data?.result) throw new Error('Received an unexpected response from the server.');

  return data as GeminiResponse;
}
