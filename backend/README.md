# Backend API

Node.js Express API for HealthKit Dashboard with PostgreSQL and Prisma ORM.

## Features

- RESTful API endpoints for health data
- JWT authentication
- PostgreSQL database with Prisma ORM
- Rate limiting and security headers
- TypeScript for type safety
- Input validation with express-validator

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Environment variables configured

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/healthkit_db"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:3001,http://localhost:19006"
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Health Data
- `POST /api/health/sync` - Sync health data from mobile app (protected)
- `GET /api/health/dashboard/:userId` - Get dashboard data (protected)
- `GET /api/health/workouts/:userId` - Get workouts (protected)
- `GET /api/health/trends/:userId` - Get health trends (protected)

### Utility
- `GET /` - API info
- `GET /api/health-check` - Health check endpoint

## Database Schema

See `prisma/schema.prisma` for the complete schema.

**Models:**
- `User` - User accounts with authentication
- `HealthData` - Health data snapshots with JSON fields for flexibility

## Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm test             # Run tests
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Deployment

1. Set environment variables in hosting platform
2. Run database migrations: `npm run prisma:migrate`
3. Build: `npm run build`
4. Start: `npm start`

Recommended platforms:
- Railway (https://railway.app)
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run

## Security

- HTTPS only in production
- Helmet.js for security headers
- CORS configured for specific origins
- Rate limiting on all endpoints
- JWT tokens with expiration
- Bcrypt password hashing (10 rounds)
- Input validation on all endpoints

## License

MIT
