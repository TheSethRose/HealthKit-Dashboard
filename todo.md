# HealthKit Dashboard MVP - Ultra Granular Todo List

> **Legend**: `[ ]` = Not started | `[x]` = Completed

---

## 🎯 Project Overview
Building a hybrid mobile + web architecture to display Apple HealthKit data on a web dashboard.

**Timeline**: 6-10 weeks  
**Status**: Planning Phase

---

## 📋 Phase 0: Pre-Development Setup

### 0.1 Environment & Tools Setup
- [ ] Install Xcode (latest version from Mac App Store)
- [ ] Install Xcode Command Line Tools (`xcode-select --install`)
- [ ] Install Node.js (v18+ LTS) and npm
- [ ] Install Homebrew (if not already installed)
- [ ] Install CocoaPods (`sudo gem install cocoapods`)
- [ ] Install React Native CLI globally (`npm install -g react-native-cli`)
- [ ] Setup Apple Developer Account (required for HealthKit)
- [ ] Install VS Code or preferred IDE
- [ ] Install VS Code extensions: React Native Tools, Prisma, ESLint, Prettier
- [ ] Install Git and configure credentials

### 0.2 Account & Service Setup
- [ ] Create Apple Developer account (or verify existing)
- [ ] Create GitHub repository for project
- [ ] Setup cloud database account (e.g., Railway, Supabase, PlanetScale)
- [ ] Create Vercel account for web dashboard deployment
- [ ] Setup project management tool (Linear, Notion, or GitHub Projects)

### 0.3 Project Planning
- [ ] Review mvp.md document thoroughly
- [ ] Decide: React Native vs Native Swift for iOS app
- [ ] Decide: PostgreSQL vs MongoDB for database
- [ ] Create project directory structure locally
- [ ] Initialize git repository
- [ ] Create .gitignore file
- [ ] Create README.md with project overview

---

## 📱 Phase 1: iOS Mobile App (Data Collection)

### 1.1 Project Initialization
- [ ] Create React Native project with TypeScript template
- [ ] Navigate to project directory
- [ ] Initialize git repository in project
- [ ] Create initial commit
- [ ] Test project runs on iOS simulator
- [ ] Install react-native-health package
- [ ] Run `pod install` in ios directory
- [ ] Verify pod installation successful

### 1.2 Xcode Configuration
- [ ] Open .xcworkspace file in Xcode
- [ ] Configure bundle identifier
- [ ] Setup development team/signing
- [ ] Add HealthKit capability to target
- [ ] Verify HealthKit entitlement appears in project
- [ ] Set minimum iOS deployment target to 14.0+
- [ ] Configure build settings for Release mode
- [ ] Test build compiles successfully

### 1.3 Info.plist Configuration
- [ ] Open Info.plist in Xcode or text editor
- [ ] Add NSHealthShareUsageDescription key
- [ ] Write clear user-facing permission message
- [ ] Add NSHealthUpdateUsageDescription key (even if not writing data)
- [ ] Save and verify plist is valid XML
- [ ] Commit changes to git

### 1.4 Project Structure Setup
- [ ] Create `src/` directory
- [ ] Create `src/services/` directory
- [ ] Create `src/components/` directory
- [ ] Create `src/screens/` directory
- [ ] Create `src/types/` directory
- [ ] Create `src/utils/` directory
- [ ] Create `src/config/` directory

### 1.5 HealthKit Service - Basic Setup
- [ ] Create `src/services/healthkit.ts` file
- [ ] Import AppleHealthKit from react-native-health
- [ ] Import TypeScript types (HealthKitPermissions, HealthValue, etc.)
- [ ] Define permissions object with all required read permissions
- [ ] Create initHealthKit function with promise wrapper
- [ ] Add error handling for initialization
- [ ] Add success logging
- [ ] Test initialization on physical device

### 1.6 HealthKit Service - Activity Queries
- [ ] Create getStepsToday function
- [ ] Create getStepCount function with date range
- [ ] Create getDistanceWalkingRunning function
- [ ] Create getActiveEnergyBurned function
- [ ] Create getFlightsClimbed function
- [ ] Create getActivitySummary function
- [ ] Add TypeScript type definitions for return values
- [ ] Test each function on physical device
- [ ] Add error handling for each query
- [ ] Add console logging for debugging

### 1.7 HealthKit Service - Heart Rate Queries
- [ ] Create getHeartRateSamples function
- [ ] Add date range parameters (startDate, endDate)
- [ ] Add limit parameter (default 100)
- [ ] Add ascending/descending sort option
- [ ] Create getLatestHeartRate function
- [ ] Create getAverageHeartRate function
- [ ] Create getRestingHeartRate function
- [ ] Test heart rate queries on physical device
- [ ] Verify data matches Apple Health app

### 1.8 HealthKit Service - Sleep Queries
- [ ] Create getSleepSamples function
- [ ] Add date range parameters
- [ ] Parse sleep stages (awake, REM, core, deep)
- [ ] Create calculateTotalSleepDuration helper
- [ ] Create getSleepAnalysis function
- [ ] Add sleep quality calculations
- [ ] Test sleep queries with real sleep data
- [ ] Verify sleep data accuracy

### 1.9 HealthKit Service - Workout Queries
- [ ] Create getWorkouts function
- [ ] Use getAnchoredWorkouts for efficiency
- [ ] Parse workout types (running, cycling, swimming, etc.)
- [ ] Extract workout duration
- [ ] Extract calories burned
- [ ] Extract distance if applicable
- [ ] Extract heart rate data from workout
- [ ] Create getWorkoutById function
- [ ] Test with various workout types

### 1.10 HealthKit Service - Body Measurements
- [ ] Create getWeight function
- [ ] Create getHeight function
- [ ] Create getBodyMassIndex function
- [ ] Create getBodyFatPercentage function
- [ ] Create getLeanBodyMass function
- [ ] Add unit conversion helpers (kg/lbs, cm/inches)
- [ ] Test body measurement queries

### 1.11 HealthKit Service - Vital Signs
- [ ] Create getBloodPressure function (systolic + diastolic)
- [ ] Create getBodyTemperature function
- [ ] Create getRespiratoryRate function
- [ ] Create getOxygenSaturation function
- [ ] Test vital signs queries

