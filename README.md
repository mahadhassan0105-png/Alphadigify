# Alphadigify Digital Agency Platform

A fully integrated Next.js 14 SaaS application featuring a public-facing digital agency marketing site and a heavily authenticated robust internal CRM.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **UI & Styling:** Tailwind CSS + Shadcn UI + Framer Motion
- **Database ORM:** Prisma
- **Database System:** PostgreSQL (Supabase)
- **Admin Authentication:** NextAuth.js v5 (auth.js)
- **CMS:** Sanity.io (for dynamic content integration)
- **Emails:** Resend API

## Pre-requisites
1. Node.js >= 20.0
2. A running PostgreSQL database (or Supabase project)
3. Environment variables explicitly loaded per `.env.local`

## 🚀 Deployment to Vercel

This repository is optimized for serverless deployment on Vercel. 

### 1. Database Setup
Create a PostgreSQL database (e.g., Supabase, Neon) and get the connection string.
Apply the Prisma schema to your database:
`npx prisma migrate deploy`

### 2. Seeding test data
You can seed your new database to generate the initial admin settings:
`npx tsx prisma/seed.ts`
*(Default admin login is `admin@alphadigify.com`)*

### 3. Vercel Configuration
1. Push your code to GitHub and connect it to Vercel.
2. Add all variables from `.env.local` into the Vercel Environment Variables settings.
3. Vercel will automatically run `npm run build` and deploy the application.
