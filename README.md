# AI Inquisitor Demo

A modern document query system with AI capabilities that allows users to upload documents and query them using natural language.

## Features

- 🔒 Secure Google OAuth authentication
- 📄 Document upload and management
- 💬 Natural language querying
- 🎨 Modern, responsive UI
- ⚡ Built with Vite and React

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Google OAuth

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-inquisitor-demo.git
   cd ai-inquisitor-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Google OAuth credentials to `.env`

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `VITE_N8N_URL`: N8N workflow URL
- `VITE_REDIRECT_URI`: OAuth redirect URI
- `VITE_API_BASE_URL`: Base URL for API calls

## License

MIT