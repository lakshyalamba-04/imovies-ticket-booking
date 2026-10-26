const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  distance: { type: String },
  amenities: [{ type: String }],
  screens: [
    {
      screenNumber: Number,
      format: String,
      sound: String,
      shows: [String]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Theater', theaterSchema);