### 1.12 HealthKit Service - Nutrition (if needed)
- [ ] Create getDietaryEnergy function
- [ ] Create getProtein function
- [ ] Create getCarbohydrates function
- [ ] Create getFat function
- [ ] Create getWaterIntake function
- [ ] Test nutrition queries

### 1.13 HealthKit Service - Background Observers
- [ ] Create setupObserver function for workouts
- [ ] Create setupObserver function for heart rate
- [ ] Create setupObserver function for steps
- [ ] Implement observer callbacks
- [ ] Add observer cleanup/removal functions
- [ ] Test observers trigger on new data
- [ ] Request background delivery permissions

### 1.14 API Service Setup
- [ ] Create `src/services/api.ts` file
- [ ] Install axios (`npm install axios`)
- [ ] Create API_BASE_URL constant (use environment variable)
- [ ] Create axios instance with default config
- [ ] Add request interceptor for auth token
- [ ] Add response interceptor for error handling
- [ ] Create HealthDataPayload TypeScript interface

### 1.15 API Service - Sync Functions
- [ ] Create syncHealthData function (POST to /api/health/sync)
- [ ] Add JWT token to Authorization header
- [ ] Add request timeout handling
- [ ] Add retry logic for failed requests (3 attempts)
- [ ] Create syncAllHealthData orchestration function
- [ ] Batch multiple data points in single request
- [ ] Add success/failure callbacks
- [ ] Add offline queue for failed syncs
- [ ] Test sync with mock backend

### 1.16 Authentication Service
- [ ] Create `src/services/auth.ts` file
- [ ] Create login function
- [ ] Create register function
- [ ] Create logout function
- [ ] Create getAuthToken function
- [ ] Create storeAuthToken function (secure storage)
- [ ] Install react-native-keychain for secure token storage
- [ ] Create isAuthenticated helper
- [ ] Create refreshToken function

### 1.17 Main App Screen - Setup
- [ ] Create `src/screens/HomeScreen.tsx`
- [ ] Add welcome message
- [ ] Add "Initialize HealthKit" button
- [ ] Add "Sync Data" button
- [ ] Add status indicator (last sync time)
- [ ] Add loading states
- [ ] Add error messages display
- [ ] Style with React Native StyleSheet

### 1.18 Main App Screen - HealthKit Integration
- [ ] Call initHealthKit on component mount
- [ ] Handle permission denied scenario
- [ ] Display permission request UI
- [ ] Add manual sync button handler
- [ ] Show sync progress indicator
- [ ] Display last sync timestamp
- [ ] Add pull-to-refresh functionality

### 1.19 Background Sync Implementation
- [ ] Install react-native-background-fetch
- [ ] Configure background fetch in native code
- [ ] Create background sync handler function
- [ ] Register background task
- [ ] Add minimum fetch interval (15 minutes)
- [ ] Test background sync when app is closed
- [ ] Add background sync status indicator

### 1.20 Error Handling & Logging
- [ ] Create `src/utils/logger.ts` utility
- [ ] Add error boundary component
- [ ] Add Sentry or similar error tracking (optional)
- [ ] Log all HealthKit errors
- [ ] Log all API errors
- [ ] Add user-friendly error messages
- [ ] Create retry mechanisms for transient errors

### 1.21 TypeScript Types & Interfaces
- [ ] Create `src/types/healthkit.ts`
- [ ] Define HealthDataPoint interface
- [ ] Define Workout interface
- [ ] Define SleepSession interface
- [ ] Define HeartRateSample interface
- [ ] Define ActivitySummary interface
- [ ] Export all types

### 1.22 Configuration & Environment
- [ ] Create `src/config/env.ts`
- [ ] Install react-native-dotenv
- [ ] Create .env file
- [ ] Add API_BASE_URL to .env
- [ ] Add .env to .gitignore
- [ ] Create .env.example template
- [ ] Document environment variables in README

### 1.23 Testing on Physical Device
- [ ] Connect iPhone to Mac via USB
- [ ] Trust computer on iPhone
- [ ] Select physical device in Xcode
- [ ] Build and run on device
- [ ] Grant HealthKit permissions when prompted
- [ ] Verify data reads correctly
- [ ] Check console logs for errors
- [ ] Test each query function manually

### 1.24 App Polish & UX
- [ ] Add app icon (1024x1024)
- [ ] Add launch screen
- [ ] Add loading animations
- [ ] Add success/error toast messages
- [ ] Add haptic feedback on actions
- [ ] Improve color scheme and typography
- [ ] Add dark mode support (optional)
- [ ] Test UX flow end-to-end

### 1.25 Code Quality & Documentation
- [ ] Run ESLint and fix all warnings
- [ ] Run Prettier to format code
- [ ] Add JSDoc comments to all functions
- [ ] Create README.md for mobile app
- [ ] Document setup instructions
- [ ] Document HealthKit permissions
- [ ] Add code comments for complex logic

### 1.26 iOS App - Final Testing
- [ ] Test on multiple iOS devices (if available)
- [ ] Test with different iOS versions
- [ ] Test all HealthKit queries return data
- [ ] Test background sync works
- [ ] Test offline behavior
- [ ] Test error scenarios (no network, denied permissions)
- [ ] Verify no memory leaks
- [ ] Test battery impact

---

## 🔧 Phase 2: Backend API

### 2.1 Project Initialization
- [ ] Create backend directory (e.g., `healthkit-api`)
- [ ] Initialize Node.js project (`npm init -y`)
- [ ] Initialize TypeScript (`npx tsc --init`)
- [ ] Configure tsconfig.json (target: ES2020, module: commonjs)
- [ ] Create src/ directory
- [ ] Create .gitignore (node_modules, .env, dist)
- [ ] Initialize git repository

### 2.2 Dependencies Installation
- [ ] Install Express (`npm install express`)
- [ ] Install TypeScript types (`npm install -D @types/express @types/node`)
- [ ] Install cors (`npm install cors` and `@types/cors`)
- [ ] Install helmet (`npm install helmet`)
- [ ] Install dotenv (`npm install dotenv`)
- [ ] Install Prisma (`npm install -D prisma` and `npm install @prisma/client`)
- [ ] Install bcrypt (`npm install bcrypt` and `@types/bcrypt`)
- [ ] Install jsonwebtoken (`npm install jsonwebtoken` and `@types/jsonwebtoken`)
- [ ] Install express-rate-limit (`npm install express-rate-limit`)
- [ ] Install express-validator (`npm install express-validator`)

