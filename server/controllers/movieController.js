const { isMongoConnected, store, persistStore } = require('../config/db');
const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const { genre, search, language, status } = req.query;

    if (isMongoConnected()) {
      let query = {};
      if (genre && genre !== 'All') query.genre = genre;
      if (language && language !== 'All') query.language = language;
      if (status) query.status = status;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { director: { $regex: search, $options: 'i' } }
        ];
      }
      const movies = await Movie.find(query);
      return res.json({ success: true, count: movies.length, data: movies });
    }

    // Memory fallback
    let results = [...store.movies];
    if (genre && genre !== 'All') {
      results = results.filter(m => m.genre && m.genre.includes(genre));
    }
    if (language && language !== 'All') {
      results = results.filter(m => m.language && m.language.toLowerCase() === language.toLowerCase());
    }
    if (status) {
      results = results.filter(m => m.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(m => 
        (m.title && m.title.toLowerCase().includes(q)) || 
        (m.director && m.director.toLowerCase().includes(q)) ||
        (m.genre && m.genre.some(g => g.toLowerCase().includes(q)))
      );
    }

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const movie = await Movie.findOne({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
      if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
      return res.json({ success: true, data: movie });
    }

    const movie = store.movies.find(m => m.id === id || m._id === id);
    if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      id: req.body.id || `mov-${Date.now()}`
    };

    if (isMongoConnected()) {
      const newMovie = await Movie.create(movieData);
      return res.status(201).json({ success: true, data: newMovie });
    }

    store.movies.unshift(movieData);
    persistStore();
    res.status(201).json({ success: true, data: movieData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await Movie.findOneAndDelete({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
      return res.json({ success: true, message: 'Movie deleted successfully' });
    }

    store.movies = store.movies.filter(m => m.id !== id && m._id !== id);
    persistStore();
    res.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
