import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Clock, MapPin, XCircle, CheckCircle2, QrCode, ArrowLeft, RefreshCw } from 'lucide-react';
import { fetchAllBookings, cancelBookingApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import TicketModal from '../components/TicketModal';

export default function MyBookingsPage({ onNavigate }) {
  const { user } = useAuth();
  const { refreshLastBooking } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetchAllBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? A 100% refund will be processed.')) {
      return;
    }
    try {
      const res = await cancelBookingApi(bookingId);
      if (res.success) {
        alert('Booking cancelled successfully! Full refund has been initiated.');
        loadBookings();
        refreshLastBooking();
      }
    } catch (err) {
      alert('Cancellation error: ' + err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-800/80 gap-4">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Movies</span>
          </button>
          <h1 className="text-3xl font-black text-white flex items-center space-x-2">
            <Ticket className="w-8 h-8 text-rose-500" />
            <span>My Movie Bookings</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            View active movie tickets, entry barcodes, and past cinema reservations.
          </p>
        </div>

        <button
          onClick={loadBookings}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-300 text-xs font-bold transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 space-y-2">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs">Fetching your tickets...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-[#121826]/40 border border-gray-800 rounded-3xl p-8 space-y-3">
          <Ticket className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-gray-200">No Tickets Booked Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Ready for a movie? Browse now-showing movies, select seats, and your booked tickets will show up here!
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="mt-3 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isCancelled = booking.status === 'Cancelled';

            return (
              <div
                key={booking.bookingId}
                className="bg-[#121826]/90 border border-gray-800/80 hover:border-gray-700/80 rounded-3xl p-5 shadow-xl transition flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Movie & Poster Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.poster || "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"}
                    alt={booking.movieTitle || booking.movie}
                    className="w-16 h-24 object-cover rounded-xl border border-gray-800 shadow-md flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        ID: {booking.bookingId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isCancelled
                          ? 'bg-rose-900/40 text-rose-300 border border-rose-800'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {booking.status || 'Confirmed'}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white">
                      {booking.movieTitle || booking.movie}
                    </h3>

                    <p className="text-xs text-gray-400 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>{booking.theaterName || booking.theater}</span>
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 text-xs text-gray-300">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-rose-400" />
                        <span>{booking.showDate || 'Recent'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1 font-bold text-rose-400">
                        <Clock className="w-3 h-3" />
                        <span>{booking.timeSlot || booking.slot}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seats and Total */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-gray-800/80 pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Seats</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {booking.seats?.map(seat => (
                        <span key={seat} className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-xs shadow-sm">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Fare</span>
                    <span className="text-base font-black text-emerald-400">₹{booking.totalAmount}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 border-gray-800/80 pt-3 md:pt-0">
                  <button
                    onClick={() => setSelectedTicket(booking)}
                    className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-rose-400" />
                    <span>View Ticket</span>
                  </button>

                  {!isCancelled && (
                    <button
                      onClick={() => handleCancel(booking.bookingId)}
                      className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition"
                      title="Cancel Booking & Request Refund"
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Modal */}
      <TicketModal
        booking={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />

    </div>
  );
}
