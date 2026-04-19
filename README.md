# WatchTower 🚀

[![Docker](https://img.shields.io/badge/Docker-Compose-green)](https://docs.docker.com/compose/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node-22-green)](https://nodejs.org/)
[![TimescaleDB](https://img.shields.io/badge/TimescaleDB-2.15-orange)](https://www.timescale.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

## What is WatchTower?

**WatchTower** is a production-ready, real-time application metrics monitoring platform built for developers. Track your app's performance with zero-config SDK integration, interactive dashboards, and time-series optimized storage.

### 🚀 Key Differentiators & Skills Demonstrated
- **Time-Series Optimized**: Powered by TimescaleDB hypertables for efficient querying of high-cardinality metrics (e.g., AVG CPU/memory over time buckets).
- **Zero-Config SDK**: `@ankur3386/metrics-sdk` auto-captures HTTP metrics (active/total users, routes/status codes, CPU/memory usage, traffic I/O, response times).
- **Customizable Dashboards**: Drag-and-drop widgets with Recharts (line/bar/pie graphs), real-time updates, alerts.
- **Monorepo Excellence**: Turborepo + pnpm for scalable frontend/backend/DB packages.
- **Production-Ready**: Docker Compose multi-service (Postgres + TimescaleDB + Express API + React FE), Prisma ORM, JWT auth, Zod validation.
- **Key Metrics Tracked**:
  | Metric          | Description                  |
  |-----------------|------------------------------|
  | `activeUser`    | Concurrent active users     |
  | `totalUser`     | Total unique users           |
  | `route`         | Request path                 |
  | `status`        | HTTP status code             |
  | `memoryUsage`   | Node.js memory (MB)          |
  | `cpuUsage`      | CPU utilization (%)          |
  | `incomingTraffic` | Incoming bytes             |
  | `outgoingTraffic` | Outgoing bytes             |
  | `responseTime`  | Request duration (ms)        |
  | `timeStamps`    | Timestamp (time-series)      |

## ⚡ Quick Start (Self-Host)

1. **Clone & Install**
   ```bash
   git clone <repo>
   cd watchTower
   pnpm install
   ```

2. **Environment Setup** (`.env` in `apps/http_backend/src/`)
   ```
   POSTGRES_PASSWORD=your_pg_pass
   JWT_SECRET=your_jwt_secret
   API_SECRET=your_api_secret
   ```

3. **Migrate & Generate Prisma Clients**
   ```bash
   pnpm run dev:dbCore-migrate
   pnpm run dev:dbTimescale-migrate
   pnpm run dev:dbCore-generate
   pnpm run dev:db-timescale-generate
   ```

4. **Run with Docker (Recommended)**
   ```bash
   docker compose up -d
   ```
   - Backend API: http://localhost:3000
   - Frontend: http://localhost:5173

5. **Or Local Dev**
   ```bash
   pnpm dev  # FE:5173 + BE:3000
   ```

## 🔌 Integrate into YOUR App (3 Steps)

To monitor **your** project with WatchTower:

1. **Install SDK**
   ```bash
   npm i @ankur3386/metrics-sdk
   ```

2. **Sign Up → Create Project → Copy API Key**  
   Visit http://localhost:5173 → Dashboard → New Project → Copy API Key.

3. **Add to Your App's Entry File** (e.g., `index.js` / `app.js`)
   ```javascript
   import { initMetrics, userMetrics } from "@ankur3386/metrics-sdk";
   // or const { initMetrics, userMetrics } = require('@ankur3386/metrics-sdk');

   const app = express();
   app.use(userMetrics);  // Auto-tracks every request

   initMetrics({
     apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhZDQ5YjA5LWViZTEtNGNjOS05ODc0LTg2YjFlZjg5NWM5MCIsImlhdCI6MTc3NTcxMTExNH0.XrF7QTn6ig_nTvP_xXR8EUxIrzL2yBD8UvskxU_z0_o",
     url: 'http://localhost:3000/api/v1/client/metric-data'
   });
   ```

**That's it!** Metrics flow automatically. View dashboards at your WatchTower instance.

## 📊 WatchTower APIs

All under `/api/v1` (localhost:3000):

| Endpoint                  | Method | Auth     | Description                  |
|---------------------------|--------|----------|------------------------------|
| `/client/metric-data`     | POST   | API Key  | Ingest app metrics (main)   |
| `/sign-up`                | POST   | None     | Create user account         |
| `/sign-in`                | POST   | None     | Login (JWT)                 |
| `/api-key`                | GET    | JWT      | List project API keys       |
| `/project/addMetric`      | POST   | JWT      | Add project metric          |
| `/project/latestData`     | GET    | JWT      | Latest dashboard data       |
| `/project/getUserDefaultData` | GET | JWT   | Default project metrics     |
| `/dashboard`              | GET    | JWT      | User dashboard summary      |

**Metric Payload Schema** (Zod-validated):
```ts
{
  projectId: string,
  activeUser: number,
  totalUser: number,
  route: string,
  status: string,
  memoryUsage: number,
  incomingTraffic: number,
  outgoingTraffic: number,
  cpuUsage: number,
  timeStamps: Date,
  responseTime: number
}
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐
│   Your App      │───▶│   SDK Middleware │
│   + SDK         │    │   (userMetrics)  │
└─────────────────┘    └──────────────────┘
                               │
                               ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  WatchTower FE  │◀───│  Express API     │───▶│TimescaleDB (TS) │
│(React/Charts)   │    │  (/api/v1)       │    │(Metrics)        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                               │
                               ▼
                          Postgres (Users/Projects)
```

## 🚀 Build & Deploy

- **Build**: `pnpm build`
- **Start Prod**: `pnpm run start:http` (backend)
- **Docker Build**: As in Dockerfile.http/Dockerfile.fe
- **CI/CD**: GitHub Actions (cd_backend.yml, cd_frontend.yml)

## Contributing

1. Fork & PR.
2. Follow TS/ESLint/Prettier.
3. Update schemas → `pnpm run dev:*-migrate && dev:*generate`.

## License
MIT
