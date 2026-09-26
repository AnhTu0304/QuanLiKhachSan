import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBooking } from '../../context/BookingContext';
import { Utensils, Waves, Sparkles, GlassWater, Clock, Award, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const containerRef = useRef(null);
  const { BUFFET_IMAGES } = useBooking();

  useGSAP(() => {
    gsap.fromTo('.services-title',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.buffet-gallery-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.buffet-gallery-grid',
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.service-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.services-subgrid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-28 px-6 lg:px-16 bg-[#fcf9f2] border-t border-amber-900/10 z-10 text-gray-900"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="services-title text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold">
            FINEST EXPERIENCES & AMENITIES
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1c23] font-normal">
            Dịch Vụ & Ẩm Thực <span className="italic font-light text-amber-800">Đỉnh Cao</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-light">
            Được thiết kế tỉ mỉ để nuông chiều mọi giác quan của bạn — từ bữa sáng Buffet ngập tràn hương vị ẩm thực thế giới đến những liệu trình Spa sâu lắng.
          </p>
        </div>

        {/* Featured Service Spotlight: International Gourmet Breakfast Buffet */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-900/15 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-800/10 border border-amber-800/20 text-amber-900 text-xs tracking-widest uppercase font-semibold mb-2">
                <Utensils size={14} />
                <span>NỔI BẬT NGHỈ DƯỠNG</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c23] font-normal">
                Buffet Sáng Thượng Hạng <span className="italic font-light text-amber-800">(International Gourmet Buffet)</span>
              </h3>
            </div>

            <div className="flex items-center gap-6 text-xs text-amber-900 font-semibold">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-800" />
                <span>06:00 - 10:30 AM Hàng Ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-800" />
                <span>80+ Món Ăn Á-Âu</span>
              </div>
            </div>
          </div>

          {/* Real Buffet Photo Bento Gallery Grid */}
          <div className="buffet-gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUFFET_IMAGES.map((imgItem, idx) => (
              <div
                key={idx}
                className="buffet-gallery-item group relative aspect-[4/3] overflow-hidden bg-white border border-amber-900/15 shadow-lg shadow-amber-950/5 hover:border-amber-700/40 transition-all duration-500"
              >
                <img
                  src={imgItem.src}
                  alt={imgItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c23]/90 via-[#1a1c23]/40 to-transparent opacity-85 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1 z-10">
                  <h4 className="font-serif text-lg text-white font-medium group-hover:text-amber-200 transition-colors">
                    {imgItem.title}
                  </h4>
                  <p className="text-[11px] text-gray-200 font-light leading-relaxed line-clamp-2">
                    {imgItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inclusive perk bar */}
          <div className="bg-white border border-amber-900/15 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-amber-800 shrink-0" size={24} />
              <span className="text-sm text-gray-800 font-light">
                Dịch vụ Buffet sáng đã bao gồm miễn phí cho tất cả du khách lưu trú tại <strong className="text-gray-900 font-semibold">NATHotel</strong>.
              </span>
            </div>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm"
            >
              ĐẶT BÀN ƯU TIÊN
            </a>
          </div>
        </div>

        {/* Sub-services Grid */}
        <div className="services-subgrid grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Infinity Pool */}
          <div className="service-item bg-white border border-amber-900/15 p-8 space-y-6 hover:border-amber-700/40 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 bg-amber-800/10 border border-amber-800/20 flex items-center justify-center text-amber-800">
              <Waves size={24} />
            </div>
            <h4 className="font-serif text-2xl text-[#1a1c23]">Hồ Bơi Vô Cực Hướng Biển</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Hồ bơi tràn viền tầm nhìn 360 độ ra đại dương với làn nước trong xanh, giường tắm nắng sang trọng và dịch vụ phục vụ cocktail tận nơi.
            </p>
          </div>

          {/* Card 2: Serenity Spa */}
          <div className="service-item bg-white border border-amber-900/15 p-8 space-y-6 hover:border-amber-700/40 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 bg-amber-800/10 border border-amber-800/20 flex items-center justify-center text-amber-800">
              <Sparkles size={24} />
            </div>
            <h4 className="font-serif text-2xl text-[#1a1c23]">NATHotel Serenity Spa</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Đánh thức mọi giác quan bằng các liệu trình massage thảo dược thiên nhiên, trị liệu đá nóng Himalayan và phương pháp chăm sóc chuyên sâu.
            </p>
          </div>

          {/* Card 3: Rooftop Sunset Bar */}
          <div className="service-item bg-white border border-amber-900/15 p-8 space-y-6 hover:border-amber-700/40 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 bg-amber-800/10 border border-amber-800/20 flex items-center justify-center text-amber-800">
              <GlassWater size={24} />
            </div>
            <h4 className="font-serif text-2xl text-[#1a1c23]">Rooftop Sunset Bar</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Không gian cocktail lounge đẳng cấp trên tầng thượng, nơi lý tưởng để thưởng thức rượu vang thượng hạng và ngắm hoàng hôn ngả sắc vàng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
