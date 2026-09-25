# EduGenie

EduGenie is a Google Gemini-powered learning assistant designed to make studying simpler, more interactive, and more accessible. It is planned as a lightweight study companion for students at different levels.

> **Project status:** The frontend foundation is in place. Gemini-powered features will be connected after the API key and backend integration are provided.

## Planned capabilities

- Ask questions and receive clear academic or general-knowledge answers
- Explain difficult topics in beginner-friendly language
- Generate multiple-choice quizzes from a topic or passage
- Summarize long educational content into revision-ready notes
- Create structured learning paths from beginner to advanced level
- Recommend useful learning topics and resources

## Product flow

1. A student selects a learning task.
2. The student enters a question, topic, or passage.
3. The application sends the request to the matching AI feature.
4. Gemini processes the request through the backend.
5. The result is displayed in the learning interface.

## Planned feature modules

| Module | Purpose |
| --- | --- |
| Question and Answer | Answers academic and general questions with context-aware responses |
| Explanation | Breaks complex concepts into simple, readable explanations |
| Quiz Generation | Creates multiple-choice questions with answer options |
| Summarization | Condenses long passages while retaining important ideas |
| Learning Path | Builds a staged learning plan with topics, timing, and resources |

## Proposed architecture

```text
Student
  |
  v
React learning interface
  |
  v
Backend API
  |
  +--> Question and Answer
  +--> Explanation
  +--> Quiz Generation
  +--> Summarization
  +--> Learning Path
  |
  v
Google Gemini
```

## Technology direction

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Icons:** Lucide React
- **Backend plan:** FastAPI
- **AI provider:** Google Gemini
- **Optional local model:** A lightweight local model for selected explanation tasks
- **Data and service layer:** Supabase can be added when progress, saved quizzes, accounts, or other persistent features are introduced

## Current frontend setup

The repository currently contains a Vite-powered React and TypeScript foundation with Tailwind CSS configured for styling. The Gemini API is intentionally not included yet. Never commit an API key to the repository.

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- A Google Gemini API key when AI integration is enabled

### Install and run

```bash
npm install
npm run dev
```

The development server will display the local address where the frontend can be opened.

### Available checks

```bash
npm run build
npm run typecheck
npm run lint
```

## Gemini integration checklist

When the API key is available:

1. Add the key through a server-side secret or environment variable.
2. Keep the key out of browser code and out of Git history.
3. Add the backend service that communicates with Gemini.
4. Connect each learning module to its corresponding API route.
5. Add loading, empty, and error states to the interface.
6. Test questions, explanations, quizzes, summaries, and learning paths with representative educational prompts.

## Suggested API routes

These routes describe the intended backend contract and can be adjusted during implementation:

- `GET /qa`
- `POST /explain`
- `POST /quiz`
- `POST /summarize`
- `GET /recommendations`

## Example use cases

### Ask a question

A student can ask, “Which is the largest ocean?” and receive a concise answer with helpful context.

### Explain a concept

A student can enter “photosynthesis” and receive an explanation written for their preferred level.

### Generate a quiz

A student can enter a topic such as “The Pythagorean theorem” and receive practice questions with answer options.

### Build a learning path

A student can enter “SQL” and receive a progression from foundational concepts to more advanced topics.

## Documentation

The project reference document is available in [`docs/EduGenie-Google_Gemini_Powered_Learning_Assistant_Document.docx.pdf`](docs/EduGenie-Google_Gemini_Powered_Learning_Assistant_Document.docx.pdf). It contains the original project description, architecture, module details, workflow, testing scenarios, and future enhancement ideas.

## Future enhancements

- Voice-based learning conversations
- Multilingual support
- Gamified quizzes and progress tracking
- Adaptive learning recommendations
- Saved study history and personalized dashboards
- Image and PDF-based learning inputs

## Security notes

- Do not place the Gemini API key in React components or commit it to GitHub.
- Route provider requests through a protected backend when the integration is added.
- Validate user input before sending it to external AI services.
- Treat generated content as study assistance and verify important academic information.

## License

No license has been selected yet.
