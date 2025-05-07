const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

app.use(express.json());
app.use(express.static(__dirname));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get all testimonies
app.get('/testimonies', (req, res) => {
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading data file' });
    const testimonies = JSON.parse(data);
    res.json(testimonies);
  });
});

// Add new testimony
app.post('/testimonies', upload.single('image'), (req, res) => {
  const { username, desc } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

  const newTestimony = {
    username,
    desc,
    img: imagePath
  };

  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading data file' });
    const testimonies = JSON.parse(data);
    testimonies.unshift(newTestimony);

    fs.writeFile(DATA_FILE, JSON.stringify(testimonies, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error saving data file' });
      res.json({ success: true });
    });
  });
});

// Admin Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'ggyy' && password === 'Aa112233*') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
