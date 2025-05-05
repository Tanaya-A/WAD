const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files like HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve user data
app.get('/api/users', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data.' });
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