### 2.3 Database Setup - PostgreSQL
- [ ] Create PostgreSQL database (Railway/Supabase/local)
- [ ] Get database connection URL
- [ ] Initialize Prisma (`npx prisma init`)
- [ ] Configure DATABASE_URL in .env
- [ ] Update .env with JWT_SECRET
- [ ] Update .env with PORT (default 3000)

### 2.4 Prisma Schema - User Model
- [ ] Open prisma/schema.prisma
- [ ] Define User model with fields:
  - [ ] id (String, @id, @default(cuid()))
  - [ ] email (String, @unique)
  - [ ] password (String, hashed)
  - [ ] name (String, optional)
  - [ ] createdAt (DateTime, @default(now()))
  - [ ] updatedAt (DateTime, @updatedAt)
- [ ] Add relation to HealthData

### 2.5 Prisma Schema - HealthData Model
- [ ] Define HealthData model with fields:
  - [ ] id (String, @id, @default(cuid()))
  - [ ] userId (String, foreign key)
  - [ ] timestamp (DateTime)
  - [ ] steps (Int, optional)
  - [ ] heartRate (Json, optional)
  - [ ] sleep (Json, optional)
  - [ ] workouts (Json, optional)
  - [ ] activitySummary (Json, optional)
  - [ ] createdAt (DateTime, @default(now()))
- [ ] Add user relation
- [ ] Add index on [userId, timestamp]

### 2.6 Prisma Schema - Additional Models
- [ ] Define Workout model (if storing separately from JSON)
- [ ] Define SleepSession model (optional)
- [ ] Define HeartRateSample model (optional)
- [ ] Define BodyMeasurement model (optional)
- [ ] Run `npx prisma format` to format schema

### 2.7 Database Migration
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Verify migration files created
- [ ] Check database tables created
- [ ] Run `npx prisma generate` to generate Prisma Client
- [ ] Test Prisma Client connection

### 2.8 Project Structure
- [ ] Create src/server.ts (main entry point)
- [ ] Create src/routes/ directory
- [ ] Create src/controllers/ directory
- [ ] Create src/middleware/ directory
- [ ] Create src/services/ directory
- [ ] Create src/utils/ directory
- [ ] Create src/types/ directory
- [ ] Create src/config/ directory

### 2.9 Server Setup - Basic Express
- [ ] Create src/server.ts file
- [ ] Import express, cors, helmet, dotenv
- [ ] Initialize express app
- [ ] Configure middleware (helmet, cors, express.json)
- [ ] Setup CORS with allowed origins
- [ ] Add body size limit (10mb for health data)
- [ ] Create basic health check route (GET /)
- [ ] Setup error handling middleware
- [ ] Configure PORT from environment
- [ ] Add server.listen with console.log

### 2.10 Authentication Middleware
- [ ] Create src/middleware/auth.ts
- [ ] Create authenticateToken middleware function
- [ ] Extract JWT from Authorization header
- [ ] Verify token with jsonwebtoken
- [ ] Attach user to request object
- [ ] Handle invalid/expired tokens
- [ ] Export middleware

### 2.11 Validation Middleware
- [ ] Create src/middleware/validation.ts
- [ ] Create validateHealthDataSync schema
- [ ] Validate userId, timestamp, data fields
- [ ] Create validateUserRegistration schema
- [ ] Create validateUserLogin schema
- [ ] Export validation middleware

### 2.12 Rate Limiting Middleware
- [ ] Create src/middleware/rateLimiter.ts
- [ ] Configure rate limit for auth routes (5 req/15min)
- [ ] Configure rate limit for sync routes (100 req/15min)
- [ ] Configure rate limit for read routes (200 req/15min)
- [ ] Add custom rate limit exceeded message
- [ ] Export rate limiters

### 2.13 Error Handling Middleware
- [ ] Create src/middleware/errorHandler.ts
- [ ] Create global error handler function
- [ ] Handle Prisma errors (unique constraint, not found, etc.)
- [ ] Handle validation errors
- [ ] Handle JWT errors
- [ ] Log errors to console/service
- [ ] Return appropriate HTTP status codes
- [ ] Return user-friendly error messages
- [ ] Don't expose sensitive error details in production

### 2.14 Auth Routes - Setup
- [ ] Create src/routes/auth.routes.ts
- [ ] Create Express router
- [ ] Define POST /register route
- [ ] Define POST /login route
- [ ] Define POST /logout route (optional)
- [ ] Define GET /me route (get current user)
- [ ] Apply validation middleware to routes
- [ ] Apply rate limiting to auth routes

### 2.15 Auth Controller - Register
- [ ] Create src/controllers/auth.controller.ts
- [ ] Create register function
- [ ] Validate email format
- [ ] Check if user already exists
- [ ] Hash password with bcrypt (10 rounds)
- [ ] Create user in database with Prisma
- [ ] Generate JWT token
- [ ] Return user object and token
- [ ] Handle errors

### 2.16 Auth Controller - Login
- [ ] Create login function
- [ ] Find user by email
- [ ] Compare password with bcrypt
- [ ] Generate JWT token if valid
- [ ] Return user object and token
- [ ] Handle invalid credentials
- [ ] Add login attempt tracking (optional security)

### 2.17 Auth Controller - Get Current User
- [ ] Create getCurrentUser function
- [ ] Extract userId from JWT (via middleware)
- [ ] Fetch user from database
- [ ] Return user object (exclude password)
- [ ] Handle user not found

### 2.18 Health Routes - Setup
- [ ] Create src/routes/health.routes.ts
- [ ] Create Express router
- [ ] Define POST /sync route
- [ ] Define GET /dashboard/:userId route
- [ ] Define GET /workouts/:userId route
- [ ] Define GET /trends/:userId route
- [ ] Apply authentication middleware to all routes
- [ ] Apply validation middleware
- [ ] Apply rate limiting

