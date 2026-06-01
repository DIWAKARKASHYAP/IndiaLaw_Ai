This is a [Next.js](https://nextjs.org) project for an Indian law assistant powered by Gemini API.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
copy .env.example .env.local
```

3. Add your Gemini key in `.env.local`:

```bash
GEMINI_API_KEY=your_actual_key
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Then go to [http://localhost:3000/assistant](http://localhost:3000/assistant) and ask legal questions.

## Notes

- The chat endpoint is `app/api/chat/route.ts`.
- Gemini model configuration is in `lib/gemini.ts`.
- If the key is missing, the API returns a clear error message.
