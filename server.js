import express from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Config Supabase via variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

// Endpoint pour OwnTracks
app.post("/api/locations", async (req, res) => {
  const data = req.body;
  console.log("📍 Position reçue :", data);

  const { error } = await supabase
    .from("positions")
    .insert([
      {
        device: data.tid || "unknown",
        lat: data.lat,
        lon: data.lon,
        timestamp: data.tst,
        battery: data.batt
      }
    ]);

  if (error) {
    console.error("❌ Erreur Supabase :", error);
    return res.status(500).json({ error: "Erreur Supabase" });
  }

  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("✅ API OwnTracks/Supabase fonctionne !");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur port ${PORT}`);
});
