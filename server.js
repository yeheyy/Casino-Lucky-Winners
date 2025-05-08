const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const dataFilePath = path.join(__dirname, 'data.json');
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve index.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve login.html
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve visitors.html
app.get('/visitors.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'visitors.html'));
});

// GET route to fetch data
app.get('/data.json', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(JSON.parse(data));
  });
});

// POST route to add new content with image
app.post('/add', upload.single('image'), (req, res) => {
  const newContent = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  newContent.image = imageUrl;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let contentArray = JSON.parse(data);
    contentArray.push(newContent);

    fs.writeFile(dataFilePath, JSON.stringify(contentArray, null, 2), (err) => {
      if (err) {
        console.error('Error writing to data.json:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Content added successfully', imageUrl });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
