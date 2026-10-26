import React, { useState } from 'react';
import { ArrowLeft, Film, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import SeatMatrix from '../components/SeatMatrix';
import FoodAndBeverages from '../components/FoodAndBeverages';
import CheckoutModal from '../components/CheckoutModal';
import TicketModal from '../components/TicketModal';
import { useBooking } from '../context/BookingContext';

export default function BookingPage({ onBack, onComplete }) {
  const {
    selectedMovie,
    selectedTheater,
    selectedDate,
    selectedSlot,
    selectedSeats,
    isCheckingOut,
    setIsCheckingOut,
    currentTicket,
    setCurrentTicket
  } = useBooking();

  const [currentStep, setCurrentStep] = useState('seats'); // 'seats' | 'snacks'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Bar with Cinema Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#121826]/90 border border-gray-800/80 rounded-2xl p-4 gap-4 shadow-xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <h2 className="text-lg font-black text-white flex items-center space-x-2">
              <span>{selectedMovie?.title}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-600 text-white font-bold">
                {selectedMovie?.certificate}
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-0.5">
              <span className="flex items-center space-x-1 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{selectedTheater?.name}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                <span>{selectedDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-rose-400 font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedSlot}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center space-x-3 self-end md:self-auto text-xs font-bold">
          <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
            currentStep === 'seats'
              ? 'bg-rose-500/10 border-rose-500 text-rose-400'
              : 'bg-gray-900 border-gray-800 text-gray-400'
          }`}>
            <span>1. Seat Matrix</span>
          </div>

          <span className="text-gray-600">→</span>

          <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
            currentStep === 'snacks'
              ? 'bg-rose-500/10 border-rose-500 text-rose-400'
              : 'bg-gray-900 border-gray-800 text-gray-400'
          }`}>
            <span>2. Concessions</span>
          </div>
        </div>
      </div>

      {/* Main step content */}
      {currentStep === 'seats' ? (
        <SeatMatrix onProceed={() => setCurrentStep('snacks')} />
      ) : (
        <FoodAndBeverages
          onNext={() => setIsCheckingOut(true)}
          onBack={() => setCurrentStep('seats')}
        />
      )}

      {/* Checkout Payment Modal */}
      <CheckoutModal
        isOpen={isCheckingOut}
        onClose={() => setIsCheckingOut(false)}
        onSuccess={(ticket) => {
          setIsCheckingOut(false);
          setCurrentTicket(ticket);
        }}
      />

      {/* Ticket Confirmation Modal */}
      <TicketModal
        booking={currentTicket}
        onClose={() => {
          setCurrentTicket(null);
          onComplete();
        }}
      />

    </div>
  );
}
