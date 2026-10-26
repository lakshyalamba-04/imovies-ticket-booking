const API_BASE = '/api';

export const fetchMovies = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/movies${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
};

export const fetchMovieById = async (id) => {
  const res = await fetch(`${API_BASE}/movies/${id}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
};

export const createMovieApi = async (movieData) => {
  const res = await fetch(`${API_BASE}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  if (!res.ok) throw new Error('Failed to create movie');
  return res.json();
};

export const deleteMovieApi = async (id) => {
  const res = await fetch(`${API_BASE}/movies/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete movie');
  return res.json();
};

export const fetchTheaters = async () => {
  const res = await fetch(`${API_BASE}/theaters`);
  if (!res.ok) throw new Error('Failed to fetch theaters');
  return res.json();
};

export const fetchSnacks = async () => {
  const res = await fetch(`${API_BASE}/theaters/snacks`);
  if (!res.ok) throw new Error('Failed to fetch snacks');
  return res.json();
};

export const createBookingApi = async (bookingData) => {
  const res = await fetch(`${API_BASE}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  if (!res.ok) throw new Error('Failed to submit booking');
  return res.json();
};

export const fetchLastBooking = async () => {
  const res = await fetch(`${API_BASE}/booking/last`);
  if (!res.ok) throw new Error('Failed to fetch last booking');
  return res.json();
};

export const fetchAllBookings = async () => {
  const res = await fetch(`${API_BASE}/booking`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

export const fetchUserBookings = async (email) => {
  const res = await fetch(`${API_BASE}/booking/user/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('Failed to fetch user bookings');
  return res.json();
};

export const cancelBookingApi = async (id) => {
  const res = await fetch(`${API_BASE}/booking/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to cancel booking');
  return res.json();
};

export const loginApi = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerApi = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};
