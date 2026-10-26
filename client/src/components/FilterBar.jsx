import React from 'react';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function FilterBar({
  selectedGenre,
  onSelectGenre,
  selectedLanguage,
  onSelectLanguage,
  statusFilter,
  onStatusFilter
}) {
  const genres = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Comedy', 'Animation'];
  const languages = ['All', 'English', 'Hindi', 'Telugu', 'Tamil'];

  return (
    <div className="bg-[#121826]/70 border border-gray-800/80 rounded-2xl p-4 mb-8 backdrop-blur-md shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Status Tabs (Now Showing vs Upcoming) */}
        <div className="flex items-center bg-[#0b0f19] p-1 rounded-xl border border-gray-800/80 self-start">
          <button
            onClick={() => onStatusFilter('Now Showing')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              statusFilter === 'Now Showing'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Now Showing</span>
          </button>
          
          <button
            onClick={() => onStatusFilter('Upcoming')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              statusFilter === 'Upcoming'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming Releases</span>
          </button>
        </div>

        {/* Genre Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:inline mr-1">
            Genre:
          </span>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedGenre === genre
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold'
                  : 'bg-gray-800/60 hover:bg-gray-800 text-gray-300 border border-gray-700/50'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-2 self-start lg:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <select
            value={selectedLanguage}
            onChange={(e) => onSelectLanguage(e.target.value)}
            className="bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-200 focus:outline-none focus:border-rose-500 transition"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'All' ? 'All Languages' : lang}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
