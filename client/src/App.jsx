import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminPage from './pages/AdminPage';

import TrailerModal from './components/TrailerModal';
import AuthModal from './components/AuthModal';
import LastBookingCard from './components/LastBookingCard';
import { useBooking } from './context/BookingContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Trailer state
  const [trailerModal, setTrailerModal] = useState({ isOpen: false, url: '', title: '' });

  const {
    selectedMovie,
    setSelectedMovie,
    setSelectedTheater,
    setSelectedSlot
  } = useBooking();

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setCurrentPage('movie-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectShow = (movie, theater, slot) => {
    setSelectedMovie(movie);
    setSelectedTheater(theater);
    setSelectedSlot(slot);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayTrailer = (url, title) => {
    setTrailerModal({ isOpen: true, url, title });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 selection:bg-rose-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onSelectMovie={handleSelectMovie}
            onPlayTrailer={handlePlayTrailer}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === 'movie-detail' && (
          <MovieDetailPage
            movie={selectedMovie}
            onBack={() => setCurrentPage('home')}
            onPlayTrailer={handlePlayTrailer}
            onSelectShow={handleSelectShow}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            onBack={() => setCurrentPage('movie-detail')}
            onComplete={() => setCurrentPage('my-bookings')}
          />
        )}

        {currentPage === 'my-bookings' && (
          <MyBookingsPage
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}
      </main>

      {/* Global Modals */}
      <TrailerModal
        isOpen={trailerModal.isOpen}
        onClose={() => setTrailerModal({ isOpen: false, url: '', title: '' })}
        trailerUrl={trailerModal.url}
        title={trailerModal.title}
      />

      <AuthModal />
      <LastBookingCard />

      {/* Footer */}
      <Footer />

    </div>
  );
}
