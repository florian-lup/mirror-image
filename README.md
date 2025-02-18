# Mirror Image

AI clones that preserve your thoughts, memories, and communication style, creating a virtual extension of yourself.

## Features

- 🤖 Multi-model AI chat support (OpenAI, Google Gemini)
- 🎨 Beautiful, modern UI with Framer Motion animations
- 🌓 Dark/Light mode support
- ⚡ Built with performance in mind using Next.js 15
- 📊 Analytics integration with Vercel
- 🔍 Vector search capabilities with Upstash
- 🎯 Type-safe development with TypeScript
- 🎨 Styled with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys for OpenAI and/or Google AI (based on which models you want to use)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mirror-image.git
   cd mirror-image
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
mirror-image/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   └── ...
├── public/              # Static files
├── package.json         # Project dependencies
└── ...
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [LangChain](https://js.langchain.com/) - Framework for working with AI models
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is licensed under the MIT License - see the LICENSE file for details.
