const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { movies: seedMovies, theaters: seedTheaters, snacks: seedSnacks, initialBookings } = require('../data/seedData');

let isConnected = false;

// Local JSON store path for file-based fallback
const storeFilePath = path.join(__dirname, '../data/store.json');

// Memory store
const memoryStore = {
  movies: [...seedMovies],
  theaters: [...seedTheaters],
  snacks: [...seedSnacks],
  bookings: [...initialBookings],
  users: [
    {
      id: "usr-1",
      name: "Demo Moviegoer",
      email: "user@imovies.com",
      password: "password123",
      role: "user",
      phone: "+91 98765 43210"
    },
    {
      id: "usr-admin",
      name: "Cinema Manager",
      email: "admin@imovies.com",
      password: "admin123",
      role: "admin",
      phone: "+91 98989 89898"
    }
  ]
};

// Save to disk if using fallback
function persistStore() {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(memoryStore, null, 2));
  } catch (err) {
    // ignore
  }
}

// Load store from disk if exists
function loadPersistedStore() {
  try {
    if (fs.existsSync(storeFilePath)) {
      const data = JSON.parse(fs.readFileSync(storeFilePath, 'utf8'));
      if (data.movies && data.movies.length > 0) memoryStore.movies = data.movies;
      if (data.theaters && data.theaters.length > 0) memoryStore.theaters = data.theaters;
      if (data.snacks && data.snacks.length > 0) memoryStore.snacks = data.snacks;
      if (data.bookings) memoryStore.bookings = data.bookings;
      if (data.users) memoryStore.users = data.users;
    } else {
      persistStore();
    }
  } catch (e) {
    console.error("Failed to load store.json, using defaults", e.message);
  }
}

loadPersistedStore();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/imovies';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    await seedMongooseData();
  } catch (error) {
    console.warn(`⚠️ MongoDB connection unavailable (${error.message}).`);
    console.log(`🚀 Active: High-performance In-Memory & File-backed Store (Zero-config ready)`);
    isConnected = false;
  }
};

async function seedMongooseData() {
  try {
    const Movie = require('../models/Movie');
    const Theater = require('../models/Theater');
    const Booking = require('../models/Booking');

    const movieCount = await Movie.countDocuments();
    if (movieCount === 0) {
      console.log('🌱 Seeding initial movies into MongoDB...');
      await Movie.insertMany(seedMovies);
    }

    const theaterCount = await Theater.countDocuments();
    if (theaterCount === 0) {
      console.log('🌱 Seeding theaters into MongoDB...');
      await Theater.insertMany(seedTheaters);
    }

    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0) {
      console.log('🌱 Seeding demo booking into MongoDB...');
      await Booking.insertMany(initialBookings);
    }
  } catch (err) {
    console.error('MongoDB seed error:', err.message);
  }
}

module.exports = {
  connectDB,
  isMongoConnected: () => isConnected,
  store: memoryStore,
  persistStore
};
