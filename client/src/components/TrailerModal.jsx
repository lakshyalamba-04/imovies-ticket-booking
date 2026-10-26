import React from 'react';
import { X } from 'lucide-react';

export default function TrailerModal({ isOpen, onClose, trailerUrl, title }) {
  if (!isOpen || !trailerUrl) return null;

  // Convert youtube watch url to embed url
  let embedUrl = trailerUrl;
  if (trailerUrl.includes('watch?v=')) {
    embedUrl = trailerUrl.replace('watch?v=', 'embed/') + '?autoplay=1&rel=0';
  } else if (trailerUrl.includes('youtu.be/')) {
    embedUrl = trailerUrl.replace('youtu.be/', 'www.youtube.com/embed/') + '?autoplay=1&rel=0';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#0b0f19] border-b border-gray-800 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white truncate pr-4">
            Official Trailer: <span className="text-rose-400">{title}</span>
          </h4>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
