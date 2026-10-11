# eShopBD Backend Server 🚀

Enterprise-grade multi-vendor eCommerce backend API powered by **Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL**.

---

## 🛠️ Tech Stack
- **Runtime & Language**: Node.js (TypeScript)
- **Web Framework**: Express.js
- **ORM**: Prisma ORM (v6)
- **Database**: PostgreSQL (Compatible with Local PostgreSQL, Supabase, Neon, Coolify)
- **Validation**: Zod
- **Authentication**: JWT & bcryptjs
- **Dev Tools**: `tsx` (fast modern TypeScript runner)

---

## 📁 Project Structure

```
eShopBD-Server/
├── prisma/
│   └── schema.prisma         # Complete PostgreSQL schema (Users, Stores, Products, Orders, etc.)
├── src/
│   ├── config/
│   │   ├── db.ts             # PrismaClient singleton instance
│   │   └── env.ts            # Typed environment variables
│   ├── middlewares/
│   │   ├── errorHandler.ts   # Global error handling
│   │   └── notFound.ts       # 404 API route handler
│   ├── routes/
│   │   ├── health.routes.ts  # Health check & database probe (/api/health)
│   │   └── index.ts          # Central API router (/api/...)
│   ├── app.ts                # Express app configuration & middleware pipeline
│   └── index.ts              # Server startup & graceful shutdown
├── .env                      # Local environment secrets (Ignored in Git)
├── .env.example              # Environment template
├── tsconfig.json             # TypeScript modern configuration
└── package.json
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database in `.env`
Open `.env` and set your PostgreSQL connection string:
```env
# Local PostgreSQL
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/eshopbd_db?schema=public"

# OR Supabase Cloud PostgreSQL
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### 3. Generate Prisma Client & Run Migration
```bash
# Generate TypeScript types from Prisma schema
npm run prisma:generate

# Push schema to PostgreSQL database
npm run prisma:migrate
```

### 4. Start Development Server
```bash
npm run dev
```

Visit:
- Server Root: `http://localhost:5000/api`
- Health Check: `http://localhost:5000/api/health`

### 5. Open Prisma Visual Studio (GUI Database Browser)
```bash
npm run prisma:studio
```
Prisma Studio opens at `http://localhost:5555`, allowing you to inspect, filter, edit, and create database records visually in your browser!
