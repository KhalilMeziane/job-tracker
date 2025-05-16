# Job Tracker

A simple and fast job application tracking system built with Next.js 14, TypeScript, and Prisma ORM, using PostgreSQL as the database.

## 🚀 Features

- Manage job applications with details like company, role and status.
- Track progress through stages like Applied, Interviewing, Offered, Accepted, and Rejected.
- Add custom notes for better organization and context.
- Search and filter applications quickly and efficiently.
- Fully responsive UI built with Next.js 14, Shadcnui, and Tailwind CSS.
- Secure user authentication with personalized data access.
- Type-safe and efficient database handling using Prisma ORM with PostgreSQL.

## 🛠️ Technologies

- **Next.js 14 (App Router)**
- **TypeScript**
- **Prisma ORM**
- **Tailwind CSS**
- **ShadcnUi**

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/KhalilMeziane/job-tracker.git
cd job-tracker
```

Install dependencies:

```bash
npm install
```

#### Database Setup

Create a Postgres database and add the connection string to your .env file:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
```

#### Prisma Setup

Run the following command to generate the Prisma client and create the database tables:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### Run the App

Run the development server:

```bash
npm run dev
```
