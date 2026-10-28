# 🎬 IMovies - Movie Ticket Booking Made Simple

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** cinema ticketing web application built for the **SkillWallet / AlmaBetter Capstone Module**.

---

## 🌟 Demo & Access Links

- **Live Public Demo URL:** [https://coupon-justice-enjoying-attract.trycloudflare.com](https://coupon-justice-enjoying-attract.trycloudflare.com)
---

## 🚀 Key Features

### 1. 🎞️ Movie Discovery & Filtering
- **Dynamic Search:** Real-time search across titles, genres, and directors.
- **Category Tabs:** Switch seamlessly between *Now Showing* and *Upcoming Releases*.
- **Genre & Language Filters:** Filter by Action, Sci-Fi, Adventure, Drama, Comedy, Animation, English, Hindi, Telugu, Tamil.
- **Movie Details:** High-definition backdrop banners, ratings, certification, cast avatars, and embedded official YouTube trailers.

### 2. 🏛️ Cinema Theaters & Showtimes
- **Multi-theater Support:** PVR ICON Gold Class, INOX Megaplex INSIGNIA, Cinépolis VIP.
- **Screen Formats:** IMAX 70mm, 4DX, RealD 3D, INSIGNIA Dolby Atmos.
- **7-Day Showtime Calendar:** Browse upcoming dates with interactive time-slot pills.

### 3. 💺 Visual Curved Cinema Seat Matrix
- **Authentic Cinema Screen:** Curved screen visualization with realistic neon light glow.
- **Three Tiered Seating:**
  - **VIP / Recliner (Rows A-B):** ₹450
  - **Premium (Rows C-F):** ₹280
  - **Classic (Rows G-H):** ₹180
- **Real-Time Seat States:** Available, Selected (with checkmark and glow), Sold Out / Booked.
- **Seat Limit:** Maximum 8 seats per booking with dynamic total computation.

### 4. 🍿 Gourmet Concessions & Food Lounge
- Add popcorn combos, cheese nachos, and beverages with intuitive `+` / `-` counters.
- Calorie counts and category tagging.
- Optional skip feature to proceed directly to payment.

### 5. 💳 Checkout & Instant Payment Simulation
- **Integrated Fares:** Base fare + concessions + convenience fee + taxes.
- **Promo Codes:**
  - `IMOVIE50`: Instant ₹50 OFF
  - `CINEMA20`: 20% discount
- **Multiple Payment Modes:** UPI QR Code preview, Credit/Debit Cards, and Net Banking.
- **Interactive Celebration:** Confetti explosion upon ticket confirmation!

### 6. 🎟️ Digital E-Ticket & Scannable QR Code
- Complete e-ticket layout with perforated cinema pass borders.
- Scannable QR code generated uniquely for every booking.
- Built-in **Print / Download Ticket** action.

### 7. ⏱️ Last Booking Details (SkillWallet / AlmaBetter Requirement)
- Meets the project test specification:
  - `GET /api/booking/last` or `GET /api/booking?last=true`
  - Floating status pill & dedicated drawer on the UI displaying the latest booking details.
  - Returns `{ message: "no previous booking found" }` when no bookings exist.

### 8. 🛡️ Cinema Admin Dashboard
- Box-Office KPI counters: Total Catalog Movies, Total Bookings, Reserved Seats, Gross Revenue.
- Add new movies directly to the database with poster, backdrop, rating, and trailer links.
- Remove movies and audit live real-time customer bookings.

---

## 🔑 Demo Accounts & Credentials

| Role | Email | Password |
|---|---|---|
| **Demo Customer** | `user@imovies.com` | `password123` |
| **Cinema Admin** | `admin@imovies.com` | `admin123` |

*(You can also use the **One-Click Quick Evaluation** buttons in the Sign In modal.)*

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Canvas Confetti.
- **Backend:** Node.js, Express.js, CORS, Dotenv, QR Code generator.
- **Database:** MongoDB & Mongoose with zero-configuration in-memory/JSON fallback so it runs instantly without requiring a local mongod daemon!

---

## 💻 Running Locally

```bash
# Navigate to project folder
cd C:\Users\laksh\.gemini\antigravity\scratch\imovies-app

# Start the unified production server
npm start

# Open your browser at
http://localhost:5000
```
