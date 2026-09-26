import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StorySection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.story-content',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-28 px-6 lg:px-16 bg-[#fcf9f2] text-gray-900 border-t border-amber-900/10 z-10 select-none"
    >
      <div className="max-w-5xl mx-auto text-center space-y-8 story-content">
        {/* Opening Quote Icon */}
        <div className="font-serif text-6xl lg:text-7xl text-amber-800/30 leading-none select-none">
          “
        </div>

        {/* Main Editorial Story Quote (Exact match to uploaded image media_1787155857226.png) */}
        <p className="font-serif italic text-xl sm:text-3xl lg:text-4xl text-[#1a1c23] leading-relaxed md:leading-[1.5] font-normal max-w-4xl mx-auto px-4">
          Trải nghiệm kỳ nghỉ dưỡng riêng tư miền nhiệt đới với nắng vàng, biển xanh và cát trắng tại một trong những khu nghỉ dưỡng biển đẹp nhất Việt Nam. Còn gì tuyệt vời hơn khi được đắm mình vào thế giới thiên nhiên hoang sơ bên vịnh biển riêng tư và cảm nhận phong cách thiết kế độc đáo của khu nghỉ dưỡng NATHotel.
        </p>

        {/* Closing Quote Icon */}
        <div className="font-serif text-6xl lg:text-7xl text-amber-800/30 leading-none select-none">
          ”
        </div>

        {/* Author & Citation Line (Exact match to media_1787155857226.png) */}
        <div className="pt-4 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-gray-500 uppercase font-sans">
          <strong className="font-semibold text-gray-700">SEBASTIAN MODAK</strong>
          <span>·</span>
          <span className="font-serif italic font-light lowercase capitalize">Thời báo New York</span>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
