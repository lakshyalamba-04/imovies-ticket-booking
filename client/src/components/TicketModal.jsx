import React, { useRef } from 'react';
import { X, CheckCircle2, Download, Printer, Share2, Ticket, Film, Calendar, Clock, MapPin } from 'lucide-react';

export default function TicketModal({ booking, onClose }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121826] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600/20 to-rose-600/20 border-b border-gray-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Booking Confirmed & Verified</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Ticket Body */}
        <div className="p-6">
          <div className="bg-[#0b0f19] border border-gray-800 rounded-2xl overflow-hidden relative shadow-xl">
            
            {/* Ticket Header */}
            <div className="p-5 bg-gradient-to-r from-gray-900 via-rose-950/40 to-gray-900 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-black text-white">IMovies E-Pass</span>
                  <span className="block text-[10px] text-gray-400">Scan at entrance scanner</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-gray-400">Booking ID</div>
                <div className="text-xs font-black text-rose-400 font-mono tracking-wider">
                  {booking.bookingId}
                </div>
              </div>
            </div>

            {/* Ticket Content */}
            <div className="p-5 space-y-4">
              <div className="flex space-x-4">
                <img
                  src={booking.poster}
                  alt={booking.movieTitle || booking.movie}
                  className="w-20 h-28 object-cover rounded-xl shadow-md border border-gray-800"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-black text-white leading-tight">
                    {booking.movieTitle || booking.movie}
                  </h3>
                  
                  <div className="flex items-center space-x-1.5 text-xs text-rose-400 font-semibold pt-1">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="line-clamp-1">{booking.theaterName || booking.theater}</span>
                  </div>

                  <p className="text-[11px] text-gray-400">{booking.screen}</p>

                  <div className="flex flex-wrap gap-2 pt-2 text-xs">
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                      <Calendar className="w-3 h-3 text-rose-400" />
                      <span>{booking.showDate || 'Today'}</span>
                    </div>
                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      <Clock className="w-3 h-3" />
                      <span>{booking.timeSlot || booking.slot}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforated Divider with Cutouts */}
              <div className="relative py-2">
                <div className="border-t-2 border-dashed border-gray-800"></div>
                <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#121826]"></div>
                <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#121826]"></div>
              </div>

              {/* Seats & QR Code Section */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Reserved Seats</div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {booking.seats?.map(seat => (
                      <span key={seat} className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-black text-xs shadow-md">
                        {seat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-[11px] text-gray-400">
                    <div>Paid By: <strong className="text-gray-200">{booking.paymentMethod}</strong></div>
                    <div>Amount: <strong className="text-emerald-400 font-bold">₹{booking.totalAmount}</strong></div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white p-1.5 rounded-xl shadow-lg flex items-center justify-center">
                    {booking.qrCode ? (
                      <img src={booking.qrCode} alt="Ticket QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-[10px] text-gray-900 text-center font-bold">QR Ready</div>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 mt-1 font-mono">
                    Scan for Entry
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-[#0b0f19] border-t border-gray-800 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ticket</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold transition shadow-md shadow-rose-600/30"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
