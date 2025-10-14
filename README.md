# Attendance Recorder 

- Admin dashboard for managing dynamic form fields (Check-in, Check-out, Only Check-out)
- QR code pages for quick access to forms
- Attendees page with per-category tables and Excel export
- Prisma + Neon (PostgreSQL)
- Tailwind CSS UI

## Quick start

- Requirements: Node 18+, npm
- Install: `npm i`
- Configure DB URL in `.env` -> `DATABASE_URL`
- Prisma: `npx prisma generate` and `npx prisma db push`
- Dev: `npm run dev`

## Tech Stack

- Next.js 14 (App Router)
- Prisma ORM (PostgreSQL)
- Tailwind CSS
