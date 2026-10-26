import React from 'react';
import { X, Clock, Film, MapPin, Calendar, QrCode, Ticket, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function LastBookingCard() {
  const { lastBooking, isLastBookingOpen, setIsLastBookingOpen, setCurrentTicket } = useBooking();

  if (!isLastBookingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#121826] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b0f19] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Last Booking Details</span>
          </div>
          <button
            onClick={() => setIsLastBookingOpen(false)}
            className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {lastBooking ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-gray-800 space-y-3">
                
                <div className="flex items-start space-x-3">
                  <img
                    src={lastBooking.poster || "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"}
                    alt={lastBooking.movieTitle || lastBooking.movie}
                    className="w-16 h-22 object-cover rounded-xl border border-gray-800 shadow"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      ID: {lastBooking.bookingId}
                    </span>
                    <h4 className="text-base font-black text-white">
                      {lastBooking.movieTitle || lastBooking.movie}
                    </h4>
                    <p className="text-xs text-gray-400 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>{lastBooking.theaterName || lastBooking.theater}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-800">
                  <div>
                    <span className="text-gray-500 text-[10px] block">Showtime Slot</span>
                    <span className="font-bold text-rose-300">{lastBooking.timeSlot || lastBooking.slot}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">Booking Date</span>
                    <span className="font-bold text-gray-300">{lastBooking.showDate || 'Recent'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800">
                  <span className="text-gray-500 text-[10px] block mb-1">Seats Reserved</span>
                  <div className="flex flex-wrap gap-1">
                    {lastBooking.seats?.map(seat => (
                      <span key={seat} className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-bold text-xs">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Total Paid:</span>
                  <span className="text-base font-extrabold text-emerald-400">₹{lastBooking.totalAmount}</span>
                </div>

              </div>

              <button
                onClick={() => {
                  setIsLastBookingOpen(false);
                  setCurrentTicket(lastBooking);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition flex items-center justify-center space-x-2"
              >
                <Ticket className="w-4 h-4" />
                <span>View Full E-Ticket & QR Code</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center mx-auto text-gray-500">
                <Ticket className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-gray-300">No Previous Booking Found</p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Once you book a movie ticket, your latest reservation details will automatically appear here!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
