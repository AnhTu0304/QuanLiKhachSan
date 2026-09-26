import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Plane, Navigation, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LocationSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.location-content',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.location-content',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="location"
      ref={containerRef}
      className="relative py-28 px-6 lg:px-16 bg-[#f6f1e7] border-t border-amber-900/10 z-10 overflow-hidden text-gray-900"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="location-content grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold">
              PRIME COASTAL LOCATION
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1c23] font-normal">
              Vị Trí Đắc Địa <br />
              <span className="italic font-light text-amber-800">Giao Thoa Thiên Nhiên</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Nằm tại dải bờ biển xanh riêng biệt ngập tràn bãi cát vàng, NATHotel vừa giữ được sự tĩnh lặng nguyên sơ của biển cả, vừa kết nối vô cùng thuận tiện tới trung tâm thành phố và sân bay quốc tế.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 bg-white border border-amber-900/15 shadow-sm">
                <MapPin className="text-amber-800 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm text-[#1a1c23] font-semibold">Bãi Biển Riêng Biệt</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Trải dài 500m bãi cát trắng mịn riêng tư dành riêng cho khách nghỉ dưỡng.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border border-amber-900/15 shadow-sm">
                <Plane className="text-amber-800 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm text-[#1a1c23] font-semibold">15 Phút Từ Sân Bay Quốc Tế</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Dịch vụ đưa đón riêng bằng xe Mercedes-Benz đưa quý khách về thẳng khách sạn.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white border border-amber-900/15 shadow-sm">
                <Navigation className="text-amber-800 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm text-[#1a1c23] font-semibold">5 Phút Đến Trung Tâm Phố Cổ</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Dễ dàng di chuyển tham quan các địa danh văn hóa, mua sắm và giải trí.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Map Card */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-white border border-amber-900/15 overflow-hidden shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                alt="Vị trí bờ biển NATHotel"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f6f1e7] via-transparent to-transparent opacity-80" />

              {/* Pin Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-amber-800/20 border border-amber-800 rounded-full animate-ping absolute inset-0" />
                  <div className="w-12 h-12 bg-amber-800 text-white flex items-center justify-center rounded-full shadow-xl relative z-10">
                    <Compass size={24} />
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-900/20 px-5 py-2.5 text-center shadow-lg">
                  <span className="font-serif text-lg text-[#1a1c23] font-bold">NATHOTEL RESORT & SPA</span>
                  <p className="text-[10px] text-amber-800 tracking-widest uppercase font-semibold">Paradise Beach Coast, Vietnam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
