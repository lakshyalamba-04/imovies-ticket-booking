import React, { useState, useEffect } from 'react';
import { Play, Ticket, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner({ movies, onSelectMovie, onPlayTrailer }) {
  const featured = movies.filter(m => m.featured) || movies.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!featured || featured.length === 0) return null;
  const current = featured[currentIndex] || featured[0];

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden rounded-3xl mb-12 shadow-2xl">
      {/* Background Image with Dark Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url(${current.banner || current.poster})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="max-w-2xl space-y-4 animate-in fade-in duration-500">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-600/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Blockbuster</span>
            </span>

            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{current.rating} / 10</span>
              <span className="text-gray-400 font-normal">({current.votes})</span>
            </span>

            <span className="px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-300 text-xs font-medium border border-gray-700">
              {current.duration}
            </span>

            <span className="px-2.5 py-1 rounded-full bg-gray-800/80 text-gray-300 text-xs font-medium border border-gray-700">
              {current.certificate}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
              {current.title}
            </h1>
            {current.tagline && (
              <p className="text-base sm:text-lg text-rose-300 font-medium italic mt-1">
                "{current.tagline}"
              </p>
            )}
          </div>

          {/* Genres & Formats */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {current.genre?.map(g => (
              <span key={g} className="text-xs px-2.5 py-0.5 rounded-md bg-gray-900/90 text-gray-300 border border-gray-800">
                {g}
              </span>
            ))}
            <span className="text-gray-500">•</span>
            {current.formats?.map(f => (
              <span key={f} className="text-xs px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 font-semibold border border-rose-500/20">
                {f}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 line-clamp-2 leading-relaxed">
            {current.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onSelectMovie(current)}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/40 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Tickets</span>
            </button>

            {current.trailerUrl && (
              <button
                onClick={() => onPlayTrailer(current.trailerUrl, current.title)}
                className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 text-white font-semibold text-sm border border-gray-700/80 hover:border-gray-600 transition backdrop-blur-sm"
              >
                <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Watch Trailer</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Carousel navigation buttons */}
      {featured.length > 1 && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length)}
            className="w-9 h-9 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-700 flex items-center justify-center text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-1.5 px-2">
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-rose-500' : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featured.length)}
            className="w-9 h-9 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-gray-700 flex items-center justify-center text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
