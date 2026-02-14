import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

console.log("MAPBOX_API_BASE =", process.env.MAPBOX_API_BASE);
console.log("MAPBOX_ACCESS_TOKEN exists =", !!process.env.MAPBOX_ACCESS_TOKEN);


const app = express()
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req,res) =>{
    try{
        const fromLon = -93.241612;
        const fromLat = 44.9672171;
        const toLon = -93.240100;
        const toLat = 44.968200;
        
        const api = `${process.env.MAPBOX_API_BASE}/walking/` + 
                    `${fromLon},${fromLat};${toLon},${toLat}`;
        console.log("FINAL URL:", api);

        const result = await axios.get(api,{
            params: {
                access_token: process.env.MAPBOX_ACCESS_TOKEN,
                geometries: "geojson",
                steps: true,
                overview: "full"
            }
        });

        const route = result.data.routes[0];
        const leg = route.legs[0];

        res.render("index.ejs", {
            distance: route.distance,
            duration: route.duration,
            summary: leg.summary || ""
        });

    }catch (error){
        console.log(error.response?.data || error.message);
        res.status(500).send("Failed to fetch directions");
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
