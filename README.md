# Mirror Image Monorepo

This is a monorepo containing both the frontend and backend services for the Mirror Image project.

## Project Structure

```
mirror-image/
├── packages/
│   ├── frontend/        # Next.js frontend application
│   │   ├── src/        # Source code
│   │   ├── public/     # Static files
│   │   └── ...
│   ├── backend/        # Express backend service
│   │   ├── src/        # Source code
│   │   └── ...
│   └── shared/         # Shared types and utilities
│       ├── src/
│       │   ├── types/  # Shared TypeScript types
│       │   └── utils/  # Shared utility functions
│       └── ...
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mirror-image.git
cd mirror-image
```

2. Install dependencies:

```bash
# Install all workspace dependencies
npm install
```

3. Set up environment variables:

```bash
# For frontend
cd packages/frontend
cp .env.example .env.local
# Edit .env.local with your values

# For backend
cd ../backend
cp .env.example .env
# Edit .env with your values
```

## Development

### Running the Development Servers

To run all packages (shared, frontend, and backend):

```bash
npm run dev:all
```

To run services individually:

```bash
# Shared package in watch mode
npm run dev:shared

# Frontend only (http://localhost:3000)
npm run dev:frontend

# Backend only (http://localhost:3001)
npm run dev:backend
```

### Building for Production

Build all packages:

```bash
npm run build
```

Build individual packages:

```bash
npm run build:shared
npm run build:frontend
npm run build:backend
```

### Production Start

Start all services:

```bash
npm run start:all
```

Start services individually:

```bash
npm run start:frontend
npm run start:backend
```

## Environment Variables

### Frontend (.env.local)

- `OPENAI_API_KEY`: Your OpenAI API key
- `GOOGLE_API_KEY`: Your Google API key
- `SERPAPI_API_KEY`: Your SerpAPI key
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_ANALYTICS_ID`: Analytics ID (optional)
- `UPSTASH_VECTOR_REST_URL`: Upstash Vector DB URL
- `UPSTASH_VECTOR_REST_TOKEN`: Upstash Vector DB token

### Backend (.env)

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Frontend URL for CORS
- `OPENAI_API_KEY`: Your OpenAI API key (if needed)
- `DATABASE_URL`: Database connection URL (if needed)

## Available Scripts

### Root Directory

- `npm run dev:all`: Start all services in development mode
- `npm run dev:shared`: Start shared package in watch mode
- `npm run dev:frontend`: Start frontend in development mode
- `npm run dev:backend`: Start backend in development mode
- `npm run build`: Build all packages
- `npm run start:all`: Start all services in production mode

### Shared Package

- `npm run dev`: Start TypeScript compiler in watch mode
- `npm run build`: Build TypeScript code
- `npm run clean`: Remove build artifacts
- `npm run lint`: Run ESLint

### Frontend Package

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Backend Package

- `npm run dev`: Start development server
- `npm run build`: Build TypeScript code
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Shared Types and Utilities

The `@mirror-image/shared` package contains common code used by both frontend and backend:

### Types

- `ApiResponse<T>`: Generic API response wrapper
- `ApiError`: Common error structure
- `PaginationParams`: Common pagination parameters
- `SortParams`: Common sorting parameters

### Utilities

- `createSuccessResponse`: Create a successful API response
- `createErrorResponse`: Create an error API response
- `validatePaginationParams`: Validate pagination parameters

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Your chosen license]