### 2.19 Health Controller - Sync Data
- [ ] Create src/controllers/health.controller.ts
- [ ] Create syncHealthData function
- [ ] Validate request body
- [ ] Verify userId matches authenticated user
- [ ] Parse health data from request
- [ ] Create HealthData record in database
- [ ] Handle duplicate timestamp (upsert)
- [ ] Return success response
- [ ] Handle database errors

### 2.20 Health Controller - Get Dashboard Data
- [ ] Create getDashboardData function
- [ ] Extract userId from params
- [ ] Verify user is authorized
- [ ] Extract date range from query params
- [ ] Fetch HealthData records from database
- [ ] Order by timestamp descending
- [ ] Limit results (last 30 days by default)
- [ ] Return health data array
- [ ] Handle no data found scenario

### 2.21 Health Controller - Get Workouts
- [ ] Create getWorkouts function
- [ ] Extract userId and date range
- [ ] Query HealthData records containing workout data
- [ ] Parse workout JSON data
- [ ] Filter by workout type (optional query param)
- [ ] Sort by date descending
- [ ] Return workout array
- [ ] Add pagination support

### 2.22 Health Controller - Get Trends
- [ ] Create getTrends function
- [ ] Extract userId and metric type (steps, heart rate, etc.)
- [ ] Query HealthData for date range
- [ ] Calculate daily/weekly aggregates
- [ ] Calculate averages, min, max
- [ ] Format data for charts (x: date, y: value)
- [ ] Return trends object
- [ ] Cache results (optional)

### 2.23 Database Utilities
- [ ] Create src/utils/database.ts
- [ ] Create Prisma client singleton
- [ ] Add connection error handling
- [ ] Add graceful shutdown on SIGINT/SIGTERM
- [ ] Export prisma client

### 2.24 JWT Utilities
- [ ] Create src/utils/jwt.ts
- [ ] Create generateToken function
- [ ] Create verifyToken function
- [ ] Set token expiration (7 days)
- [ ] Export functions

### 2.25 Validation Utilities
- [ ] Create src/utils/validation.ts
- [ ] Create isValidEmail function
- [ ] Create isValidPassword function (min 8 chars)
- [ ] Create sanitizeInput function
- [ ] Export functions

### 2.26 Testing - Setup
- [ ] Install testing dependencies (jest, supertest)
- [ ] Configure jest.config.js
- [ ] Create tests/ directory
- [ ] Setup test database

### 2.27 Testing - Auth Endpoints
- [ ] Test POST /auth/register success
- [ ] Test POST /auth/register duplicate email
- [ ] Test POST /auth/login success
- [ ] Test POST /auth/login invalid credentials
- [ ] Test GET /auth/me with valid token
- [ ] Test GET /auth/me with invalid token

### 2.28 Testing - Health Endpoints
- [ ] Test POST /health/sync success
- [ ] Test POST /health/sync unauthorized
- [ ] Test GET /health/dashboard success
- [ ] Test GET /health/dashboard with date range
- [ ] Test GET /health/workouts
- [ ] Test GET /health/trends

### 2.29 API Documentation
- [ ] Install Swagger/OpenAPI (optional)
- [ ] Document all endpoints
- [ ] Add request/response examples
- [ ] Document authentication
- [ ] Document error responses
- [ ] Create Postman collection (optional)

### 2.30 Environment Configuration
- [ ] Create .env.example file
- [ ] Document all environment variables
- [ ] Add NODE_ENV variable
- [ ] Add CORS_ORIGIN variable
- [ ] Ensure .env in .gitignore

### 2.31 Logging Setup
- [ ] Install winston or pino logger
- [ ] Configure log levels (error, warn, info, debug)
- [ ] Log all API requests
- [ ] Log all errors
- [ ] Create log files (error.log, combined.log)
- [ ] Add request ID to logs (optional)

### 2.32 Security Hardening
- [ ] Enable HTTPS only in production
- [ ] Add helmet security headers
- [ ] Implement CSRF protection (if using cookies)
- [ ] Sanitize all user inputs
- [ ] Add SQL injection prevention (Prisma handles this)
- [ ] Add XSS protection
- [ ] Review OWASP top 10

### 2.33 Performance Optimization
- [ ] Add database indexes
- [ ] Implement query result caching (Redis optional)
- [ ] Add compression middleware
- [ ] Optimize JSON payload sizes
- [ ] Add database connection pooling
- [ ] Profile slow queries

### 2.34 Deployment Preparation
- [ ] Create Dockerfile (optional)
- [ ] Create docker-compose.yml (optional)
- [ ] Setup deployment to Railway/Heroku/AWS
- [ ] Configure environment variables in hosting
- [ ] Setup database on hosting platform
- [ ] Run migrations on production database
- [ ] Setup domain name (optional)
- [ ] Configure SSL certificate

### 2.35 Deployment
- [ ] Push code to GitHub
- [ ] Connect hosting platform to GitHub
- [ ] Configure auto-deploy on push to main
- [ ] Deploy backend API
- [ ] Test API endpoints in production
- [ ] Monitor for errors
- [ ] Setup uptime monitoring (optional)

### 2.36 Backend - Final Testing
- [ ] Test all endpoints with Postman/curl
- [ ] Test authentication flow
- [ ] Test data sync from mobile app
- [ ] Test rate limiting works
- [ ] Test error handling
- [ ] Load test API (optional)
- [ ] Verify database backups enabled

---

## 🌐 Phase 3: Web Dashboard (Frontend)

### 3.1 Project Initialization
- [ ] Create Next.js project with TypeScript and Tailwind
- [ ] Navigate to project directory
- [ ] Initialize git repository
- [ ] Select App Router (not Pages Router)
- [ ] Confirm Tailwind CSS
- [ ] Confirm TypeScript
- [ ] Confirm ESLint
- [ ] Test dev server runs (`npm run dev`)

### 3.2 Dependencies Installation
- [ ] Install TanStack Query (`npm install @tanstack/react-query`)
- [ ] Install axios (`npm install axios`)
- [ ] Install recharts (`npm install recharts`)
- [ ] Install date-fns (`npm install date-fns`)
- [ ] Install lucide-react icons (`npm install lucide-react`)
- [ ] Install class-variance-authority (`npm install class-variance-authority`)
- [ ] Install clsx (`npm install clsx`)
- [ ] Install tailwind-merge (`npm install tailwind-merge`)

