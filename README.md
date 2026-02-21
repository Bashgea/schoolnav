# AuggieMap – Campus Navigation System

A web-based campus navigation system that provides interactive walking directions between buildings on Augsburg University's campus using the Mapbox Directions API and real-time GPS tracking.

## Features

### 🗺️ Interactive Map
- Live Mapbox GL map centered on Augsburg campus
- Visual route display with color-coded markers:
  - 🟢 Green marker: Your current location
  - 🔴 Red marker: Selected destination
  - 🔵 Blue line: Walking route

### 🏢 Building Selection
- Pre-loaded campus buildings database (`buildings.json`)
- Quick-select buttons for major campus locations:
  - Lindell Library
  - Christensen Center
  - Oren Gateway Center
  - Murphy Place
  - Sverdrup Hall

### 🧭 Two Navigation Modes
1. **Route Overview Mode**: Zoomed-out view showing entire route from start to destination
2. **Active Navigation Mode**: Zoomed-in view that follows you in real-time as you walk

### 📍 Real-Time GPS Tracking
- Live location updates using browser geolocation API
- Map automatically centers on user during active navigation
- Smooth marker transitions between GPS updates
- High-accuracy positioning with 30-second timeout for optimal GPS signal acquisition

### 📊 Route Information Display
- Distance in kilometers
- Estimated walking time in minutes
- Responsive design for mobile and desktop

## Tech Stack

**Backend:**
- Node.js + Express
- Mapbox Directions API (via axios)
- EJS templating engine
- dotenv for environment variable management

**Frontend:**
- Mapbox GL JS for interactive maps
- Vanilla JavaScript (no frameworks)
- Responsive CSS

**Data:**
- JSON-based building database

## Project Structure
```
auggiemap/
├── data/
│   └── buildings.json          # Campus building coordinates
├── views/
│   └── index.ejs               # Main map interface
├── public/                     # Static assets
├── index.js                    # Express server + API routes
├── .env                        # Environment variables (not committed)
├── package.json
└── README.md
```

## Setup & Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Bashgea/schoolnav.git
   cd schoolnav
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
```
   MAPBOX_API_BASE=https://api.mapbox.com/directions/v5/mapbox
   MAPBOX_ACCESS_TOKEN=your_secret_token_here
   MAPBOX_PUBLIC_TOKEN=your_public_token_here
```

   Get your tokens from: https://account.mapbox.com/access-tokens/

4. **Run the server:**
```bash
   node index.js
```

5. **Access the app:**
   - Desktop: Open `http://localhost:3000` in your browser
   - Mobile (same WiFi): Use your computer's local IP `http://192.168.x.x:3000`

## API Endpoints

### `GET /`
Returns the main map interface

### `GET /buildings`
Returns JSON array of all campus buildings with coordinates
```json
[
  {
    "name": "Lindell Library",
    "lon": -93.241612,
    "lat": 44.9672171
  }
]
```

### `GET /route`
Calculates walking route between two points

**Query Parameters:**
- `fromLon`: Starting longitude
- `fromLat`: Starting latitude
- `toLon`: Destination longitude
- `toLat`: Destination latitude

**Response:**
```json
{
  "distance": 820.5,
  "duration": 600,
  "geometry": { "type": "LineString", "coordinates": [...] }
}
```

## Security Features

✅ API keys stored in `.env` (not committed to repository)  
✅ Separate public/secret Mapbox tokens (server-side vs client-side)  
✅ Input validation for coordinate parameters  
✅ Error handling for failed API requests  

## Usage

1. **Select a destination** by clicking any building button
2. Allow location access when prompted by your browser
3. View the **full route overview** on the map
4. Click **"Start Navigation"** to enter active tracking mode
5. The map will follow you in real-time as you walk to your destination

## Testing

**Desktop Testing:**
- Use Chrome DevTools device emulation with custom GPS coordinates
- Press F12 → Toggle device toolbar → Sensors → Set location

**Mobile Testing:**
- Connect phone to same WiFi as development computer
- Access via local IP address (e.g., `http://192.168.1.105:3000`)
- Grant location permissions when prompted

## Future Enhancements

- [ ] Turn-by-turn voice navigation
- [ ] Multiple route options (fastest, scenic, accessible)
- [ ] Real-time traffic/crowd detection
- [ ] Save favorite routes
- [ ] Offline map caching
- [ ] Indoor navigation for multi-floor buildings
- [ ] Accessibility features (wheelchair-accessible routes)

## Known Limitations

- GPS accuracy varies (especially indoors)
- Browser geolocation is slower than native mobile apps
- Requires HTTPS for location access on some browsers (use ngrok for testing)
- Web-based GPS updates every 1-3 seconds (native apps are faster)

## Contributing

This is a campus project. Contributions welcome!

## License

MIT License

## Author

Bashir Ahmad - Augsburg University

## Acknowledgments

- Mapbox for mapping and routing APIs
- Augsburg University for campus data