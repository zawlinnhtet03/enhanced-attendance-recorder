# Attendance Recorder (Next.js)

A Next.js 14 app to record attendee check-ins and check-outs for a single event, with:

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

## Deploy

- Build: `npm run build`
- On Netlify, set build command to `npm run build` and publish directory to `.next`
- Set env vars in dashboard (e.g., `DATABASE_URL`, optionally `NEXT_PUBLIC_APP_URL`)

## Tech Stack

- Next.js 14 (App Router)
- Prisma ORM (PostgreSQL)
- Tailwind CSS

## License

This project is intended for a single event with limited distribution. A permissive license such as MIT is typically fine, or you can choose a "no liability, no warranty" license like the Unlicense.

- If you want the simplest permissive license: MIT
- If you prefer a public domain dedication: Unlicense

See `LICENSE` for the chosen license.
