import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WaterCanvas from '../components/3d/WaterCanvas';
import RoomDetailModal from '../components/rooms/RoomDetailModal';
import { useBooking } from '../context/BookingContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Maximize2, Users, Bed, CheckCircle2, ArrowRight, Eye, SlidersHorizontal, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RoomPage = () => {
  const containerRef = useRef(null);
  const { ROOMS_DATA, setSelectedRoom } = useBooking();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('Tất Cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedRoomForModal, setSelectedRoomForModal] = useState(null);

  const categories = ['Tất Cả', 'Suite', 'Villa', 'Bungalow'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Sort Logic
  const processedRooms = ROOMS_DATA
    .filter((room) => {
      const matchesCat = activeCategory === 'Tất Cả' || room.category === activeCategory;
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            room.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  useGSAP(() => {
    // Hero Banner text entrance
    gsap.from('.room-hero-sub', { y: 25, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.room-hero-title', { y: 45, opacity: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' });
    gsap.from('.room-scroll-down', { y: 20, opacity: 0, duration: 1, delay: 0.8, ease: 'power3.out' });

    // Grid entrance
    gsap.fromTo('.room-page-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.room-page-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef, dependencies: [activeCategory, sortBy, searchTerm] });

  const handleBookDirect = (room) => {
    setSelectedRoom(room);
    navigate('/booking');
  };

  const scrollToControls = () => {
    const el = document.getElementById('room-controls');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#fcf9f2] text-gray-900 min-h-screen selection:bg-amber-800/20 selection:text-amber-950">
      {/* 3D WebGL Water Waves Canvas */}
      <WaterCanvas />

      {/* Smart Scroll Navigation Bar */}
      <Navbar />

      {/* Full Viewport Height Hero Banner Section (100vh Full Screen) */}
      <section className="relative min-h-screen h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/roombanner.jpg"
            alt="NATHotel Room & Villa Suite Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.05]"
          />
          {/* Subtle Light Sand Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-black/35 to-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 space-y-5 text-white pt-16">
          <p className="room-hero-sub font-serif italic text-xl sm:text-2xl text-amber-200 tracking-wider">
            Phòng nghỉ dưỡng
          </p>
          <h1 className="room-hero-title font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight drop-shadow-2xl">
            Phòng, suite, penthouse và biệt thự sang trọng
          </h1>
          <p className="text-xs sm:text-sm font-sans tracking-[0.3em] text-amber-100 uppercase font-light pt-4">
            NATHOTEL RESORT & SPA · LUXURY SEASIDE COLLECTION
          </p>
        </div>

        {/* Animated Scroll Down Indicator Button */}
        <button
          onClick={scrollToControls}
          className="room-scroll-down absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-amber-200 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to Rooms"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100">
            CUỘN XUỐNG KHÁM PHÁ
          </span>
          <ChevronDown size={22} className="animate-bounce text-amber-300" />
        </button>
      </section>

      {/* Main Room Showcase & Controls Section */}
      <main id="room-controls" className="relative z-10 py-20 px-6 lg:px-16 max-w-7xl mx-auto space-y-12">
        {/* Filter & Search Bar Controls */}
        <div className="bg-white border border-amber-900/15 p-6 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 font-semibold ${
                  activeCategory === cat
                    ? 'bg-amber-800 text-white shadow-md'
                    : 'bg-[#fcf9f2] text-gray-700 hover:bg-amber-900/10 border border-amber-900/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-4 flex-wrap w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên phòng hoặc tiện nghi..."
                className="w-full bg-[#fcf9f2] border border-amber-900/15 text-xs px-4 py-2.5 pl-9 outline-none focus:border-amber-800 text-gray-900 font-medium"
              />
              <Search size={14} className="absolute left-3 top-3 text-amber-800" />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-[#fcf9f2] border border-amber-900/15 px-3 py-2 text-xs text-gray-800 font-medium">
              <SlidersHorizontal size={14} className="text-amber-800 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-xs font-semibold"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Room Grid Display */}
        {processedRooms.length === 0 ? (
          <div className="text-center py-20 bg-white border border-amber-900/15 space-y-3">
            <p className="font-serif text-2xl text-gray-800">Không tìm thấy phòng phù hợp</p>
            <p className="text-xs text-gray-500 font-light">Vui lòng thử thay đổi từ khóa hoặc bộ lọc hạng phòng.</p>
            <button
              onClick={() => { setActiveCategory('Tất Cả'); setSearchTerm(''); setSortBy('default'); }}
              className="mt-4 px-6 py-2 bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold"
            >
              XÓA BỘ LỌC
            </button>
          </div>
        ) : (
          <div className="room-page-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedRooms.map((room) => (
              <div
                key={room.id}
                className="room-page-card group bg-white border border-amber-900/15 hover:border-amber-700/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-amber-950/5"
              >
                <div>
                  {/* Room Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-amber-800 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 shadow-md">
                      {room.category}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-amber-900/20 px-4 py-1.5 text-right shadow-sm">
                      <span className="block text-[9px] text-amber-800 uppercase tracking-widest font-semibold">Giá mỗi đêm</span>
                      <span className="font-serif text-base text-[#1a1c23] font-bold">{room.formattedPrice}</span>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 md:p-7 space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1a1c23] font-normal group-hover:text-amber-800 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-xs text-amber-800 font-sans tracking-wide mt-1 font-semibold">
                        {room.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-3">
                      {room.description}
                    </p>

                    {/* Specs Icons */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-amber-900/10 text-gray-700 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 size={13} className="text-amber-800 shrink-0" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-amber-800 shrink-0" />
                        <span className="truncate">{room.capacity.split('·')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed size={13} className="text-amber-800 shrink-0" />
                        <span className="truncate">{room.bed}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-1.5 pt-2">
                      {room.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 size={12} className="text-amber-800 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 md:p-7 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedRoomForModal(room)}
                    className="flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-800 bg-[#fcf9f2] hover:bg-amber-900/10 border border-amber-900/20 transition-colors"
                  >
                    <Eye size={14} /> CHI TIẾT
                  </button>

                  <button
                    onClick={() => handleBookDirect(room)}
                    className="flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-sm"
                  >
                    <span>ĐẶT NGAY</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Room Quick View Modal */}
      {selectedRoomForModal && (
        <RoomDetailModal
          room={selectedRoomForModal}
          onClose={() => setSelectedRoomForModal(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RoomPage;
