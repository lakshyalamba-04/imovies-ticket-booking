import React, { useState, useEffect } from 'react';
import { Shield, Plus, Film, Trash2, DollarSign, Users, Ticket, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { fetchMovies, createMovieApi, deleteMovieApi, fetchAllBookings } from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminPage({ onNavigate }) {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // New movie state
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Sci-Fi, Action');
  const [duration, setDuration] = useState('2h 15m');
  const [rating, setRating] = useState('8.5');
  const [language, setLanguage] = useState('English');
  const [poster, setPoster] = useState('');
  const [banner, setBanner] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [movRes, bookRes] = await Promise.all([
        fetchMovies(),
        fetchAllBookings()
      ]);
      if (movRes.success) setMovies(movRes.data);
      if (bookRes.success) setBookings(bookRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    if (!title || !description || !poster) {
      alert('Please fill out title, description, and poster image URL.');
      return;
    }

    try {
      const payload = {
        title,
        tagline,
        description,
        genre: genre.split(',').map(g => g.trim()),
        duration,
        rating: parseFloat(rating) || 8.0,
        votes: "12K+",
        language,
        formats: ["2D", "IMAX 2D", "4DX"],
        certificate: "UA",
        poster,
        banner: banner || poster,
        trailerUrl,
        status: "Now Showing"
      };

      await createMovieApi(payload);
      alert('Movie successfully added to IMovies catalog!');
      setShowAddForm(false);
      // Reset
      setTitle('');
      setDescription('');
      setPoster('');
      loadAdminData();
    } catch (err) {
      alert('Error creating movie: ' + err.message);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Are you sure you want to remove this movie from catalog?')) return;
    try {
      await deleteMovieApi(id);
      loadAdminData();
    } catch (err) {
      alert('Failed to delete movie: ' + err.message);
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const totalTicketsSold = bookings.reduce((sum, b) => sum + (b.seats?.length || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800/80 gap-4">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Movies</span>
          </button>
          <h1 className="text-3xl font-black text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-emerald-400" />
            <span>Cinema Admin & Box-Office Dashboard</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage movie listings, audit live theater seat reservations, and monitor box-office sales.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add New Movie'}</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121826]/90 border border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Catalog Movies</span>
            <Film className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-white">{movies.length}</div>
          <p className="text-[11px] text-gray-500">Active titles across multiplexes</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121826]/90 border border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Total Bookings</span>
            <Ticket className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white">{bookings.length}</div>
          <p className="text-[11px] text-gray-500">Confirmed customer reservations</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121826]/90 border border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Seats Reserved</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{totalTicketsSold}</div>
          <p className="text-[11px] text-gray-500">Tickets issued</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121826]/90 border border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
          <p className="text-[11px] text-gray-500">Integrated ticket & snack sales</p>
        </div>
      </div>

      {/* Add Movie Collapsible Form */}
      {showAddForm && (
        <form onSubmit={handleCreateMovie} className="bg-[#121826] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Plus className="w-4 h-4" />
            <span>Add Movie to IMovies Catalog</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-gray-400 font-bold mb-1">Movie Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Gladiator II"
                className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-bold mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="e.g. What we do in life echoes in eternity"
                className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-bold mb-1">Genres (comma separated)</label>
              <input
                type="text"
                value={genre}
                onChange={e => setGenre(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-bold mb-1">Duration & Language</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-bold mb-1">IMDb Rating (1 - 10)</label>
              <input
                type="number"
                step="0.1"
                value={rating}
                onChange={e => setRating(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-bold mb-1">Poster Image URL *</label>
              <input
                type="url"
                required
                value={poster}
                onChange={e => setPoster(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-400 font-bold mb-1">Banner Backdrop Image URL</label>
              <input
                type="url"
                value={banner}
                onChange={e => setBanner(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-bold mb-1">YouTube Trailer URL</label>
              <input
                type="url"
                value={trailerUrl}
                onChange={e => setTrailerUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-gray-400 font-bold mb-1">Plot Synopsis *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter storyline and details..."
                className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl p-3 text-white"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30"
            >
              Save Movie to Database
            </button>
          </div>
        </form>
      )}

      {/* Movies Catalog Management */}
      <div className="bg-[#121826]/90 border border-gray-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
          <Film className="w-5 h-5 text-rose-500" />
          <span>Active Movies in System</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#0b0f19] text-gray-400 uppercase font-bold text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3">Poster & Movie</th>
                <th className="p-3">Language</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {movies.map(movie => (
                <tr key={movie.id} className="hover:bg-gray-800/30 transition">
                  <td className="p-3 flex items-center space-x-3">
                    <img src={movie.poster} alt={movie.title} className="w-9 h-13 object-cover rounded-lg" />
                    <div>
                      <span className="font-bold text-white block">{movie.title}</span>
                      <span className="text-[10px] text-gray-400">{movie.genre?.join(', ')}</span>
                    </div>
                  </td>
                  <td className="p-3">{movie.language}</td>
                  <td className="p-3 font-bold text-amber-400">★ {movie.rating}</td>
                  <td className="p-3">{movie.duration}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                      {movie.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition"
                      title="Delete movie"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Bookings Table */}
      <div className="bg-[#121826]/90 border border-gray-800/80 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
          <Ticket className="w-5 h-5 text-emerald-400" />
          <span>Real-time Customer Bookings Audit</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#0b0f19] text-gray-400 uppercase font-bold text-[10px] tracking-wider border-b border-gray-800">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Movie & Theater</th>
                <th className="p-3">Show Slot</th>
                <th className="p-3">Seats</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {bookings.map(b => (
                <tr key={b.bookingId} className="hover:bg-gray-800/30 transition">
                  <td className="p-3 font-mono font-bold text-rose-400">{b.bookingId}</td>
                  <td className="p-3">
                    <span className="font-bold text-white block">{b.userName}</span>
                    <span className="text-[10px] text-gray-400">{b.userEmail}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-gray-200 block">{b.movieTitle || b.movie}</span>
                    <span className="text-[10px] text-gray-500">{b.theaterName || b.theater}</span>
                  </td>
                  <td className="p-3 font-semibold text-rose-300">{b.timeSlot || b.slot}</td>
                  <td className="p-3 font-bold text-white">{b.seats?.join(', ')}</td>
                  <td className="p-3 font-bold text-emerald-400">₹{b.totalAmount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'Cancelled'
                        ? 'bg-rose-900/40 text-rose-300'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {b.status || 'Confirmed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
