# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js backend service (`play-backend-service`) built with Express.js. The repository is set up as a test project for CI/CD work and deployment to Render.

## Repository Structure

```
play-backend-service/
├── src/
│   ├── app.js          # Express application setup
│   └── server.js       # Server entry point
├── tests/
│   └── app.test.js     # Test cases
├── package.json        # Dependencies and scripts
├── jest.config.js      # Jest test configuration
└── .gitignore         # Git ignore patterns
```

## Development Commands

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload (nodemon)
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Deployment

The service is configured for deployment on Render:
- Service name: `play-backend-service`
- Repository: https://github.com/Eazeeee/play-backend-service
- Deploy branch: `staging`
- Runtime: Node.js
- Build command: `yarn` (configured in Render)
- Start command: `yarn start` (configured in Render)
- Auto-deploy: Enabled

## Architecture Notes

The application follows a simple Express.js architecture:

- **src/app.js**: Contains the Express application setup with middleware, routes, and error handling
- **src/server.js**: Server entry point that starts the HTTP server
- **tests/**: Contains Jest test files using Supertest for API testing

Key features:
- CORS enabled for cross-origin requests
- JSON and URL-encoded body parsing
- Health check endpoint (`/health`)
- Global error handling middleware
- 404 handler for unknown routes

## Dependencies

- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing middleware
- **Jest**: Testing framework
- **Supertest**: HTTP testing library
- **Nodemon**: Development auto-reload tool

## Claude Code Permissions

The local Claude settings allow listing Render services without prompting, which is helpful for deployment management and monitoring.