import React from 'react';
import { Star, Play, Ticket, Calendar } from 'lucide-react';

export default function MovieCard({ movie, onSelect, onPlayTrailer }) {
  const isUpcoming = movie.status === 'Upcoming';

  return (
    <div className="group relative bg-[#121826]/90 border border-gray-800/80 hover:border-rose-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-600/10 transition-all duration-300 flex flex-col">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity"></div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{movie.rating}</span>
          <span className="text-[10px] text-gray-400 font-normal">/10</span>
        </div>

        {/* Certificate Badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-gray-900/80 backdrop-blur-md border border-gray-700 text-[10px] font-bold text-gray-300">
          {movie.certificate}
        </div>

        {/* Hover Trailer Play Button */}
        {movie.trailerUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayTrailer(movie.trailerUrl, movie.title);
            }}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
          >
            <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 transform group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </div>
          </button>
        )}

        {/* Formats Pills */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
          {movie.formats?.slice(0, 3).map(fmt => (
            <span key={fmt} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-gray-200 border border-white/10">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-medium text-rose-400">{movie.language}</span>
            <span>{movie.duration}</span>
          </div>

          <h3 
            onClick={() => onSelect(movie)}
            className="text-base font-bold text-white group-hover:text-rose-400 transition cursor-pointer line-clamp-1"
            title={movie.title}
          >
            {movie.title}
          </h3>

          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {movie.genre?.join(', ')}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-4 pt-3 border-t border-gray-800/80">
          {isUpcoming ? (
            <button
              onClick={() => onSelect(movie)}
              className="w-full py-2 px-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition flex items-center justify-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Releases {movie.releaseDate}</span>
            </button>
          ) : (
            <button
              onClick={() => onSelect(movie)}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-600/90 hover:bg-rose-600 active:bg-rose-700 text-white text-xs font-bold transition shadow-md shadow-rose-600/20 flex items-center justify-center space-x-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Tickets</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