### 3.3 shadcn/ui Setup
- [ ] Initialize shadcn/ui (`npx shadcn@latest init`)
- [ ] Select default style
- [ ] Select color scheme (slate/neutral)
- [ ] Configure CSS variables
- [ ] Add Card component (`npx shadcn@latest add card`)
- [ ] Add Button component (`npx shadcn@latest add button`)
- [ ] Add Avatar component (`npx shadcn@latest add avatar`)
- [ ] Add Badge component (`npx shadcn@latest add badge`)
- [ ] Add Input component (`npx shadcn@latest add input`)
- [ ] Add Label component (`npx shadcn@latest add label`)
- [ ] Add Skeleton component (`npx shadcn@latest add skeleton`)
- [ ] Add Toast/Sonner component (`npx shadcn@latest add toast`)

### 3.4 Project Structure Setup
- [ ] Create app/dashboard/ directory
- [ ] Create components/ directory
- [ ] Create components/ui/ (shadcn components)
- [ ] Create components/charts/ directory
- [ ] Create components/cards/ directory
- [ ] Create lib/ directory
- [ ] Create hooks/ directory
- [ ] Create types/ directory
- [ ] Create utils/ directory

### 3.5 Tailwind Configuration
- [ ] Open tailwind.config.ts
- [ ] Add custom color palette (health categories)
- [ ] Add custom font families
- [ ] Add backdrop-blur utilities
- [ ] Configure dark mode (class strategy)
- [ ] Add custom spacing values
- [ ] Test Tailwind classes work

### 3.6 Global Styles
- [ ] Open app/globals.css
- [ ] Add CSS variables for colors
- [ ] Add custom animations (fade-in, slide-up)
- [ ] Add scrollbar styling
- [ ] Add gradient backgrounds
- [ ] Test styles apply globally

### 3.7 TypeScript Types
- [ ] Create types/healthkit.ts
- [ ] Define HealthData interface
- [ ] Define Workout interface
- [ ] Define SleepSession interface
- [ ] Define HeartRateSample interface
- [ ] Define ActivitySummary interface
- [ ] Define User interface
- [ ] Define ApiResponse<T> interface
- [ ] Export all types

### 3.8 API Client Setup
- [ ] Create lib/api.ts
- [ ] Create axios instance with baseURL
- [ ] Add request interceptor for auth token
- [ ] Add response interceptor for error handling
- [ ] Create login function
- [ ] Create register function
- [ ] Create fetchHealthData function
- [ ] Create fetchWorkouts function
- [ ] Create fetchTrends function
- [ ] Add TypeScript return types
- [ ] Export all functions

### 3.9 Authentication Context
- [ ] Create lib/auth-context.tsx
- [ ] Create AuthContext with React.createContext
- [ ] Create AuthProvider component
- [ ] Add login function
- [ ] Add logout function
- [ ] Add register function
- [ ] Store auth token in localStorage
- [ ] Add loading and error states
- [ ] Create useAuth hook
- [ ] Wrap app in AuthProvider

### 3.10 React Query Setup
- [ ] Create lib/query-client.ts
- [ ] Initialize QueryClient with default options
- [ ] Set staleTime and cacheTime
- [ ] Create QueryClientProvider wrapper
- [ ] Add React Query DevTools (development only)
- [ ] Wrap app in QueryClientProvider

### 3.11 Custom Hooks - useHealthData
- [ ] Create hooks/useHealthData.ts
- [ ] Use useQuery from TanStack Query
- [ ] Define query key ['healthData', userId]
- [ ] Call fetchHealthData from API client
- [ ] Set refetch interval (60 seconds)
- [ ] Return data, isLoading, error
- [ ] Add date range parameters

### 3.12 Custom Hooks - useWorkouts
- [ ] Create hooks/useWorkouts.ts
- [ ] Use useQuery for workouts data
- [ ] Define query key ['workouts', userId]
- [ ] Call fetchWorkouts from API client
- [ ] Return data, isLoading, error

### 3.13 Custom Hooks - useTrends
- [ ] Create hooks/useTrends.ts
- [ ] Use useQuery for trends data
- [ ] Accept metric type parameter (steps, heart rate, etc.)
- [ ] Define dynamic query key
- [ ] Call fetchTrends from API client
- [ ] Return data, isLoading, error

### 3.14 Layout - Root Layout
- [ ] Open app/layout.tsx
- [ ] Add QueryClientProvider
- [ ] Add AuthProvider
- [ ] Add Toaster component
- [ ] Configure metadata (title, description)
- [ ] Add Inter font
- [ ] Test layout renders

### 3.15 Layout - Dashboard Layout
- [ ] Create app/dashboard/layout.tsx
- [ ] Create three-column layout (sidebar, main, right-sidebar)
- [ ] Add gradient background
- [ ] Make layout responsive (collapse sidebars on mobile)
- [ ] Add authentication check (redirect if not logged in)

### 3.16 Component - Left Sidebar
- [ ] Create components/LeftSidebar.tsx
- [ ] Add user profile section with Avatar
- [ ] Add "Pinned" label
- [ ] Add search icon
- [ ] Add sharing icon
- [ ] Create health categories list
- [ ] Add icons for each category (Lucide icons)
- [ ] Add color coding (orange Activity, red Heart, etc.)
- [ ] Make categories clickable
- [ ] Add hover states

### 3.17 Component - Right Sidebar
- [ ] Create components/RightSidebar.tsx
- [ ] Create card layout for detailed widgets
- [ ] Add Nutrition card placeholder
- [ ] Add Medications card placeholder
- [ ] Add Respiratory card placeholder
- [ ] Add Heart card placeholder
- [ ] Make scrollable
- [ ] Add backdrop blur effect

### 3.18 Component - Activity Ring Chart
- [ ] Create components/charts/ActivityRings.tsx
- [ ] Install recharts or use SVG
- [ ] Create three concentric rings (Move, Exercise, Stand)
- [ ] Use red, green, blue colors
- [ ] Accept data props (moveCalories, exerciseMinutes, standHours)
- [ ] Calculate percentage filled
- [ ] Add animation (optional)
- [ ] Make responsive

