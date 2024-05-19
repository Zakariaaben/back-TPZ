// Importing necessary modules
const express = require('express');
const cors = require('cors');

// Initializing express app
const app = express();
const PORT = 3002;

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initial data
let data = "Initial Content";

// GET endpoint to retrieve data
app.get('/data', (req, res) => {
  res.send(data);
});

// POST endpoint to update data
app.post('/update', (req, res) => {
  const newData = req.body.content;
  if (newData) {
    data = newData;
    res.send('Data updated successfully');
  } else {
    res.status(400).send('Bad request: No content provided');
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
