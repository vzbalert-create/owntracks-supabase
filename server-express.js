// server-express.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST pour OwnTracks (ou tests)
app.post('/api/locations', (req, res) => {
  const data = req.body;
  console.log('📍 Position reçue (Express):', data);
  res.json({ status: 'ok' });
});

// GET simple pour vérifier que le service tourne
app.get('/', (req, res) => res.send('Express server running on Render 🚀'));

app.listen(PORT, () => console.log(`Express server listening on http://localhost:${PORT}`));
