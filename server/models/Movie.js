const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: { type: String },
  description: { type: String, required: true },
  genre: [{ type: String }],
  duration: { type: String, required: true },
  rating: { type: Number, default: 8.0 },
  votes: { type: String, default: "10K+" },
  language: { type: String, default: "English" },
  formats: [{ type: String }],
  certificate: { type: String, default: "UA" },
  releaseDate: { type: String },
  director: { type: String },
  cast: [
    {
      name: String,
      role: String,
      image: String
    }
  ],
  poster: { type: String, required: true },
  banner: { type: String },
  trailerUrl: { type: String },
  status: { type: String, default: "Now Showing" },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
