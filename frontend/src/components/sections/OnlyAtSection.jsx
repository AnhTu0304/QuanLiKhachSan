import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OnlyAtSection = () => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'TIỆC CƯỚI',
      desc: 'Hiểu rằng đám cưới là sự kiện trọng đại và ý nghĩa trong đời, chúng tôi mang đến trải nghiệm và dịch vụ cưới đẳng cấp với không gian sang trọng, ẩm thực thượng hạng cùng đội ngũ nhân viên chuyên nghiệp nhất.',
      image: '/images/wedding_banner.jpg',
      imageAlt: 'Tiệc cưới bên bờ biển NATHotel',
      linkTo: '#contact'
    },
    {
      id: 2,
      title: 'SỰ KIỆN & HỘI NGHỊ',
      desc: 'Không gian đại tiệc và hội nghị hoàng gia với tầm nhìn hướng đại dưỡng rực rỡ, trang thiết bị âm thanh ánh sáng hiện đại bậc nhất dành cho các sự kiện quốc tế và tiệc gala sang trọng.',
      image: '/images/gala_banner.jpg',
      imageAlt: 'Dạ tiệc gala ngoài trời NATHotel',
      linkTo: '#contact'
    }
  ];

  useGSAP(() => {
    gsap.fromTo('.only-at-title',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[600px] max-h-[850px] overflow-hidden z-10 text-white select-none"
    >
      {/* Background Image with Smooth Fade */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={s.image}
              alt={s.imageAlt}
              className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.03]"
            />
            {/* Dark Gradient Overlay at top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/50" />
          </div>
        ))}
      </div>

      {/* Top Header Title Overlay (Matching uploaded image media_1787155325562.jpg) */}
      <div className="absolute top-12 left-0 right-0 z-20 text-center">
        <h2 className="only-at-title font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.2em] font-normal drop-shadow-lg">
          ONLY AT NATHOTEL
        </h2>
      </div>

      {/* Left Navigation Arrow Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-14 bg-[#e8ded1]/90 hover:bg-amber-800 text-gray-900 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        aria-label="Previous Banner"
      >
        <ChevronLeft size={26} />
      </button>

      {/* Right Navigation Arrow Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-14 bg-[#e8ded1]/90 hover:bg-amber-800 text-gray-900 hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
        aria-label="Next Banner"
      >
        <ChevronRight size={26} />
      </button>

      {/* Bottom Content Area (Exact layout match to media_1787155325562.jpg) */}
      <div className="absolute bottom-12 left-0 right-0 z-20 max-w-7xl mx-auto px-8 lg:px-16 flex flex-col md:flex-row items-end justify-between gap-8">
        {/* Left Side: Title & Description */}
        <div className="space-y-3 max-w-2xl text-left">
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide drop-shadow-md">
            {slide.title}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-gray-200 leading-relaxed font-light drop-shadow-sm max-w-xl">
            {slide.desc}
          </p>
        </div>

        {/* Right Side: Outline EXPLORE Button */}
        <div className="shrink-0">
          <a
            href={slide.linkTo}
            className="inline-block border border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 text-xs tracking-[0.25em] font-sans font-semibold uppercase transition-colors shadow-md"
          >
            EXPLORE
          </a>
        </div>
      </div>
    </section>
  );
};

export default OnlyAtSection;
