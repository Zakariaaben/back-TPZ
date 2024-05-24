const express = require('express');
const app = express();
const cors = require('cors');

// Array to store received data, limited to 10 entries
let donneesRecues = [];
const MAX_ENTRIES = 10;

app.use(express.text());
app.use(cors());

// Route for receiving and storing data
app.post('/', (req, res) => {
  if (donneesRecues.length >= MAX_ENTRIES) {
    donneesRecues.shift(); // Remove the oldest entry if limit is reached
  }
  donneesRecues.push(req.body); // Store the received content
  const index = donneesRecues.length; // Get the one-based index
  console.log(`Contenu reçu à l'index ${index} :`, req.body);
  res.send(`Contenu du fichier reçu avec succès à l'index ${index} !`);
});

// Route for displaying stored data
app.get('/data/:i', (req, res) => {
  const index = parseInt(req.params.i, 10);
  if (isNaN(index) || index < 1 || index > donneesRecues.length) {
    return res.status(404).send("Aucun contenu disponible pour cet index.");
  }
  res.type('text/plain');
  res.send(donneesRecues[index - 1]); // Adjust for one-based index
});

module.exports = app;
