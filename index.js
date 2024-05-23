const express = require('express');
const app = express();
const PORT = 3000;

// Stockage temporaire des données reçues
let donneesRecues = "";

app.use(express.text());

// Route pour recevoir et stocker les données
app.post('/', (req, res) => {
  donneesRecues = req.body; // Stocker le contenu reçu
  console.log('Contenu reçu :', donneesRecues);
  res.send('Contenu du fichier reçu avec succès !');
});

// Route pour afficher les données stockées
app.get('/data', (req, res) => {
  if (!donneesRecues) {
    return res.status(404).send("Aucun contenu disponible.");
  }
  res.type('text/plain');
  res.send(donneesRecues);
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port localhost:${PORT}.`);
});