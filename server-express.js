// server-express.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

// --- Connexion Supabase ---

const BOT_TOKEN = "8211651169:AAEZWvA_ShQErMaTytB5f5vH_dBorDDj0ng";   // ton token BotFather
const CHAT_ID = "578740783";          // ton chat_id


const supabaseUrl = "https://gpbvhgglhpdjhijyoekc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYnZoZ2dsaHBkamhpanlvZWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODAxNTQsImV4cCI6MjA3MzM1NjE1NH0.yUDGxkm9ikcRMcL5J995mYFtr6kUNvv7Yc8GUGiYNHU"; 
const supabase = createClient(supabaseUrl, supabaseKey);

let Longitude;
let Latitude;


// --- Endpoint POST ---
app.post('/api/locations', async (req, res) => {
  const data = req.body;
  console.log('📍 Position reçue (Express):', data);

  // Insertion dans Supabase
  const { error } = await supabase
    .from('LOGGER')
    .insert([
      { obj: data.topic,  lon: data.lon, lat: data.lat , pre: data.acc , alt: data.alt , now: data.created_at }  // champs adaptés à ta table
    ]);

  if (error) {
    console.error('❌ Erreur insertion Supabase:', error);
    return res.status(500).json({ error: 'Insertion failed' });
  }

  console.log('✅ Position insérée dans Supabase:', { lon: data.lon, lat: data.lat });
  res.json({ status: 'ok' });

  console.log('Message Telegram **************');

Longitude = data.lon;
Latitude = data.lat;
/*
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: data.lon
        })
      })
 */ 
  
});

// --- Endpoint GET simple ---
app.get('/', (req, res) => res.send(Longitude));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
