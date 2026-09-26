import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RoomsSection = () => {
  const containerRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Memorable Experiences Data (Matching uploaded image media_1787155070162.png)
  const experiences = [
    {
      id: 1,
      title: 'Michelin Star Dining',
      desc: 'Indulge in the magic of La Maison 1888 gourmet cuisine by 3-Michelin starred chef Christian Le Squer.',
      image: '/images/buffet.jpg',
      linkText: 'Read More'
    },
    {
      id: 2,
      title: 'A Modern Japanese Dining Adventure',
      desc: 'Teppanyaki, Omakase & Sushi masterclasses led by acclaimed Michelin Chef Junichi Yoshida.',
      image: '/images/bar1.jpg',
      linkText: 'Read More'
    },
    {
      id: 3,
      title: 'Digital Design Walking Tour',
      desc: 'Explore the inspiration behind our resort architecture and lush tropical landscape.',
      image: '/images/lobby.jpg',
      linkText: 'Read More'
    },
    {
      id: 4,
      title: 'Private Ocean Sunset Cruise',
      desc: 'Sail through pristine golden coastlines aboard our luxury private yacht with Champagne.',
      image: '/images/banner1.jpg',
      linkText: 'Read More'
    },
    {
      id: 5,
      title: 'Herbal Spa & Salt Cave Therapy',
      desc: 'Rejuvenate body and mind with organic Himalayan salt stones and essential oils.',
      image: '/images/spa1.jpg',
      linkText: 'Read More'
    }
  ];

  // Editorial Room Reviews Data
  const roomReviews = [
    {
      id: 'presidential',
      title: 'Presidential Oceanfront Villa',
      subtitle: 'Đỉnh Cao Nghỉ Dưỡng Xa Hoa 360°',
      desc: 'Sở hữu vị trí đắt giá nhất sát bờ biển cát vàng, biệt thự Presidential mang đến hồ bơi vô cực riêng biệt, không gian sống 300m² xa hoa cùng dịch vụ Quản gia cá nhân 24/7 tuyệt đối riêng tư.',
      image: '/images/phong1.jpg',
      tagline: '300 m² · 4 Khách · Bể Bơi Riêng Tràn Bờ'
    },
    {
      id: 'sunset',
      title: 'Grand Sunset Ocean Suite',
      subtitle: 'Hoàng Hôn Ngả Sắc Vàng Rực Rỡ',
      desc: 'Tận hưởng những khoảnh khắc lãng mạn nhất khi mặt trời lặn từ ban công riêng rộng mở. Căn Suite được trang bị bồn tắm ngâm ngọc thạch xa xỉ và nội thất gỗ Đông Dương quý hiếm.',
      image: '/images/phong2.jpg',
      tagline: '150 m² · 2 Khách · Ban Công Ngắm Biển'
    },
    {
      id: 'beachfront',
      title: 'Beachfront Pool Villa',
      subtitle: 'Thiên Đường Sát Bờ Biển Cát Ngà',
      desc: 'Bước chân trực tiếp ra dải cát ngà mịn màng và làn nước biển trong xanh. Biệt thự sở hữu sân hiên tắm nắng, khu vườn nhiệt đới xanh mát và bể bơi ngoài trời riêng biệt.',
      image: '/images/phong3.jpg',
      tagline: '220 m² · 3 Khách · Lối Ra Biển Trực Tiếp'
    },
    {
      id: 'executive',
      title: 'Executive Ocean View Suite',
      subtitle: 'Tầm Nhìn Đại Dương Khoáng Đạt',
      desc: 'Thiết kế kiến trúc mở tối đa hóa ánh sáng tự nhiên và gió biển, với phòng khách rộng rãi, giường King-size cao cấp và góc đọc sách hướng thẳng ra đại dương xanh ngọc.',
      image: '/images/phong4.jpg',
      tagline: '95 m² · 2 Khách · Tầm Nhìn Biển 180°'
    }
  ];

  useGSAP(() => {
    // GSAP animation for Memorable Experiences section header
    gsap.fromTo('.exp-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.exp-header',
          start: 'top 85%',
        }
      }
    );

    // GSAP animation for Memorable Experiences cards
    gsap.fromTo('.exp-card',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.exp-cards-container',
          start: 'top 85%',
        }
      }
    );

    // Scroll reveal for editorial room items
    gsap.utils.toArray('.room-review-block').forEach((block) => {
      gsap.fromTo(block,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (experiences.length - 2));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + (experiences.length - 2)) % (experiences.length - 2));
  };

  return (
    <section
      id="rooms"
      ref={containerRef}
      className="relative py-28 px-6 lg:px-16 bg-[#fcf9f2] text-gray-900 border-t border-amber-900/10 z-10"
    >
      <div className="max-w-7xl mx-auto space-y-28">

        {/* PART 1: "TRẢI NGHIỆM ĐÁNG NHỚ" (Memorable Experiences Carousel - Matching Image media_1787155070162.png) */}
        <div className="space-y-12">
          {/* Header */}
          <div className="exp-header text-center space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1c23] tracking-wider uppercase font-normal">
              TRẢI NGHIỆM ĐÁNG NHỚ
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-gray-600 font-light">
              Ghi Dấu Khoảnh Khắc
            </p>
          </div>

          {/* Carousel Container with Left/Right Buttons */}
          <div className="relative group">
            {/* Left Button */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#e8ded1] hover:bg-amber-800 hover:text-white text-gray-800 flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#e8ded1] hover:bg-amber-800 hover:text-white text-gray-800 flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={22} />
            </button>

            {/* Carousel Track */}
            <div className="exp-cards-container overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-8"
                style={{ transform: `translateX(-${carouselIndex * (100 / 3 + 1.5)}%)` }}
              >
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="exp-card w-full md:w-[calc(33.333%-1.33rem)] shrink-0 space-y-4 bg-white p-4 border border-amber-900/10 shadow-md group/card"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="space-y-2 pt-2">
                      <h3 className="font-serif text-xl text-[#1a1c23] font-normal leading-snug group-hover/card:text-amber-800 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-3">
                        {exp.desc}
                      </p>
                      <div className="pt-2">
                        <Link
                          to="/services"
                          className="inline-block text-xs font-serif italic text-amber-900 underline underline-offset-4 hover:text-amber-700 transition-colors font-medium"
                        >
                          {exp.linkText}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: EDITORIAL ROOM REVIEWS */}
        <div className="space-y-20 pt-12 border-t border-amber-900/15">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold">
              LUXURY SUITES & VILLAS COLLECTION
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1c23] font-normal">
              Đánh Giá Các <span className="italic font-light text-amber-800">Hạng Phòng & Villa</span>
            </h2>
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              Trải nghiệm không gian sống mang đậm hơi thở kiến trúc Đông Dương kết hợp nét đẹp biển cả thiên nhiên tại NATHotel.
            </p>
          </div>

          {/* Editorial Z-Pattern Review Items */}
          <div className="space-y-24">
            {roomReviews.map((room, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={room.id}
                  className="room-review-block grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                    {/* Vertical Bronze Line Title */}
                    <div className="border-l-[2px] border-amber-800/80 pl-4 space-y-1">
                      <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">
                        {room.tagline}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c23] font-normal leading-tight">
                        {room.title}
                      </h3>
                      <p className="font-serif italic text-base text-amber-900 font-light">
                        {room.subtitle}
                      </p>
                    </div>

                    {/* Editorial Description */}
                    <p className="text-[#5a5852] font-sans text-sm md:text-base leading-relaxed font-light">
                      {room.desc}
                    </p>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 hover:text-amber-950 transition-colors group"
                      >
                        <span>KHÁM PHÁ CHI TIẾT HẠNG PHÒNG</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                    <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-white border border-amber-900/15 shadow-xl shadow-amber-950/5 group">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Link to Full Room Collection */}
          <div className="text-center pt-8">
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-[0.25em] transition-colors shadow-md"
            >
              <span>XEM TẤT CẢ HẠNG PHÒNG & VILLA</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RoomsSection;
