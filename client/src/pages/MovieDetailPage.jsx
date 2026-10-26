import React, { useState, useEffect } from 'react';
import { Star, Play, Calendar, MapPin, Film, Clock, ArrowLeft, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { fetchTheaters } from '../api';
import { useBooking } from '../context/BookingContext';

export default function MovieDetailPage({ movie, onBack, onPlayTrailer, onSelectShow }) {
  const [theaters, setTheaters] = useState([]);
  const [loadingTheaters, setLoadingTheaters] = useState(true);
  const { selectedDate, setSelectedDate } = useBooking();

  // Generate next 7 days for the date selector
  const dates = [
    { label: 'Today', sub: 'Oct 26', day: 'Today' },
    { label: 'Tomorrow', sub: 'Oct 27', day: 'Tomorrow' },
    { label: 'Mon', sub: 'Oct 28', day: 'Mon, Oct 28' },
    { label: 'Tue', sub: 'Oct 29', day: 'Tue, Oct 29' },
    { label: 'Wed', sub: 'Oct 30', day: 'Wed, Oct 30' },
    { label: 'Thu', sub: 'Oct 31', day: 'Thu, Oct 31' },
    { label: 'Fri', sub: 'Nov 01', day: 'Fri, Nov 01' },
  ];

  useEffect(() => {
    fetchTheaters()
      .then(res => {
        if (res.success) setTheaters(res.data);
      })
      .catch(e => console.error(e))
      .finally(() => setLoadingTheaters(false));
  }, []);

  if (!movie) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Movie Listings</span>
      </button>

      {/* Hero Header with Movie Info */}
      <div className="relative rounded-3xl overflow-hidden bg-[#121826] border border-gray-800 shadow-2xl">
        
        {/* Backdrop Banner */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[2px]"
          style={{ backgroundImage: `url(${movie.banner || movie.poster})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#121826] via-[#121826]/90 to-transparent"></div>

        {/* Content Details */}
        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          
          {/* Poster */}
          <div className="w-48 sm:w-60 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/60 aspect-[2/3] relative group">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {movie.trailerUrl && (
              <button
                onClick={() => onPlayTrailer(movie.trailerUrl, movie.title)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
              >
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </button>
            )}
          </div>

          {/* Metadata */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white text-xs font-bold">
                {movie.certificate}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 text-xs font-semibold border border-gray-700">
                {movie.language}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 text-xs font-semibold border border-gray-700">
                {movie.duration}
              </span>
              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{movie.rating} / 10</span>
                <span className="text-gray-400 text-[10px]">({movie.votes})</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-sm sm:text-base text-rose-300 italic font-medium">
                "{movie.tagline}"
              </p>
            )}

            {/* Genres & Formats */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {movie.genre?.map(g => (
                <span key={g} className="px-3 py-1 rounded-lg bg-gray-800/80 text-gray-300 text-xs font-medium border border-gray-700">
                  {g}
                </span>
              ))}
              <span className="text-gray-500 hidden sm:inline">•</span>
              {movie.formats?.map(f => (
                <span key={f} className="px-2.5 py-0.5 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">
                  {f}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">About the Movie</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                {movie.description}
              </p>
            </div>

            {/* Director & Release info */}
            <div className="pt-2 flex flex-wrap gap-6 text-xs text-gray-400">
              {movie.director && (
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Director</span>
                  <span className="font-semibold text-gray-200">{movie.director}</span>
                </div>
              )}
              {movie.releaseDate && (
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Release Date</span>
                  <span className="font-semibold text-gray-200">{movie.releaseDate}</span>
                </div>
              )}
            </div>

            {/* Cast & Crew avatars */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Featured Cast</h4>
                <div className="flex flex-wrap gap-3">
                  {movie.cast.map(c => (
                    <div key={c.name} className="flex items-center space-x-2 bg-gray-900/80 px-2.5 py-1.5 rounded-xl border border-gray-800">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div className="text-xs font-bold text-gray-200">{c.name}</div>
                        <div className="text-[10px] text-gray-400">{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Date Selector */}
      <div className="bg-[#121826]/80 border border-gray-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>Select Date</span>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
          {dates.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDate(d.day)}
              className={`px-4 py-2.5 rounded-xl text-center min-w-[85px] transition flex flex-col items-center justify-center ${
                selectedDate === d.day
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 font-bold scale-105'
                  : 'bg-[#0b0f19] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <span className="text-xs font-bold">{d.label}</span>
              <span className="text-[10px] opacity-80">{d.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theaters & Showtimes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-white flex items-center space-x-2">
            <span>Available Cinema Theaters & Showtimes</span>
          </h3>
          <span className="text-xs text-gray-400">
            Selected: <strong className="text-rose-400">{selectedDate}</strong>
          </span>
        </div>

        {loadingTheaters ? (
          <div className="py-12 text-center text-gray-400 text-sm">Loading cinemas & timings...</div>
        ) : (
          <div className="space-y-4">
            {theaters.map((theater) => (
              <div
                key={theater.id}
                className="bg-[#121826]/90 border border-gray-800/80 hover:border-gray-700 rounded-3xl p-6 shadow-xl transition space-y-4"
              >
                {/* Theater Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800/80 pb-4 gap-2">
                  <div>
                    <h4 className="text-base font-extrabold text-white flex items-center space-x-2">
                      <span>{theater.name}</span>
                    </h4>
                    <p className="text-xs text-gray-400 flex items-center space-x-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{theater.location}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-emerald-400 font-medium">{theater.distance}</span>
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5">
                    {theater.amenities?.map(am => (
                      <span key={am} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Screens & Show Slots */}
                <div className="space-y-3">
                  {theater.screens?.map((screen, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
                      <div className="text-xs text-gray-300 flex items-center space-x-2">
                        <span className="font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">
                          {screen.format}
                        </span>
                        <span className="text-gray-400 text-[11px]">• {screen.sound}</span>
                      </div>

                      {/* Clickable Slots */}
                      <div className="flex flex-wrap gap-2.5">
                        {screen.shows.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => onSelectShow(movie, theater, slot)}
                            className="px-3.5 py-2 rounded-xl bg-gray-900/90 hover:bg-rose-600 border border-gray-700/80 hover:border-rose-500 text-white font-bold text-xs shadow-md transition transform hover:scale-105 active:scale-95 group flex flex-col items-center cursor-pointer"
                          >
                            <span>{slot}</span>
                            <span className="text-[9px] text-gray-400 group-hover:text-rose-200 font-normal">
                              Available
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
