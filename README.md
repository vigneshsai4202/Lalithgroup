# LIFT Foods — Full Stack Website

**Lalith Innovation Food Technology** — Rice Mill Website

## Tech Stack
- Frontend: React + Vite + Tailwind CSS v4
- Backend: Node.js + Express + MongoDB
- Email: Nodemailer

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone / Download
```bash
cd LIFT
```

### 2. Install Dependencies
```bash
# Install all at once
cd client && npm install
cd ../server && npm install
```

### 3. Configure Environment
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI, SMTP credentials, etc.
```

### 4. Seed the Database
```bash
cd server
node seed.js
# Creates sample products, testimonials, and admin user
# Admin: admin@liftfoods.in / Admin@123
```

### 5. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

### 6. Access
- Website: http://localhost:5173
- Admin Panel: http://localhost:5173/admin/login
- Admin credentials: `admin@liftfoods.in` / `Admin@123`

---

## Deployment

### Frontend → Vercel
1. Push `client/` folder to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL` (if using separate backend domain)

### Backend → Render
1. Push `server/` folder to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add all `.env` variables in Render's Environment tab
6. Use MongoDB Atlas for production database

### MongoDB Atlas (Production)
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Whitelist Render's IP (or use 0.0.0.0/0 for simplicity)
3. Copy connection string to `MONGO_URI` in Render env vars

---

## Admin Panel
URL: `/admin/login`

Features:
- View dashboard stats
- Add / Edit / Delete products
- View and manage inquiries (with CSV export)
- Add / Delete testimonials
- Upload gallery images

---

## ✅ Replacement Checklist

Replace all items marked `{/* REPLACE */}` or `XXXXXXXXXX`:

### Contact & Identity
- [ ] Phone number: `+91-XXXXXXXXXX`
- [ ] WhatsApp number: `91XXXXXXXXXX` (in `WhatsAppButton.jsx` and `Contact.jsx`)
- [ ] Email: `info@liftfoods.in`
- [ ] Address: Village, Mandal, District, Telangana
- [ ] Google Maps embed URL in `Contact.jsx`
- [ ] Founder name in `About.jsx`
- [ ] Founder bio in `About.jsx`

### Branding
- [ ] Logo: Replace the SVG letter "L" in `Navbar.jsx` and `Footer.jsx` with your actual logo
- [ ] Favicon: Replace `client/public/favicon.svg`
- [ ] OG image: Add `client/public/og-image.jpg` (1200×630px)

### Images
- [ ] All Unsplash placeholder images — replace with real mill/product photos
- [ ] Founder photo in `About.jsx`

### Certifications
- [ ] FSSAI number in `Quality.jsx`
- [ ] ISO number in `Quality.jsx`
- [ ] Agmark number in `Quality.jsx`
- [ ] APEDA number in `Quality.jsx`
- [ ] Downloadable certificate PDFs

### SEO & Analytics
- [ ] Domain in `index.html` canonical and OG tags
- [ ] Google Analytics GA4 script in `index.html`
- [ ] Update `sitemap.xml` with real domain
- [ ] Update `robots.txt` with real domain

### Email
- [ ] SMTP credentials in `server/.env`
- [ ] Admin email in `server/.env`
- [ ] Phone number in auto-reply email (`server/middleware/mailer.js`)

### Security
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change admin password after first login
- [ ] Disable `/api/auth/setup` route in production

---

## Project Structure
```
LIFT/
├── client/                 # React + Vite frontend
│   ├── public/             # Static files (favicon, sitemap, robots)
│   └── src/
│       ├── components/     # Navbar, Footer, ProductCard, InquiryForm, etc.
│       ├── context/        # AuthContext
│       ├── pages/          # All page components
│       │   └── admin/      # Admin panel pages
│       └── utils/          # Axios API instance
├── server/                 # Node.js + Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, upload, mailer
│   ├── seed.js             # Database seeder
│   └── index.js            # Entry point
└── README.md
```
