require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

const movieRoutes = require('./routes/movieRoutes');
const theaterRoutes = require('./routes/theaterRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database (with automatic graceful fallback)
connectDB();

// API Routes
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/bookings', bookingRoutes); // Alias for both endpoints
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'IMovies - Movie Ticket Booking Made Simple',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send(`
        <html>
          <head><title>IMovies API Server</title></head>
          <body style="font-family: sans-serif; background: #0b0f19; color: #fff; padding: 40px; text-align: center;">
            <h1 style="color: #e50914;">🎬 IMovies - Movie Ticket Booking API</h1>
            <p>API Server is active on port ${PORT}.</p>
            <p>Frontend client build will be served here once built (run <code>npm run build</code>).</p>
            <p><a href="/api/movies" style="color: #38bdf8;">Browse Movies API</a> | <a href="/api/booking/last" style="color: #38bdf8;">Last Booking API</a></p>
          </body>
        </html>
      `);
    }
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=================================================`);
  console.log(`🎬 IMovies Server running at http://localhost:${PORT}`);
  console.log(`🍿 REST API ready on http://localhost:${PORT}/api/`);
  console.log(`=================================================\n`);
});
