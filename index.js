// Importing necessary modules
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads

// Initializing express app
const app = express();
const PORT = 3002;

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Initial data
let data = "Initial Content";

// GET endpoint to retrieve data
app.get('/', (req, res) => {
  res.send('Hello World')
});

app.get('/data', (req, res) => {
  res.send(data);
});

// POST endpoint to update data
// Accepts JSON or TXT files
app.post('/update', upload.single('file'), (req, res) => {
  if (req.file) {
    // If a file is uploaded, update data with its content
    data = req.file.buffer.toString(); // Convert buffer to string
    res.send('Data updated successfully');
  } else if (req.body.content) {
    // If JSON data is provided in the request body, update data with it
    const newData = req.body.content;
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
