import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import ServicePage from './pages/ServicePage';
import EventPage from './pages/EventPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