### 3.19 Component - Heart Rate Chart
- [ ] Create components/charts/HeartRateChart.tsx
- [ ] Use Recharts LineChart
- [ ] Configure XAxis (time labels)
- [ ] Configure YAxis (BPM)
- [ ] Add CartesianGrid
- [ ] Add Tooltip with formatted date
- [ ] Style line (red color, 2px width)
- [ ] Make responsive with ResponsiveContainer
- [ ] Handle empty data state

### 3.20 Component - Sleep Chart
- [ ] Create components/charts/SleepChart.tsx
- [ ] Use Recharts BarChart
- [ ] Show sleep stages (awake, REM, core, deep)
- [ ] Use different colors for each stage
- [ ] Add time labels
- [ ] Add tooltip
- [ ] Calculate total sleep hours
- [ ] Display sleep quality score (optional)

### 3.21 Component - Activity Summary Card
- [ ] Create components/cards/ActivityCard.tsx
- [ ] Use shadcn Card component
- [ ] Display Move calories
- [ ] Display Exercise minutes
- [ ] Display Stand hours
- [ ] Add Activity ring visualization
- [ ] Add timestamp (last updated)
- [ ] Style with Tailwind
- [ ] Add loading skeleton

### 3.22 Component - Heart Rate Card
- [ ] Create components/cards/HeartRateCard.tsx
- [ ] Display latest heart rate value
- [ ] Display BPM label
- [ ] Add heart icon (red)
- [ ] Show timestamp
- [ ] Add mini line chart (optional)
- [ ] Style card

### 3.23 Component - Sleep Card
- [ ] Create components/cards/SleepCard.tsx
- [ ] Display total sleep hours
- [ ] Display sleep time range (10pm - 6am)
- [ ] Add moon icon
- [ ] Show sleep stages breakdown
- [ ] Add timestamp
- [ ] Style card

### 3.24 Component - Workout List Card
- [ ] Create components/cards/WorkoutListCard.tsx
- [ ] Map through workouts array
- [ ] Display workout type (running, cycling, etc.)
- [ ] Display duration in minutes
- [ ] Display calories burned
- [ ] Display date
- [ ] Add workout icon
- [ ] Make scrollable
- [ ] Add "View all" button

### 3.25 Component - Nutrition Card
- [ ] Create components/cards/NutritionCard.tsx
- [ ] Display calorie count
- [ ] Display macros (carbs, protein, fat)
- [ ] Add small chart showing daily intake
- [ ] Add food items list (optional)
- [ ] Style with green theme

### 3.26 Component - Medications Card
- [ ] Create components/cards/MedicationsCard.tsx
- [ ] Display medication list
- [ ] Show medication name
- [ ] Show dosage and time
- [ ] Add pill icon
- [ ] Add checkmark for taken status
- [ ] Style card

### 3.27 Component - State of Mind Card
- [ ] Create components/cards/StateOfMindCard.tsx
- [ ] Display emotion/mood
- [ ] Show context (e.g., "Excited · Friends")
- [ ] Add star icon or emoji
- [ ] Show timestamp
- [ ] Style with appropriate color

### 3.28 Component - Cycle Tracking Card
- [ ] Create components/cards/CycleTrackingCard.tsx
- [ ] Display cycle day or phase
- [ ] Add circular progress indicator
- [ ] Use pink/purple color scheme
- [ ] Show relevant info

### 3.29 Component - Loading Skeleton
- [ ] Create components/LoadingSkeleton.tsx
- [ ] Use shadcn Skeleton component
- [ ] Create card-shaped skeletons
- [ ] Animate shimmer effect
- [ ] Match card dimensions

### 3.30 Component - Error State
- [ ] Create components/ErrorState.tsx
- [ ] Display error message
- [ ] Add "Retry" button
- [ ] Add error icon
- [ ] Make user-friendly
- [ ] Log error to console

### 3.31 Dashboard Page - Setup
- [ ] Create app/dashboard/page.tsx
- [ ] Make page "use client"
- [ ] Import all card components
- [ ] Import hooks (useHealthData, etc.)
- [ ] Setup layout structure

### 3.32 Dashboard Page - Data Fetching
- [ ] Call useHealthData hook
- [ ] Call useWorkouts hook
- [ ] Extract latest data point
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle empty data state

### 3.33 Dashboard Page - Pinned Section
- [ ] Create grid layout (2 columns on desktop)
- [ ] Add "Pinned" header with icon
- [ ] Render Activity card
- [ ] Render Cycle Tracking card
- [ ] Render Headphone Audio card
- [ ] Render Fatigue card
- [ ] Render Heart Rate card
- [ ] Render Sleep card
- [ ] Render State of Mind card
- [ ] Make grid responsive

### 3.34 Dashboard Page - Show All Health Data Button
- [ ] Add button below pinned cards
- [ ] Add icon (Activity icon)
- [ ] Add "Show All Health Data" text
- [ ] Add chevron right icon
- [ ] Make button clickable
- [ ] Link to full data page (optional)

### 3.35 Login Page - Setup
- [ ] Create app/login/page.tsx
- [ ] Create login form
- [ ] Add email input field
- [ ] Add password input field
- [ ] Add submit button
- [ ] Add "Sign up" link

### 3.36 Login Page - Functionality
- [ ] Handle form submission
- [ ] Call auth.login function
- [ ] Store auth token
- [ ] Redirect to dashboard on success
- [ ] Show error message on failure
- [ ] Add form validation
- [ ] Add loading state on button

### 3.37 Register Page - Setup
- [ ] Create app/register/page.tsx
- [ ] Create registration form
- [ ] Add name input field
- [ ] Add email input field
- [ ] Add password input field
- [ ] Add confirm password field
- [ ] Add submit button
- [ ] Add "Login" link

### 3.38 Register Page - Functionality
- [ ] Handle form submission
- [ ] Validate passwords match
- [ ] Call auth.register function
- [ ] Store auth token
- [ ] Redirect to dashboard on success
- [ ] Show error message on failure
- [ ] Add form validation

