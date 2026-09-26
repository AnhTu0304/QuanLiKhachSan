# Design Specification: NATHotel Luxury Resort Website

**Date:** 2026-08-19  
**Brand:** NATHotel - Luxury Seaside Retreat  
**Architecture Path:** Architectural  

---

## 1. Executive Summary

NATHotel is a luxury seaside resort website designed to deliver a high-end visual experience inspired by minimalist modern luxury hotel aesthetics. The website features interactive 3D WebGL water animations (Three.js), smooth scroll-driven transitions (GSAP & ScrollTrigger), comprehensive homepage sections (Hero, Rooms, Services including Breakfast Buffet, Location, Contact), and a complete multi-step online room booking & simulated payment flow on a dedicated `/booking` route.

---

## 2. Technical Stack & Dependencies

- **Framework:** React 19 (`react`, `react-dom`)
- **Routing:** `react-router-dom` v6
- **Styling:** Tailwind CSS + Lucide React Icons
- **3D Graphics & Shaders:** Three.js (`three`)
- **Animations:** GSAP 3 (`gsap`), `@gsap/react`, `ScrollTrigger`
- **State Management:** React Context API (`BookingContext`) for room selection, date range, add-on services (Breakfast Buffet, Airport Transfer, Spa), guest info, and booking receipts.

---

## 3. Architecture & File Structure

```
frontend/
├── public/
│   └── assets/           # Images & media assets
└── src/
    ├── context/
    │   └── BookingContext.jsx    # Centralized booking & cart state
    ├── components/
    │   ├── 3d/
    │   │   └── WaterCanvas.jsx   # Three.js 3D water ripple WebGL canvas
    │   ├── common/
    │   │   ├── Navbar.jsx        # Transparent luxury header navigation
    │   │   └── Footer.jsx        # Footer with links & newsletter
    │   ├── sections/
    │   │   ├── HeroSection.jsx         # Hero section matching Lunamare aesthetic
    │   │   ├── RoomsSection.jsx        # Room showcase with GSAP scroll animations
    │   │   ├── ServicesSection.jsx     # Breakfast buffet, Spa, Infinity Pool
    │   │   ├── LocationSection.jsx     # Map preview & location highlights
    │   │   └── ContactSection.jsx      # Contact inquiry form & hotline
    │   └── booking/
    │       ├── StepRoomSelect.jsx      # Step 1: Select room & dates
    │       ├── StepGuestDetails.jsx    # Step 2: Guest details form
    │       ├── StepPayment.jsx         # Step 3: QR Code & Credit Card payment simulation
    │       └── StepConfirmation.jsx    # Step 4: Booking receipt & QR Check-in
    ├── pages/
    │   ├── HomePage.jsx        # Main landing page
    │   └── BookingPage.jsx     # Multi-step booking page
    ├── App.jsx                 # Main application routes
    └── index.css               # Global styles & Tailwind directives
```

---

## 4. Component Details & Experience Flow

### 4.1 Homepage (`/`)

1. **Header / Navbar:**
   - Fixed header with backdrop blur on scroll.
   - Links: Rooms, Experiences/Services, Location, Contact.
   - Primary CTA Button: `RESERVE YOUR STAY` linking to `/booking`.

2. **Hero Section (Lunamare Aesthetic):**
   - Three.js WebGL Water Shader background plane responding to pointer movement and vertical scroll velocity.
   - Tagline: `LUXURY SEASIDE RETREAT · EST. 2026`
   - Headline: `Where the Sea Meets Stillness`
   - Description text with smooth GSAP fade-in.
   - CTAs: `RESERVE YOUR STAY` & `EXPLORE ROOMS →`.

3. **Rooms Section:**
   - Featured suites:
     - **Ocean Deluxe Suite** (65 m², 180° Sea View, $350/night)
     - **Presidential Beachfront Villa** (180 m², Private Pool, $850/night)
     - **Sunset Executive Room** (50 m², Private Sunset Terrace, $280/night)
   - Hover zoom effects, room specifications, direct "Book Room" trigger.

4. **Services & Experiences Section:**
   - **Gourmet Breakfast Buffet (Buffet Sáng Thượng Hạng):** International Á-Âu cuisine prepared by world-class chefs.
   - **Infinity Ocean Pool:** Unobstructed horizon views with poolside bar service.
   - **NATHotel Serenity Spa:** Organic aromatherapy and holistic wellness treatments.
   - **Fine Dining & Sunset Bar:** Rooftop dining experience overlooking the ocean.

5. **Location Section:**
   - Resort coordinates, private beach accessibility, proximity indicators:
     - 15 mins to International Airport
     - 5 mins to City Downtown
     - Direct Private Beachfront Access

6. **Contact Section:**
   - Inquiry form (Name, Email, Phone, Message, Preferred Service).
   - Direct hotline, email address, and reception desk information.

---

### 4.2 Booking & Payment Page (`/booking`)

1. **Step 1: Room & Date Selection:**
   - Check-in & Check-out date pickers.
   - Guest count selector (Adults, Children).
   - Add-on Service Checkboxes (Daily Breakfast Buffet, Airport Pick-up, Spa Package).
2. **Step 2: Guest Details Form:**
   - Full Name, Email Address, Phone Number, Special Requests (e.g. high floor, early check-in).
3. **Step 3: Payment Simulation:**
   - Payment method toggle:
     - **QR Code Payment (MoMo / VNPay / Bank Transfer):** Generates interactive QR code with countdown timer and mock scan button.
     - **Credit Card (Visa / Mastercard):** Card number, expiry date, CVV validation simulation.
4. **Step 4: Confirmation & Receipt:**
   - Booking reference ID (e.g., `NAT-889922`).
   - Summary of dates, room type, add-ons, total price breakdown.
   - Printable QR Code for quick resort check-in.

---

## 5. Animation & GSAP Strategy

- **Plugin Registration:** `gsap.registerPlugin(ScrollTrigger, useGSAP)`
- **Scope & Context:** All animations inside React components wrap within `useGSAP()` or `gsap.context()` for automatic cleanup on unmount.
- **Scroll reveal:** Sections animate `y: 40, opacity: 0` to `y: 0, opacity: 1` with `scrub: false` and `start: "top 80%"`.
- **Three.js Canvas Integration:** The WebGL water canvas updates uniform variables (`uTime`, `uMouse`, `uScrollSpeed`) inside an `requestAnimationFrame` loop, responding to scroll events via GSAP ScrollTrigger listeners.

---

## 6. Verification & Quality Assurance Plan

1. **Build & Syntax Check:** Run `npm run build` in `frontend/` to ensure no React 19 / JSX compile errors.
2. **WebGL Performance Check:** Verify Three.js canvas renders smooth 60fps without layout thrashing.
3. **Navigation & Flow Verification:** Verify navigation between `/` and `/booking`, step-by-step state persistence in `BookingContext`, and completion of simulated payment.
