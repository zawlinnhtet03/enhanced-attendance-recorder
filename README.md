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

## License

This project is intended for a single event with limited distribution. A permissive license such as MIT is typically fine, or you can choose a "no liability, no warranty" license like the Unlicense.

- If you want the simplest permissive license: MIT
- If you prefer a public domain dedication: Unlicense

See `LICENSE` for the chosen license.
