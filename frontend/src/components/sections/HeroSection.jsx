import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

    tl.from('.hero-subtitle', { y: 20, opacity: 0, delay: 0.2 })
      .from('.hero-title', { y: 40, opacity: 0 }, '-=0.8')
      .from('.hero-desc', { y: 30, opacity: 0 }, '-=0.8')
      .from('.hero-actions', { y: 20, opacity: 0 }, '-=0.8');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-start pt-28 pb-20 px-6 lg:px-16 overflow-hidden z-10"
    >
      {/* High-Resolution Resort Background Image (Using banner3.jpg) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/banner3.jpg"
          alt="NATHotel Luxury Sand Resort"
          className="w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-[1.02] transition-transform duration-1000"
        />
        {/* Light Sand Natural Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f2]/95 via-[#fcf9f2]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-transparent to-[#fcf9f2]/60" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl pt-8 lg:pt-16 space-y-8">
        {/* Subtitle / Tagline */}
        <div className="hero-subtitle inline-flex items-center gap-2 px-4 py-1.5 bg-amber-800/10 border border-amber-800/30 backdrop-blur-md">
          <Sparkles size={14} className="text-amber-800" />
          <p className="text-xs font-sans tracking-[0.3em] text-amber-900 uppercase font-semibold">
            LUXURY SEASIDE RETREAT · EST. 2026
          </p>
        </div>

        {/* Display Headline */}
        <h1 className="hero-title font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-tight text-[#1a1c23] drop-shadow-sm">
          Where the Sea <br />
          <span className="italic font-light text-amber-800">Meets Stillness</span>
        </h1>

        {/* Paragraph Description */}
        <p className="hero-desc font-sans text-sm md:text-base text-gray-800 leading-relaxed max-w-xl font-light tracking-wide">
          Tọa lạc tại vùng bờ biển biệt lập ngập tràn ánh nắng cát vàng tự nhiên, <strong className="text-gray-900 font-semibold">NATHOTEL</strong> mang đến các căn Suite và Villa nghỉ dưỡng độc bản — nơi không gian hòa quyện giữa không khí biển mặn mòi, chân trời khoáng đạt và sự thư thái tuyệt đối.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions pt-4 flex flex-wrap items-center gap-6">
          <Link
            to="/booking"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white bg-amber-800 hover:bg-amber-900 transition-all duration-500 shadow-xl shadow-amber-900/15"
          >
            RESERVE YOUR STAY
          </Link>

          <Link
            to="/rooms"
            className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-900 hover:text-amber-950 transition-colors py-2 relative"
          >
            <span>EXPLORE ROOMS</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-amber-800 group-hover:bg-amber-900 transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
