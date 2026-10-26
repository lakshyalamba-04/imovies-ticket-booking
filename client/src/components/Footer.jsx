import React from 'react';
import { Film, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-800/80 bg-[#080c14] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white shadow-md">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                I<span className="text-rose-500">Movies</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Movie ticket booking made simple. Discover blockbusters, reserve premium theater seats in real-time, order concessions, and enjoy instant digital tickets.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure Checkout & Instant QR Code</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Cinemas & Formats</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-rose-400 transition cursor-pointer">IMAX with Laser 70mm</li>
              <li className="hover:text-rose-400 transition cursor-pointer">4DX Dynamic Motion</li>
              <li className="hover:text-rose-400 transition cursor-pointer">Dolby Atmos Surround</li>
              <li className="hover:text-rose-400 transition cursor-pointer">INSIGNIA Gold Class Recliners</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Top Genres</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-rose-400 transition cursor-pointer">Sci-Fi & Cyberpunk</li>
              <li className="hover:text-rose-400 transition cursor-pointer">Action & Superhero</li>
              <li className="hover:text-rose-400 transition cursor-pointer">Biographical Dramas</li>
              <li className="hover:text-rose-400 transition cursor-pointer">Animated Masterpieces</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Built With Modern MERN</h4>
            <p className="text-xs text-gray-400 mb-3">
              Designed for high performance with React, Vite, Tailwind CSS, Express REST API, and MongoDB with instant local persistence.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-[11px] text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Full-Stack Capstone Edition</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IMovies Ticketing Platform. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for seamless cinema entertainment</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
