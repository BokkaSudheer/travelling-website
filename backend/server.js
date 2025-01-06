const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/Auth');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Options
const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to match your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Allow cookies to be included in requests
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const bookingRoutes = require('./routes/bookingroutes');
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourimApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
