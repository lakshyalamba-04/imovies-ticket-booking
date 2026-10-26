const { isMongoConnected, store } = require('../config/db');
const Theater = require('../models/Theater');

exports.getTheaters = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const theaters = await Theater.find({});
      return res.json({ success: true, count: theaters.length, data: theaters });
    }

    res.json({ success: true, count: store.theaters.length, data: store.theaters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTheaterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const theater = await Theater.findOne({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
      if (!theater) return res.status(404).json({ success: false, message: 'Theater not found' });
      return res.json({ success: true, data: theater });
    }

    const theater = store.theaters.find(t => t.id === id || t._id === id);
    if (!theater) return res.status(404).json({ success: false, message: 'Theater not found' });
    res.json({ success: true, data: theater });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSnacks = async (req, res) => {
  try {
    res.json({ success: true, count: store.snacks.length, data: store.snacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
