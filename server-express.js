// server-express.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());

// --- Connexion Supabase ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // clé secrète
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Endpoint POST ---
app.post('/api/locations', async (req, res) => {
  const { account, amount } = req.body;

  const { error } = await supabase
    .from('locations')
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
