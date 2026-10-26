import React, { useMemo } from 'react';
import { Armchair, Check, Info, Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function SeatMatrix({ onProceed }) {
  const {
    selectedSeats,
    toggleSeat,
    calculateTotals
  } = useBooking();

  // Tier definitions
  const tiers = [
    {
      name: "VIP / Recliner",
      price: 450,
      rows: ["A", "B"],
      color: "border-amber-500/40 text-amber-400 bg-amber-500/5",
      badge: "Luxury Recliners with USB & Food Service"
    },
    {
      name: "Premium",
      price: 280,
      rows: ["C", "D", "E", "F"],
      color: "border-sky-500/40 text-sky-400 bg-sky-500/5",
      badge: "Prime Viewing Angle"
    },
    {
      name: "Classic",
      price: 180,
      rows: ["G", "H"],
      color: "border-gray-500/40 text-gray-300 bg-gray-500/5",
      badge: "Comfort Standard"
    }
  ];

  // Realistic booked seats for this screening
  const bookedSeats = useMemo(() => new Set([
    "A3", "A4", "B7", "B8",
    "C2", "C3", "D5", "D6", "E8", "E9", "F3", "F4",
    "G6", "G7", "H1", "H2"
  ]), []);

  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { baseFare } = calculateTotals();

  return (
    <div className="bg-[#121826]/80 border border-gray-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      
      {/* Curved Screen Banner */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <div className="curved-screen mb-3"></div>
        <p className="text-xs uppercase tracking-widest text-sky-400 font-bold flex items-center justify-center space-x-2">
          <span>All Eyes This Way Please (Curved Cinema Screen)</span>
        </p>
      </div>

      {/* Seat Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs font-semibold text-gray-300 border-b border-gray-800/80 pb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md border border-gray-600 bg-gray-900/80 flex items-center justify-center text-[10px]">
            1
          </div>
          <span>Available</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/50">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-rose-400">Selected</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-gray-800/60 border border-gray-800 text-gray-600 flex items-center justify-center cursor-not-allowed">
            ✕
          </div>
          <span className="text-gray-500">Sold Out / Booked</span>
        </div>
      </div>

      {/* Seating Grid with Tiers */}
      <div className="space-y-8 overflow-x-auto pb-4">
        {tiers.map((tier) => (
          <div key={tier.name} className="space-y-3 min-w-[650px]">
            {/* Tier Header */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#0b0f19] border border-gray-800/80">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {tier.name}
                </span>
                <span className="text-[11px] text-gray-400 hidden sm:inline">
                  • {tier.badge}
                </span>
              </div>
              <span className="text-xs font-extrabold text-rose-400">
                ₹{tier.price} <span className="text-[10px] text-gray-500 font-normal">/ ticket</span>
              </span>
            </div>

            {/* Rows in this tier */}
            <div className="space-y-2">
              {tier.rows.map(row => (
                <div key={row} className="flex items-center justify-center space-x-2 sm:space-x-3">
                  {/* Row Letter */}
                  <div className="w-6 text-xs font-bold text-gray-500 text-center">
                    {row}
                  </div>

                  {/* Seats 1 to 12 with aisle gap between 6 and 7 */}
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    {cols.map((colNum) => {
                      const seatId = `${row}${colNum}`;
                      const isBooked = bookedSeats.has(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <React.Fragment key={seatId}>
                          {colNum === 7 && (
                            <div className="w-4 sm:w-6"></div> // Center Aisle Walkway
                          )}
                          <button
                            disabled={isBooked}
                            onClick={() => toggleSeat(seatId, tier.name, tier.price)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 flex items-center justify-center ${
                              isBooked
                                ? 'bg-gray-900 border border-gray-800/80 text-gray-600 cursor-not-allowed opacity-50'
                                : isSelected
                                ? 'bg-rose-600 border border-rose-500 text-white shadow-lg shadow-rose-600/40 scale-105'
                                : 'bg-gray-900/90 border border-gray-700/80 text-gray-300 hover:border-rose-400 hover:text-white hover:scale-105'
                            }`}
                            title={isBooked ? `Seat ${seatId} (Sold Out)` : `Seat ${seatId} - ₹${tier.price}`}
                          >
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : (
                              colNum
                            )}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* End Row Letter */}
                  <div className="w-6 text-xs font-bold text-gray-500 text-center">
                    {row}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Action Summary */}
      <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gray-400">
            Selected Seats ({selectedSeats.length}):
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {selectedSeats.length > 0 ? (
              selectedSeats.map(seat => (
                <span key={seat} className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                  {seat}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500 italic">No seats picked yet</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
          <div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider">Base Ticket Fare</div>
            <div className="text-xl font-black text-white">₹{baseFare}</div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={onProceed}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg ${
              selectedSeats.length > 0
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-rose-600/30 hover:scale-[1.02] cursor-pointer'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
          >
            <span>Proceed to Food & Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
