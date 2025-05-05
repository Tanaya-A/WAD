const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

// API route to get product data
app.get('/api/products', (req, res) => {
    fs.readFile('products.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read product data' });
        }
        res.json(JSON.parse(data));
    });
});

// Serve the front-end HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
