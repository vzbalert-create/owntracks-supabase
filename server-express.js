// server-express.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

// --- Connexion Supabase ---
const supabaseUrl = "https://gpbvhgglhpdjhijyoekc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYnZoZ2dsaHBkamhpanlvZWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODAxNTQsImV4cCI6MjA3MzM1NjE1NH0.yUDGxkm9ikcRMcL5J995mYFtr6kUNvv7Yc8GUGiYNHU"; // clé secrète
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Endpoint POST ---
app.post('/api/locations', async (req, res) => {
  const { account, amount } = req.body;

  const { error } = await supabase
    .from('TRANSACTION')
    .insert([
      { account, amount }
    ]);

  if (error) {
    console.error('❌ Erreur insertion Supabase:', error);
    return res.status(500).json({ error: 'Insertion failed' });
  }

  console.log('✅ Position insérée dans Supabase:', { account, amount });
  res.json({ status: 'ok' });
});

// GET simple
app.get('/', (req, res) => res.send('Express + Supabase 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
