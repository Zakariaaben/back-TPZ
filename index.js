// Importing necessary modules
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer for handling file uploads
const fs = require('fs'); // Import fs for file system operations

// Initializing express app
const app = express();
const PORT = 3002;

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure 'uploads' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for handling file uploads
const upload = multer({ dest: uploadDir }); // Destination folder for uploaded files

// Initial data
let data = "Initial Content";

// GET endpoint to retrieve data
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/data', (req, res) => {
  res.send(data);
});

// POST endpoint to update data
// Accepts JSON or TXT files
app.post('/update', upload.single('file'), (req, res) => {
  if (req.file) {
    // If a file is uploaded, read its content and update data
    fs.readFile(req.file.path, 'utf8', (err, fileContent) => {
      if (err) {
        return res.status(500).send('Error reading the uploaded file');
      }
      data = fileContent;
      res.send('Data updated successfully');
    });
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
