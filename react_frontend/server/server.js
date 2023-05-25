const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Endpoint for file upload
app.post('/api/upload', upload.array('files'), (req, res) => {
  // Files are available in `req.files`
  console.log(req.files);

  // Perform further operations like saving files, processing, etc.

  // Send a response back to the client
  res.send('12345');
});

// Start the server
const port = 3001; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