### 3.39 Protected Route Middleware
- [ ] Create middleware.ts in root
- [ ] Check for auth token
- [ ] Redirect to login if no token
- [ ] Allow access to public routes
- [ ] Test protection works

### 3.40 Responsive Design - Mobile
- [ ] Test dashboard on mobile viewport
- [ ] Hide sidebars on mobile (or make collapsible)
- [ ] Stack cards vertically
- [ ] Adjust font sizes
- [ ] Test touch interactions
- [ ] Ensure charts resize properly

### 3.41 Responsive Design - Tablet
- [ ] Test on tablet viewport (768px - 1024px)
- [ ] Adjust grid columns (2 columns)
- [ ] Show left sidebar, hide right sidebar
- [ ] Test layout doesn't break

### 3.42 Responsive Design - Desktop
- [ ] Test on desktop viewport (1024px+)
- [ ] Show all three columns
- [ ] Ensure proper spacing
- [ ] Test on large screens (1440px+)

### 3.43 Dark Mode Support (Optional)
- [ ] Add dark mode toggle button
- [ ] Use Tailwind dark: classes
- [ ] Update color variables for dark mode
- [ ] Test all components in dark mode
- [ ] Store preference in localStorage

### 3.44 Animations & Transitions
- [ ] Add fade-in animation for cards on load
- [ ] Add smooth transitions on hover
- [ ] Animate chart rendering
- [ ] Add loading spinner animation
- [ ] Keep animations subtle and performant

### 3.45 Accessibility
- [ ] Add proper ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Add focus indicators
- [ ] Use semantic HTML
- [ ] Test with screen reader (VoiceOver)
- [ ] Ensure color contrast meets WCAG AA

### 3.46 SEO & Metadata
- [ ] Add proper page titles
- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Add favicon
- [ ] Create robots.txt
- [ ] Create sitemap.xml (optional)

### 3.47 Performance Optimization
- [ ] Use Next.js Image component
- [ ] Implement code splitting
- [ ] Lazy load charts
- [ ] Optimize bundle size
- [ ] Add loading states to prevent layout shift
- [ ] Run Lighthouse audit

### 3.48 Error Boundaries
- [ ] Create error boundary component
- [ ] Wrap dashboard in error boundary
- [ ] Display friendly error UI
- [ ] Log errors to console/service
- [ ] Add "Reset" button

### 3.49 Testing - Component Tests
- [ ] Setup testing library
- [ ] Test ActivityCard renders
- [ ] Test HeartRateCard renders
- [ ] Test charts render with data
- [ ] Test loading states
- [ ] Test error states

### 3.50 Testing - Integration Tests
- [ ] Test login flow
- [ ] Test registration flow
- [ ] Test dashboard data fetching
- [ ] Test protected routes
- [ ] Test logout

### 3.51 Environment Configuration
- [ ] Create .env.local file
- [ ] Add NEXT_PUBLIC_API_URL
- [ ] Add other public env vars
- [ ] Create .env.example
- [ ] Add .env.local to .gitignore
- [ ] Document env vars in README

### 3.52 Deployment Preparation
- [ ] Run production build (`npm run build`)
- [ ] Fix any build errors
- [ ] Test production build locally
- [ ] Optimize images
- [ ] Remove console.logs
- [ ] Update API URLs for production

### 3.53 Deployment to Vercel
- [ ] Push code to GitHub
- [ ] Connect Vercel to GitHub repo
- [ ] Configure build settings
- [ ] Add environment variables in Vercel
- [ ] Deploy to Vercel
- [ ] Test deployed site
- [ ] Configure custom domain (optional)

### 3.54 Web Dashboard - Final Testing
- [ ] Test on Chrome, Safari, Firefox
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test all user flows
- [ ] Test data refresh
- [ ] Test error scenarios
- [ ] Check console for errors
- [ ] Verify no broken links

---

## 🧪 Phase 4: Integration Testing & Polish

### 4.1 End-to-End Testing Setup
- [ ] Setup E2E testing (Playwright or Cypress)
- [ ] Create test scenarios document
- [ ] Setup test data/fixtures

### 4.2 E2E Test - Full User Flow
- [ ] Test: User registers account
- [ ] Test: User logs in
- [ ] Test: Mobile app syncs data to backend
- [ ] Test: Web dashboard fetches and displays data
- [ ] Test: User logs out

### 4.3 Data Accuracy Testing
- [ ] Verify steps count matches Apple Health app
- [ ] Verify heart rate values match
- [ ] Verify sleep hours match
- [ ] Verify workout details match
- [ ] Check timestamp accuracy

### 4.4 Sync Reliability Testing
- [ ] Test sync with good network
- [ ] Test sync with poor network (3G simulation)
- [ ] Test sync with intermittent connectivity
- [ ] Test offline queue works
- [ ] Test retry mechanism
- [ ] Test background sync

### 4.5 Performance Testing - Mobile App
- [ ] Measure HealthKit query response times
- [ ] Check memory usage
- [ ] Check battery drain
- [ ] Test with large data sets (years of data)
- [ ] Profile with Xcode Instruments

### 4.6 Performance Testing - Backend
- [ ] Load test with 100 concurrent users
- [ ] Test database query performance
- [ ] Check API response times (<200ms)
- [ ] Monitor server resources
- [ ] Test with large payloads

### 4.7 Performance Testing - Web Dashboard
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Check Time to First Byte (TTFB)
- [ ] Check First Contentful Paint (FCP)
- [ ] Check Largest Contentful Paint (LCP)
- [ ] Optimize Core Web Vitals

### 4.8 Security Testing - Mobile App
- [ ] Verify secure storage of auth tokens
- [ ] Test data encryption in transit
- [ ] Check for hardcoded secrets (none should exist)
- [ ] Test authorization checks

### 4.9 Security Testing - Backend
- [ ] Test SQL injection protection
- [ ] Test XSS protection
- [ ] Test CSRF protection
- [ ] Test rate limiting works
- [ ] Test JWT expiration
- [ ] Test password hashing
- [ ] Run security audit (npm audit)

### 4.10 Security Testing - Web Dashboard
- [ ] Test XSS protection
- [ ] Test authentication bypass attempts
- [ ] Check for exposed API keys
- [ ] Test CORS configuration
- [ ] Run security audit (npm audit)

