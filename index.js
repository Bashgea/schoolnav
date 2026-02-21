import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "buildings.json"), "utf-8")
);

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));

// Homepage - show the map
app.get("/", (req, res) => {
  res.render("index.ejs", {
    mapboxPublicToken: process.env.MAPBOX_PUBLIC_TOKEN
  });
});

// Get list of all buildings
app.get("/buildings", (req, res) => {
  res.json(buildings);
});

// Calculate route between two points
app.get("/route", async (req, res) => {
  try {
    const { fromLon, fromLat, toLon, toLat } = req.query;
    
    // Call Mapbox routing API
    const result = await axios.get(
      `${process.env.MAPBOX_API_BASE}/walking/${fromLon},${fromLat};${toLon},${toLat}`,
      {
        params: {
          access_token: process.env.MAPBOX_ACCESS_TOKEN,
          geometries: "geojson",
          overview: "full"
        }
      }
    );
    
    const route = result.data.routes[0];
    
    // Send back route info
    res.json({
      distance: route.distance,
      duration: route.duration,
      geometry: route.geometry
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Could not calculate route" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});