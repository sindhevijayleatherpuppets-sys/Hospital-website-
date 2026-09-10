# Dhanvanthari Ayurveda Hospital & Panchakarma Centre

A modern, production-grade web application for **Dhanvanthari Ayurveda Hospital & Panchakarma Centre**, located in Chikkaballapur, Karnataka. Built with Next.js 16 (Turbopack), React 19, TypeScript, and Prisma ORM.

---

## Features

- **Consultation & Treatment Booking**: Real-time appointment scheduling with UPI QR payment and Pay-on-Arrival options, including UPI UTR transaction reference capture.
- **Role-Based Portals**:
  - **Patient Dashboard**: View appointments, track status, view payment details, and access digital prescriptions online.
  - **Front Desk / Reception Portal**: Review incoming patient requests, approve appointments, and collect/verify consultation fees.
  - **Chief Physician Portal**: Access approved consultation queue, issue detailed digital prescriptions with clinical diagnoses, herbal formulations, dosage schedules, and Pathya dietary guidelines.
- **Herbal Apothecary & Medicine Store**: Catalog of classical Ayurvedic medicines (Kashayams, Tailas, Arishtams, Churnas) with real INR pricing.
- **Clinical Therapy Catalogs**: Detailed procedural guides for Panchakarma (Kati Basti, Shirodhara, Patrapottali, Shastishalik Pinda Sweda).
- **Responsive Navigation**: Full mobile drawer navigation with fluid animations and responsive layout.
- **Security**: Salted `scrypt` password hashing, timing-safe authentication, and secure HTTP-only session cookies.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI & Styling**: React 19, Native CSS with CSS Custom Properties
- **Database & ORM**: Prisma ORM 7, SQLite (`dev.db`) / PostgreSQL ready
- **Authentication**: JWT sessions with `jose`, salted `scrypt` password hashing
- **Language**: TypeScript 5

---

## Getting Started

### 1. Prerequisites

- Node.js 20+ (recommended v20 or v22+)
- npm or yarn

### 2. Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd "Hospital website"

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### 3. Database Initialization & Seeding

```bash
# Push schema and generate Prisma client
npx prisma db push
npx prisma generate

# Seed sample staff, patient, and medicine inventory
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Pre-Configured Test Credentials

| Role | Email | Password | Portal URL |
| :--- | :--- | :--- | :--- |
| **Chief Physician** | `doctor@dhanvanthari.com` | `doctor123` | `/auth/staff-login` |
| **Front Desk Reception** | `reception@dhanvanthari.com` | `reception123` | `/auth/staff-login` |
| **Sample Patient** | `patient@example.com` | `patient123` | `/auth/login` |

---

## Connecting Supabase (PostgreSQL Backend)

1. Create a free project at [Supabase](https://supabase.com).
2. Once your project is created, navigate to:
   - **Project Settings** (gear icon) &rarr; **Database**
   - Under **Connection string**, select **URI**.
   - Copy the URI string (it looks like `postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true`).
3. In your local `.env` file, set:
   ```env
   DATABASE_URL="your-supabase-connection-uri-with-password"
   JWT_SECRET="ayurcare-dhanvanthari-hospital-jwt-secret-key-2026-prod"
   ```
4. Push the database schema and seed the initial hospital data directly into Supabase:
   ```bash
   # Push schema tables (User, Appointment, Prescription, Product, GalleryImage)
   npm run db:push

   # Seed default staff (Doctor, Receptionist), sample patients, and Ayurvedic medicines
   npm run db:seed
   ```

---

## Deploying to Vercel

1. Go to [Vercel](https://vercel.com/new).
2. Connect your GitHub account and import:
   **`sindhevijayleatherpuppets-sys/Hospital-website-`**
3. In **Environment Variables**, add the two required variables:
   - **`DATABASE_URL`**: Your Supabase PostgreSQL Connection URI.
   - **`JWT_SECRET`**: `ayurcare-dhanvanthari-hospital-jwt-secret-key-2026-prod` (or any secure 32+ character string).
4. Click **Deploy**. Vercel will build and assign you a live HTTPS URL (e.g. `https://hospital-website-xyz.vercel.app`) in under 60 seconds!

---

## License

Private and proprietary. Created for Dhanvanthari Ayurveda Hospital & Panchakarma Centre.