### 4.11 Edge Case Testing
- [ ] Test with no HealthKit data (new user)
- [ ] Test with denied HealthKit permissions
- [ ] Test with partial permissions
- [ ] Test with very old data (years ago)
- [ ] Test with future-dated data (edge case)
- [ ] Test with corrupted data

### 4.12 Error Handling Testing
- [ ] Test backend down scenario
- [ ] Test database connection failure
- [ ] Test invalid JWT token
- [ ] Test expired JWT token
- [ ] Test malformed API requests
- [ ] Test rate limit exceeded
- [ ] Verify user-friendly error messages

### 4.13 Browser Compatibility Testing
- [ ] Test on Chrome (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Edge (latest)
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome

### 4.14 Device Compatibility Testing
- [ ] Test iOS app on iPhone 12+
- [ ] Test iOS app on iPhone SE
- [ ] Test iOS app on iPad
- [ ] Test different iOS versions (14+)
- [ ] Test web dashboard on various screen sizes

### 4.15 Bug Fixing
- [ ] Create bug tracking board
- [ ] Prioritize bugs (critical, high, medium, low)
- [ ] Fix critical bugs first
- [ ] Fix high priority bugs
- [ ] Retest after fixes
- [ ] Update documentation with known issues

### 4.16 Code Cleanup - Mobile App
- [ ] Remove commented code
- [ ] Remove unused imports
- [ ] Remove console.logs
- [ ] Fix ESLint warnings
- [ ] Run Prettier formatting
- [ ] Add missing TypeScript types

### 4.17 Code Cleanup - Backend
- [ ] Remove unused dependencies
- [ ] Remove debugging logs
- [ ] Fix ESLint warnings
- [ ] Add missing TypeScript types
- [ ] Improve error messages
- [ ] Add code comments where needed

### 4.18 Code Cleanup - Web Dashboard
- [ ] Remove unused components
- [ ] Remove unused dependencies
- [ ] Fix ESLint warnings
- [ ] Optimize imports
- [ ] Add PropTypes or TypeScript types
- [ ] Remove debug code

### 4.19 Documentation - Mobile App
- [ ] Create README.md
- [ ] Document setup instructions
- [ ] Document HealthKit permissions
- [ ] Document build process
- [ ] Document environment variables
- [ ] Add troubleshooting section
- [ ] Add screenshots

### 4.20 Documentation - Backend
- [ ] Create README.md
- [ ] Document API endpoints
- [ ] Document authentication
- [ ] Document database schema
- [ ] Document environment variables
- [ ] Add API examples (curl/Postman)
- [ ] Document deployment process

### 4.21 Documentation - Web Dashboard
- [ ] Create README.md
- [ ] Document setup instructions
- [ ] Document build process
- [ ] Document environment variables
- [ ] Document deployment process
- [ ] Add screenshots
- [ ] Document component structure

### 4.22 User Documentation
- [ ] Create user guide
- [ ] Document how to setup mobile app
- [ ] Document how to grant HealthKit permissions
- [ ] Document how to sync data
- [ ] Document how to view dashboard
- [ ] Add FAQ section
- [ ] Add troubleshooting guide

### 4.23 Final Polish - Mobile App
- [ ] Review UI/UX
- [ ] Improve button labels
- [ ] Add helpful tooltips
- [ ] Improve error messages
- [ ] Add success messages
- [ ] Test haptic feedback
- [ ] Review app icon

### 4.24 Final Polish - Web Dashboard
- [ ] Review UI/UX
- [ ] Improve layout spacing
- [ ] Ensure consistent styling
- [ ] Improve loading states
- [ ] Add empty states
- [ ] Review color scheme
- [ ] Test animations

### 4.25 Monitoring Setup
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (optional)
- [ ] Setup uptime monitoring (UptimeRobot)
- [ ] Setup performance monitoring
- [ ] Create alerting for critical errors
- [ ] Create dashboard for metrics

### 4.26 Backup Strategy
- [ ] Setup automated database backups
- [ ] Test backup restoration
- [ ] Document backup procedures
- [ ] Setup backup retention policy

### 4.27 MVP Launch Checklist
- [ ] All critical bugs fixed
- [ ] All three components deployed
- [ ] Documentation complete
- [ ] Monitoring in place
- [ ] Backups configured
- [ ] User guide ready
- [ ] Team trained (if applicable)

### 4.28 Soft Launch
- [ ] Deploy to production
- [ ] Test with small group of users (3-5)
- [ ] Gather feedback
- [ ] Monitor for errors
- [ ] Fix any issues found
- [ ] Iterate based on feedback

### 4.29 MVP Complete! 🎉
- [ ] Celebrate completion
- [ ] Document lessons learned
- [ ] Plan next features
- [ ] Gather user feedback
- [ ] Create roadmap for v2.0

---

## 📊 Progress Tracking

**Overall Progress**: 0 / 429 tasks completed (0%)

### Phase Breakdown:
- **Phase 0 (Pre-Dev)**: 0 / 15 tasks (0%)
- **Phase 1 (Mobile App)**: 0 / 124 tasks (0%)
- **Phase 2 (Backend)**: 0 / 162 tasks (0%)
- **Phase 3 (Web Dashboard)**: 0 / 99 tasks (0%)
- **Phase 4 (Testing & Polish)**: 0 / 29 tasks (0%)

---

## 📝 Notes

- **Critical Path**: Phase 1 (Mobile App) → Phase 2 (Backend) → Phase 3 (Web Dashboard)
- **Parallelization**: Backend and Web Dashboard can be developed in parallel once APIs are defined
- **Testing**: Continuous testing throughout development, not just in Phase 4
- **Iterations**: Expect to iterate on designs and features based on testing

---

## 🔗 Resources

- [mvp.md](./mvp.md) - Technical specification
- [Apple HealthKit Docs](https://developer.apple.com/documentation/healthkit)
- [Reading Data from HealthKit](https://developer.apple.com/documentation/healthkit/reading-data-from-healthkit)
- [react-native-health](https://github.com/agencyenterprise/react-native-health)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Last Updated**: {{ date }}
**Version**: 1.0
