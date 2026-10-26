import React, { useState } from 'react';
import { Film, MapPin, Search, Ticket, User, Shield, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

export default function Navbar({ onNavigate, currentPage, onSearch, searchQuery }) {
  const { user, logout, setIsAuthModalOpen, isAdmin } = useAuth();
  const { lastBooking, setIsLastBookingOpen } = useBooking();
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

  return (
    <nav className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 group text-left focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform duration-200">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white flex items-center">
                  I<span className="text-rose-500">Movies</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold -mt-1">
                  Ticket Booking Made Simple
                </span>
              </div>
            </button>

            {/* City Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 border border-gray-800 text-xs font-medium text-gray-300 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{selectedCity}</span>
                <span className="text-gray-500 text-[10px]">▼</span>
              </button>

              {showCityDropdown && (
                <div className="absolute left-0 mt-2 w-44 rounded-xl bg-[#121826] border border-gray-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Select Your City
                  </div>
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition flex items-center justify-between ${
                        selectedCity === city
                          ? 'bg-rose-500/10 text-rose-400 font-medium'
                          : 'text-gray-300 hover:bg-gray-800/60'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search movies, genres, languages, directors..."
                className="w-full bg-[#121826] border border-gray-800 focus:border-rose-500 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition"
              />
            </div>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === 'home' ? 'text-rose-500 bg-rose-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Movies
            </button>

            <button
              onClick={() => onNavigate('my-bookings')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === 'my-bookings' ? 'text-rose-500 bg-rose-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Bookings</span>
            </button>

            {/* Last Booking Quick Badge */}
            {lastBooking && (
              <button
                onClick={() => setIsLastBookingOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold transition"
                title="View your most recent booking"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Last Booking</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            )}

            {/* Admin Dashboard */}
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === 'admin' ? 'text-rose-500 bg-rose-500/10' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
              }`}
              title="Admin Cinema Management"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-bold text-gray-200 truncate max-w-[120px]">{user.name}</div>
                    <div className="text-[10px] text-gray-400">{user.role === 'admin' ? 'Cinema Admin' : 'Member'}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-gray-400 hover:text-rose-400 transition ml-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-sm font-semibold shadow-lg shadow-rose-600/30 transition transform hover:-translate-y-0.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}
