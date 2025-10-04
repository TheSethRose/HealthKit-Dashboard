# HealthKit Dashboard

A hybrid mobile + web architecture for displaying Apple HealthKit data on a web dashboard.

## Architecture

```
iOS App (React Native) → Backend API (Node.js/Express) → Web Dashboard (Next.js)
     ↓                           ↓                              ↓
  HealthKit            PostgreSQL + Prisma              Tailwind + shadcn/ui
```

## Project Structure

- **`mobile/`** - React Native iOS app with HealthKit integration
- **`backend/`** - Node.js Express API with Prisma ORM
- **`web/`** - Next.js web dashboard with Recharts
- **`shared/`** - Shared TypeScript types and utilities

## Technology Stack

### Mobile App
- React Native 0.72+ with TypeScript
- react-native-health for HealthKit bridge
- Axios for API communication
- React Context for state management

### Backend API
- Node.js 18+ with Express
- PostgreSQL database
- Prisma ORM
- JWT authentication
- Express rate limiting

### Web Dashboard
- Next.js 14+ with App Router
- Tailwind CSS + shadcn/ui components
- TanStack Query for data fetching
- Recharts for data visualization
- date-fns for date formatting

## Quick Start

See README files in each component directory:
- [Mobile App Setup](./mobile/README.md)
- [Backend API Setup](./backend/README.md)
- [Web Dashboard Setup](./web/README.md)

## Development Timeline

- **Phase 0**: Environment Setup (1-2 hours)
- **Phase 1**: Mobile App (2-3 weeks)
- **Phase 2**: Backend API (1-2 weeks)
- **Phase 3**: Web Dashboard (2-3 weeks)
- **Phase 4**: Testing & Polish (1-2 weeks)

**Total MVP**: 6-10 weeks

## Documentation

- [MVP Requirements](./mvp.md) - Detailed architecture and implementation guide
- [TODO List](./todo.md) - Granular task breakdown

## Security & Privacy

- HTTPS only for all API communication
- JWT-based authentication
- HealthKit data encrypted at rest and in transit
- User consent required for all data collection
- HIPAA considerations for health data storage

## License

MIT
