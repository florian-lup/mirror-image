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
│   └── backend/        # Express backend service
│       ├── src/        # Source code
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

Run the development servers:

```bash
# Run all services
npm run dev:all

# Or run services individually
npm run dev:frontend
npm run dev:backend
```

## Building for Production

```bash
# Build all services
npm run build

# Or build services individually
npm run build:frontend
npm run build:backend
```

## Starting Production Services

```bash
# Start all services
npm run start:all

# Or start services individually
npm run start:frontend
npm run start:backend
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Your chosen license]
