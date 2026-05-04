require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => { res.on("finish", () => { console.log(`[REQ] ${req.method} ${req.originalUrl} - ${res.statusCode}`); }); next(); });

const path = require('path');

app.use(express.urlencoded({ extended: false }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Blood Bank Management System API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
