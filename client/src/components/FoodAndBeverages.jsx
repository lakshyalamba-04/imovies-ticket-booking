import React, { useState, useEffect } from 'react';
import { Plus, Minus, Utensils, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { fetchSnacks } from '../api';
import { useBooking } from '../context/BookingContext';

export default function FoodAndBeverages({ onNext, onBack }) {
  const [snacksList, setSnacksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedSnacks, updateSnackQty, calculateTotals } = useBooking();

  useEffect(() => {
    fetchSnacks()
      .then(res => {
        if (res.success) setSnacksList(res.data);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const { snacksTotal, totalAmount } = calculateTotals();

  return (
    <div className="bg-[#121826]/80 border border-gray-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2 text-rose-500 font-bold text-xs uppercase tracking-widest">
            <Utensils className="w-4 h-4" />
            <span>Cinema Concessions & Food Lounge</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Grab Your Movie Snacks</h2>
          <p className="text-xs text-gray-400">Pre-order freshly prepared gourmet snacks and avoid cinema queues!</p>
        </div>

        <button
          onClick={onNext}
          className="text-xs font-semibold text-gray-400 hover:text-white underline self-start sm:self-auto cursor-pointer"
        >
          Skip Food & Drinks
        </button>
      </div>

      {/* Snacks Grid */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">Loading gourmet snacks menu...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {snacksList.map(snack => {
            const currentQty = selectedSnacks[snack.id]?.qty || 0;

            return (
              <div
                key={snack.id}
                className="bg-[#0b0f19] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-gray-300">
                      {snack.calories}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-rose-400 mb-1">
                      {snack.category}
                    </div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{snack.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{snack.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between">
                  <div className="text-base font-extrabold text-white">₹{snack.price}</div>

                  {currentQty > 0 ? (
                    <div className="flex items-center space-x-2 bg-rose-600/20 border border-rose-500/40 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateSnackQty(snack.id, snack, -1)}
                        className="w-6 h-6 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{currentQty}</span>
                      <button
                        onClick={() => updateSnackQty(snack.id, snack, 1)}
                        className="w-6 h-6 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateSnackQty(snack.id, snack, 1)}
                      className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-rose-600 text-gray-200 hover:text-white text-xs font-bold transition flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-300 text-xs font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Seats</span>
        </button>

        <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
          <div>
            <div className="text-[11px] text-gray-400">Total with Snacks</div>
            <div className="text-xl font-black text-white">₹{totalAmount}</div>
          </div>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition transform hover:scale-[1.02] cursor-pointer"
          >
            <span>Proceed to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
