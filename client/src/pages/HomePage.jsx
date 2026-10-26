import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../api';
import { Clock, Ticket, Sparkles, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function HomePage({ onSelectMovie, onPlayTrailer, searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Now Showing');

  const { lastBooking, setIsLastBookingOpen } = useBooking();

  useEffect(() => {
    loadMovies();
  }, [selectedGenre, selectedLanguage, statusFilter, searchQuery]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedGenre !== 'All') params.genre = selectedGenre;
      if (selectedLanguage !== 'All') params.language = selectedLanguage;
      if (statusFilter) params.status = statusFilter;
      if (searchQuery) params.search = searchQuery;

      const res = await fetchMovies(params);
      if (res.success) {
        setMovies(res.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Hero Carousel */}
      {!searchQuery && (
        <HeroBanner
          movies={movies}
          onSelectMovie={onSelectMovie}
          onPlayTrailer={onPlayTrailer}
        />
      )}

      {/* Prominent AlmaBetter / SkillWallet Last Booking Floating Pill Banner */}
      {lastBooking && (
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Your Last Booking:</span>
                <span className="text-xs font-mono font-bold text-gray-300">ID: {lastBooking.bookingId}</span>
              </div>
              <p className="text-sm font-extrabold text-white">
                {lastBooking.movieTitle || lastBooking.movie} • <span className="text-rose-400">{lastBooking.timeSlot || lastBooking.slot}</span> ({lastBooking.seats?.join(', ')})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLastBookingOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 font-extrabold text-xs transition shadow-md flex items-center space-x-1.5 self-end sm:self-auto cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>View Ticket</span>
          </button>
        </div>
      )}

      {/* Filter and Categories */}
      <FilterBar
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
      />

      {/* Movies Grid Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center space-x-2">
            <span>{statusFilter === 'Upcoming' ? 'Upcoming Releases' : 'Explore Movies'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
              {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Choose your movie, pick your favorite cinema theater, and reserve prime seats in seconds.
          </p>
        </div>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-400">Loading cinema collection...</p>
        </div>
      ) : error ? (
        <div className="py-16 text-center text-rose-400 space-y-2">
          <AlertCircle className="w-8 h-8 mx-auto" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-[#121826]/40 border border-gray-800 rounded-3xl p-8">
          <Sparkles className="w-10 h-10 text-gray-600 mx-auto" />
          <h4 className="text-base font-bold text-gray-300">No Movies Found</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search criteria, selected genre, or language filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
      )}

    </div>
  );
}
