# AuggieMap – Campus Walking Directions (Backend Prototype)

This project is a backend prototype for a campus navigation system that provides **walking directions between two locations** using the **Mapbox Directions API**.

The focus so far is on:
- backend design
- API correctness
- security (no exposed keys)
- clean separation between backend logic and views

No frontend map rendering is implemented yet.

---

## What I have Implemented So Far

### 1. Express Backend Setup
- Created an Express server (`index.js`)
- Served static files from the `public/` directory
- Configured EJS as the view engine
- Set up a basic `/` route to test routing logic

---

### 2. Secure Environment Variables
- Created a `.env` file (not committed to GitHub)
- Stored Mapbox configuration securely:
  - `MAPBOX_API_BASE`
  - `MAPBOX_ACCESS_TOKEN`
- Used `dotenv` to load environment variables at runtime

This prevents API keys from being exposed in source code.

---

### 3. Mapbox Directions API Integration
- Integrated Mapbox Directions API using `axios`
- Configured **walking directions**
- Correctly formatted coordinates as:
