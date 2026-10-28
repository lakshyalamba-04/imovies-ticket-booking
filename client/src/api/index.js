import { initialMovies, initialTheaters, initialSnacks, defaultLastBooking } from './mockData';

const API_BASE = '/api';

// Helper to get local data
const getLocalData = (key, fallback) => {
  try {
    const data = localStorage.getItem(`imovies_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalData = (key, value) => {
  try {
    localStorage.setItem(`imovies_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const fetchMovies = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/movies${query ? `?${query}` : ''}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Network or server error -> fallback
  }

  let movies = getLocalData('movies', initialMovies);
  if (params.genre && params.genre !== 'All') {
    movies = movies.filter(m => m.genre?.includes(params.genre));
  }
  if (params.language && params.language !== 'All') {
    movies = movies.filter(m => m.language?.toLowerCase() === params.language.toLowerCase());
  }
  if (params.status) {
    movies = movies.filter(m => m.status === params.status);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    movies = movies.filter(m =>
      m.title?.toLowerCase().includes(q) ||
      m.director?.toLowerCase().includes(q) ||
      m.genre?.some(g => g.toLowerCase().includes(q))
    );
  }
  return { success: true, count: movies.length, data: movies };
};

export const fetchMovieById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/movies/${id}`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const movies = getLocalData('movies', initialMovies);
  const movie = movies.find(m => m.id === id);
  if (movie) return { success: true, data: movie };
  throw new Error('Movie not found');
};

export const createMovieApi = async (movieData) => {
  try {
    const res = await fetch(`${API_BASE}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const movies = getLocalData('movies', initialMovies);
  const newMovie = { ...movieData, id: `mov-${Date.now()}` };
  movies.unshift(newMovie);
  setLocalData('movies', movies);
  return { success: true, data: newMovie };
};

export const deleteMovieApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/movies/${id}`, { method: 'DELETE' });
    if (res.ok) return await res.json();
  } catch (e) {}

  let movies = getLocalData('movies', initialMovies);
  movies = movies.filter(m => m.id !== id);
  setLocalData('movies', movies);
  return { success: true, message: 'Movie deleted' };
};

export const fetchTheaters = async () => {
  try {
    const res = await fetch(`${API_BASE}/theaters`);
    if (res.ok) return await res.json();
  } catch (e) {}

  return { success: true, count: initialTheaters.length, data: initialTheaters };
};

export const fetchSnacks = async () => {
  try {
    const res = await fetch(`${API_BASE}/theaters/snacks`);
    if (res.ok) return await res.json();
  } catch (e) {}

  return { success: true, count: initialSnacks.length, data: initialSnacks };
};

export const createBookingApi = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const bookingId = `IMV-${Math.floor(10000 + Math.random() * 90000)}`;
  const newBooking = {
    bookingId,
    movie: bookingData.movieTitle || bookingData.movie || 'Selected Movie',
    movieTitle: bookingData.movieTitle || bookingData.movie || 'Selected Movie',
    movieId: bookingData.movieId || 'mov-1',
    poster: bookingData.poster || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    theater: bookingData.theaterName || bookingData.theater || 'PVR Cinemas',
    theaterName: bookingData.theaterName || bookingData.theater || 'PVR Cinemas',
    screen: bookingData.screen || 'IMAX 2D',
    showDate: bookingData.showDate || 'Today',
    timeSlot: bookingData.timeSlot || bookingData.slot || '08:30 PM',
    slot: bookingData.timeSlot || bookingData.slot || '08:30 PM',
    seats: bookingData.seats || ['C4'],
    seatTier: bookingData.seatTier || 'Premium',
    ticketCount: bookingData.seats?.length || 1,
    baseFare: bookingData.baseFare || 280,
    convenienceFee: bookingData.convenienceFee || 40,
    snacksTotal: bookingData.snacksTotal || 0,
    snacks: bookingData.snacks || [],
    discount: bookingData.discount || 0,
    totalAmount: bookingData.totalAmount || 320,
    paymentMethod: bookingData.paymentMethod || 'UPI',
    paymentStatus: 'Paid',
    bookingDate: new Date().toISOString(),
    userName: bookingData.userName || 'Alex Johnson',
    userEmail: bookingData.userEmail || 'alex.demo@imovies.com',
    status: 'Confirmed'
  };

  const bookings = getLocalData('bookings', [defaultLastBooking]);
  bookings.unshift(newBooking);
  setLocalData('bookings', bookings);
  setLocalData('lastBooking', newBooking);

  return { success: true, message: 'Booking confirmed!', data: newBooking };
};

export const fetchLastBooking = async () => {
  try {
    const res = await fetch(`${API_BASE}/booking/last`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const last = getLocalData('lastBooking', defaultLastBooking);
  return { success: true, data: last };
};

export const fetchAllBookings = async () => {
  try {
    const res = await fetch(`${API_BASE}/booking`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const bookings = getLocalData('bookings', [defaultLastBooking]);
  return { success: true, count: bookings.length, data: bookings };
};

export const fetchUserBookings = async (email) => {
  try {
    const res = await fetch(`${API_BASE}/booking/user/${encodeURIComponent(email)}`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const bookings = getLocalData('bookings', [defaultLastBooking]);
  const filtered = bookings.filter(b => !email || b.userEmail?.toLowerCase() === email.toLowerCase());
  return { success: true, count: filtered.length, data: filtered };
};

export const cancelBookingApi = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/booking/${id}`, { method: 'DELETE' });
    if (res.ok) return await res.json();
  } catch (e) {}

  const bookings = getLocalData('bookings', [defaultLastBooking]);
  const booking = bookings.find(b => b.bookingId === id);
  if (booking) {
    booking.status = 'Cancelled';
    setLocalData('bookings', bookings);
    return { success: true, message: 'Booking cancelled. Refund initiated.', data: booking };
  }
  throw new Error('Booking not found');
};

export const loginApi = async (credentials) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  return {
    success: true,
    token: 'mock-jwt-token-demo',
    user: {
      id: credentials.email.includes('admin') ? 'usr-admin' : 'usr-demo',
      name: credentials.email.includes('admin') ? 'Cinema Administrator' : 'Alex Johnson',
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' : 'user',
      phone: '+91 98765 43210'
    }
  };
};

export const registerApi = async (userData) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  return {
    success: true,
    token: 'mock-jwt-token-demo',
    user: {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: 'user',
      phone: userData.phone || '+91 98765 00000'
    }
  };
};
