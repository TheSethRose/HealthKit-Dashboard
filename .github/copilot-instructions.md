# HealthKit Dashboard - AI Agent Instructions

## Architecture Overview

This is a **hybrid mobile + web architecture** for displaying Apple HealthKit data on a web dashboard:

```
iOS App (React Native) → Backend API (Node.js/Express) → Web Dashboard (Next.js)
     ↓                           ↓                              ↓
  HealthKit            PostgreSQL + Prisma              Tailwind + shadcn/ui
```

### Why This Architecture?
- **Web browsers cannot access HealthKit directly** - only native iOS apps can
- iOS app uses HealthKit queries to pull data, then syncs to backend via REST API
- Web dashboard fetches from backend, not directly from HealthKit

## Critical Data Flow

1. **iOS App** (`src/services/healthkit.ts`): Uses `react-native-health` to query HealthKit with proper permissions
2. **Sync Service** (`src/services/api.ts`): Batches health data and POSTs to `/api/health/sync`
3. **Backend API** (`src/server.ts`): Validates, stores in PostgreSQL via Prisma
4. **Web Dashboard** (`app/dashboard/page.tsx`): Fetches via TanStack Query, renders with Recharts

## HealthKit Query Patterns

**Always use the right query type:**
- `HKSampleQuery` - One-time data fetch (last 100 heart rate readings)
- `HKStatisticsQuery` - Calculations (average daily steps)
- `HKStatisticsCollectionQuery` - Time-series for graphs (daily calories for 30 days)
- `HKObserverQuery` - Background monitoring for new data (enable auto-sync)
- `HKAnchoredObjectQuery` - Get changes since last sync (efficient updates)

**Example from `src/services/healthkit.ts`:**
```typescript
// Use Statistics Collection Query for dashboard trends
export const getActivitySummary = (startDate: Date, endDate: Date): Promise<HealthActivitySummary>
// Use Observer Query for real-time sync
setupObserver('HKQuantityTypeIdentifierStepCount')
```

## Key Implementation Rules

### iOS App (Mobile)
- **Must run on physical device** - HealthKit doesn't work in iOS Simulator
- **Authorization first**: Call `initHealthKit()` before any queries
- **Info.plist required**: Add `NSHealthShareUsageDescription` and `NSHealthUpdateUsageDescription`
- **Xcode capability**: Enable HealthKit in Signing & Capabilities
- **Background sync**: Use `react-native-background-fetch` for 15-minute intervals
- **Batch API calls**: Don't sync every data point individually - group by timestamp

### Backend API (Server)
- **Prisma schema** (`prisma/schema.prisma`): 
  - `HealthData` model stores timestamped snapshots with JSON fields
  - Index on `[userId, timestamp]` for performance
  - Store workouts, sleep, heart rate as JSON (denormalized for MVP speed)
- **Authentication**: JWT tokens in Authorization header
- **Rate limiting**: 100 req/15min for `/api/health/sync`, 200 req/15min for reads
- **Validation**: Use `express-validator` on all POST endpoints
- **HTTPS only**: Health data must be encrypted in transit

### Web Dashboard (Frontend)
- **TanStack Query patterns**: 
  - Query key: `['healthData', userId]` with 60s staleTime
  - Refetch on window focus for real-time feel
- **shadcn/ui components**: Card, Badge, Avatar for health metrics
- **Recharts conventions**:
  - `ResponsiveContainer` wraps all charts
  - Use `date-fns` for X-axis formatting: `format(date, 'MMM d')`
- **Layout structure**: 
  - Left sidebar: Health categories navigation
  - Main: Pinned health cards in responsive grid
  - Right sidebar: Detailed widgets (nutrition, medications)

## Project-Specific Conventions

### File Structure
```
mobile/
  src/services/healthkit.ts  - All HealthKit queries
  src/services/api.ts        - Backend sync logic
backend/
  src/server.ts              - Express routes
  prisma/schema.prisma       - Database models
web/
  app/dashboard/page.tsx     - Main dashboard
  components/charts/         - Recharts wrappers
  hooks/useHealthData.ts     - Query hooks
```

### Environment Variables
- Mobile: `API_BASE_URL` in `.env` (use `react-native-dotenv`)
- Backend: `DATABASE_URL`, `JWT_SECRET`, `PORT`, `CORS_ORIGIN`
- Web: `NEXT_PUBLIC_API_URL`

### Common Commands
```bash
# iOS App (must be in ios/ directory)
pod install                 # After adding react-native-health
npx react-native run-ios    # Build and run on device

# Backend
npx prisma migrate dev      # Create/apply migrations
npx prisma generate         # Regenerate Prisma Client after schema changes
npm run dev                 # Start development server

# Web Dashboard
npm run dev                 # Next.js dev server
npx shadcn@latest add [component]  # Add UI components
```

## Security & Privacy Requirements

- **HIPAA considerations**: Encrypt data at rest if storing PHI
- **User consent**: Explicit HealthKit permission requests with clear usage descriptions
- **Data minimization**: Only request permissions actually needed
- **Revocation support**: Users must be able to delete their data
- **Secure storage**: Use `react-native-keychain` for auth tokens on mobile

## Testing Strategy

- **iOS**: Test on physical device with real Health app data
- **Sync reliability**: Test offline scenarios, retry logic, batch failures
- **Data accuracy**: Compare dashboard to Apple Health app
- **Authorization**: Test permission denied, partially granted scenarios
- **Performance**: Profile queries - use anchored queries for incremental updates

## Integration Points

- **react-native-health** → HealthKit: Bridge requires exact permission strings from Apple docs
- **Background fetch**: Register task in `AppDelegate.m` (iOS) for background sync
- **JWT flow**: Mobile app stores token → includes in sync requests → backend validates
- **WebSocket (optional)**: For real-time dashboard updates when mobile app syncs

## Common Pitfalls

1. **Don't query HealthKit on every app launch** - use observers and cache data
2. **Don't sync individual data points** - batch into 5-minute windows
3. **Prisma Client regeneration** - run `npx prisma generate` after schema changes
4. **CORS errors** - Add mobile app's origin to backend CORS config
5. **Date handling** - HealthKit uses `Date`, backend stores ISO strings, frontend uses `date-fns`

## When Adding New Health Metrics

1. Add read permission to `permissions` object in `healthkit.ts`
2. Create query function following existing patterns (promises with error handling)
3. Add field to `HealthData` model in Prisma schema
4. Run migration: `npx prisma migrate dev --name add_[metric_name]`
5. Update sync function in `api.ts` to include new metric
6. Add visualization component in dashboard using Recharts
7. Test on physical iOS device with real data

## Design System

- **Color palette**: Health categories use iOS colors (orange=Activity, red=Heart, purple=Sleep)
- **Cards**: White with subtle shadow, backdrop blur on gradient background
- **Typography**: System fonts, clear hierarchy with bold headers
- **Spacing**: Consistent 16px grid system
- **Responsive**: Mobile-first, grid adjusts to tablet/desktop

## Performance Targets

- Dashboard initial load: < 2s
- Health data sync: < 5s for 24h of data
- Chart rendering: < 200ms
- Background sync interval: 15 minutes
- API response time: < 500ms (P95)
