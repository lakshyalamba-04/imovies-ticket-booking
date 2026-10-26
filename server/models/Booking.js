const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  movie: { type: String, required: true }, // supports AlmaBetter "movie" property
  movieId: { type: String },
  movieTitle: { type: String },
  poster: { type: String },
  theater: { type: String },
  theaterId: { type: String },
  theaterName: { type: String },
  screen: { type: String },
  showDate: { type: String, default: "Today" },
  slot: { type: String }, // supports AlmaBetter "slot"
  timeSlot: { type: String, required: true },
  seats: { type: [String], required: true }, // e.g. ["A1", "A2"]
  seatTier: { type: String, default: "Premium" },
  ticketCount: { type: Number },
  baseFare: { type: Number },
  convenienceFee: { type: Number, default: 30 },
  snacksTotal: { type: Number, default: 0 },
  snacks: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ],
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: "UPI" },
  paymentStatus: { type: String, default: "Paid" },
  bookingDate: { type: Date, default: Date.now },
  userName: { type: String, default: "Guest User" },
  userEmail: { type: String, default: "guest@imovies.com" },
  userPhone: { type: String },
  status: { type: String, default: "Confirmed" },
  qrCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
