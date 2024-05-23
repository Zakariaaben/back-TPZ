const express = require('express');
const app = express();
const cors  = require('cors')


// Stockage temporaire des données reçues
let donneesRecues = "";

app.use(express.text());
app.use(cors());


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


module.exports  = app;