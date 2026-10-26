import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLastBooking, createBookingApi } from '../api';
import confetti from 'canvas-confetti';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatDetails, setSelectedSeatDetails] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [lastBooking, setLastBooking] = useState(null);
  const [isLastBookingOpen, setIsLastBookingOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load last booking on startup
  useEffect(() => {
    refreshLastBooking();
  }, []);

  const refreshLastBooking = async () => {
    try {
      const res = await fetchLastBooking();
      if (res.success && res.data) {
        setLastBooking(res.data);
      }
    } catch (e) {
      console.error('Failed to load last booking:', e);
    }
  };

  const toggleSeat = (seatId, tier, price) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
      setSelectedSeatDetails(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('You can select a maximum of 8 seats per transaction.');
        return;
      }
      setSelectedSeats(prev => [...prev, seatId]);
      setSelectedSeatDetails(prev => [...prev, { id: seatId, tier, price }]);
    }
  };

  const updateSnackQty = (snackId, snackObj, delta) => {
    setSelectedSnacks(prev => {
      const current = prev[snackId] || { ...snackObj, qty: 0 };
      const newQty = Math.max(0, current.qty + delta);
      if (newQty === 0) {
        const copy = { ...prev };
        delete copy[snackId];
        return copy;
      }
      return {
        ...prev,
        [snackId]: { ...current, qty: newQty }
      };
    });
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'IMOVIE50' || clean === 'FIRST50') {
      setPromoCode(clean);
      setDiscount(50);
      return { success: true, message: '🎉 Promo code applied! ₹50 OFF' };
    }
    if (clean === 'CINEMA20') {
      setPromoCode(clean);
      setDiscount(75);
      return { success: true, message: '🎉 Super Saver 20% discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "IMOVIE50" or "CINEMA20"' };
  };

  const calculateTotals = () => {
    const baseFare = selectedSeatDetails.reduce((sum, s) => sum + s.price, 0);
    const convenienceFee = selectedSeats.length > 0 ? 30 * selectedSeats.length : 0;
    const snacksTotal = Object.values(selectedSnacks).reduce((sum, snk) => sum + (snk.price * snk.qty), 0);
    const totalAmount = Math.max(0, baseFare + convenienceFee + snacksTotal - discount);

    return {
      baseFare,
      convenienceFee,
      snacksTotal,
      discount,
      totalAmount
    };
  };

  const resetCurrentBooking = () => {
    setSelectedSeats([]);
    setSelectedSeatDetails([]);
    setSelectedSnacks({});
    setDiscount(0);
    setPromoCode('');
  };

  const completeBooking = async (paymentDetails, user) => {
    const totals = calculateTotals();
    const payload = {
      movieId: selectedMovie?.id || 'mov-1',
      movieTitle: selectedMovie?.title || 'Selected Movie',
      movie: selectedMovie?.title || 'Selected Movie',
      poster: selectedMovie?.poster,
      theaterId: selectedTheater?.id || 'th-1',
      theaterName: selectedTheater?.name || 'PVR Cinemas',
      theater: selectedTheater?.name || 'PVR Cinemas',
      screen: selectedTheater?.screens?.[0]?.format || 'IMAX 2D',
      showDate: selectedDate,
      timeSlot: selectedSlot || '08:30 PM',
      slot: selectedSlot || '08:30 PM',
      seats: selectedSeats,
      seatTier: selectedSeatDetails[0]?.tier || 'Premium',
      baseFare: totals.baseFare,
      convenienceFee: totals.convenienceFee,
      snacksTotal: totals.snacksTotal,
      snacks: Object.values(selectedSnacks).map(s => ({ name: s.name, qty: s.qty, price: s.price })),
      discount: totals.discount,
      totalAmount: totals.totalAmount,
      paymentMethod: paymentDetails?.method || 'UPI',
      userName: user?.name || 'Alex Johnson',
      userEmail: user?.email || 'alex.demo@imovies.com',
      userPhone: user?.phone || '+91 98765 43210'
    };

    const res = await createBookingApi(payload);
    if (res.success && res.data) {
      setLastBooking(res.data);
      setCurrentTicket(res.data);
      resetCurrentBooking();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      return res.data;
    }
    throw new Error(res.message || 'Failed to complete booking');
  };

  return (
    <BookingContext.Provider value={{
      selectedMovie,
      setSelectedMovie,
      selectedTheater,
      setSelectedTheater,
      selectedDate,
      setSelectedDate,
      selectedSlot,
      setSelectedSlot,
      selectedSeats,
      selectedSeatDetails,
      toggleSeat,
      selectedSnacks,
      updateSnackQty,
      promoCode,
      discount,
      applyPromo,
      calculateTotals,
      lastBooking,
      refreshLastBooking,
      isLastBookingOpen,
      setIsLastBookingOpen,
      currentTicket,
      setCurrentTicket,
      isCheckingOut,
      setIsCheckingOut,
      completeBooking,
      resetCurrentBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
