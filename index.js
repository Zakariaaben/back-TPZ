// Importing necessary modules
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Initializing express app
const app = express();
const PORT = 3002;

// Enable CORS
app.use(cors());

// Body parsing middleware for JSON
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Initial data
let data = "Initial Content";

// Default route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET endpoint to retrieve data
app.get('/data', (req, res) => {
  res.send(data);
});

// POST endpoint to update data with file upload
app.post('/update', upload.single('file'), (req, res) => {
  if (req.file) {
    const filePath = path.join(__dirname, req.file.path);
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
        return res.status(500).send('Server error: Unable to read file');
      }
      data = fileContent;
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).send('Server error: Unable to delete file');
        }
        res.send('Data updated successfully');
      });
    });
  } else {
    res.status(400).send('Bad request: No file provided');
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;