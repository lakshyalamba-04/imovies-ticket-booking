import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Landmark, CheckCircle2, Ticket, Sparkles, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const {
    selectedMovie,
    selectedTheater,
    selectedDate,
    selectedSlot,
    selectedSeats,
    selectedSnacks,
    calculateTotals,
    promoCode,
    discount,
    applyPromo,
    completeBooking
  } = useBooking();

  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [contactName, setContactName] = useState(user?.name || 'Alex Johnson');
  const [contactEmail, setContactEmail] = useState(user?.email || 'alex.demo@imovies.com');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+91 98765 43210');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const { baseFare, convenienceFee, snacksTotal, totalAmount } = calculateTotals();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromo(promoInput);
    setPromoMessage(res);
  };

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      // Simulate gateway latency
      await new Promise(r => setTimeout(r, 1600));

      const bookingData = await completeBooking(
        { method: paymentMethod },
        { name: contactName, email: contactEmail, phone: contactPhone }
      );

      setIsProcessing(false);
      onSuccess(bookingData);
    } catch (err) {
      setIsProcessing(false);
      alert('Booking failed: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121826] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0b0f19] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Booking & Payment Checkout</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Movie & Theater Summary Card */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0b0f19] border border-gray-800/80">
            <img
              src={selectedMovie?.poster}
              alt={selectedMovie?.title}
              className="w-16 h-24 object-cover rounded-xl shadow-md"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                {selectedMovie?.language} • {selectedMovie?.certificate}
              </span>
              <h3 className="text-base font-extrabold text-white">{selectedMovie?.title}</h3>
              <p className="text-xs text-gray-400">{selectedTheater?.name}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-300 font-medium pt-1">
                <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">{selectedDate}</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">{selectedSlot}</span>
                <span className="text-gray-400">Seats: <strong className="text-white">{selectedSeats.join(', ')}</strong></span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ticket Delivery Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Promo Code section */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
              Have a Promo Code?
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter promo code (e.g. IMOVIE50)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 bg-[#0b0f19] border border-gray-800 focus:border-rose-500 rounded-xl px-4 py-2 text-xs uppercase tracking-wider text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-xs font-semibold ${promoMessage.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                {promoMessage.message}
              </p>
            )}
            <div className="flex gap-2 text-[11px] text-gray-400">
              <span>Try codes:</span>
              <button type="button" onClick={() => setPromoInput('IMOVIE50')} className="text-rose-400 underline font-semibold">IMOVIE50</button>
              <span>or</span>
              <button type="button" onClick={() => setPromoInput('CINEMA20')} className="text-rose-400 underline font-semibold">CINEMA20</button>
            </div>
          </form>

          {/* Payment Method Selector */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Choose Payment Mode</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'UPI'
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400 font-bold'
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs">UPI / QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'Card'
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400 font-bold'
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NetBanking')}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                  paymentMethod === 'NetBanking'
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400 font-bold'
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <Landmark className="w-5 h-5" />
                <span className="text-xs">Net Banking</span>
              </button>
            </div>

            {/* UPI QR Simulation Box */}
            {paymentMethod === 'UPI' && (
              <div className="mt-3 p-4 rounded-2xl bg-[#0b0f19] border border-gray-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant UPI Payment Simulation</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Supports Google Pay, PhonePe, Paytm, and BHIM UPI ID: <code>imovies@upi</code>
                  </p>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-gray-900" />
                </div>
              </div>
            )}
          </div>

          {/* Fare Breakdown Table */}
          <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800 space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Tickets ({selectedSeats.length} seats)</span>
              <span>₹{baseFare}</span>
            </div>
            {snacksTotal > 0 && (
              <div className="flex justify-between text-gray-300">
                <span>Food & Concessions</span>
                <span>₹{snacksTotal}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-300">
              <span>Integrated GST & Convenience Fee</span>
              <span>₹{convenienceFee}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Promo Discount ({promoCode})</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-800 flex justify-between text-sm font-extrabold text-white">
              <span>Total Payable Amount</span>
              <span className="text-rose-400 text-base">₹{totalAmount}</span>
            </div>
          </div>

        </div>

        {/* Footer Checkout CTA */}
        <div className="p-6 bg-[#0b0f19] border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-bit Encrypted Checkout</span>
          </div>

          <button
            disabled={isProcessing}
            onClick={handlePay}
            className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.98] text-white font-black text-sm shadow-xl shadow-rose-600/40 transition disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <span>Pay ₹{totalAmount} & Confirm</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
