import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EventPage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Hero Banner text entrance
    gsap.from('.event-hero-sub', { y: 25, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.event-hero-title', { y: 45, opacity: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' });
    gsap.from('.event-scroll-down', { y: 20, opacity: 0, duration: 1, delay: 0.8, ease: 'power3.out' });

    // Scroll reveal for event items
    gsap.utils.toArray('.event-item-block').forEach((block) => {
      gsap.fromTo(block,
        { y: 35, opacity: 0 },
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

  const handleInquiry = () => {
    navigate('/booking');
  };

  const scrollToSection = () => {
    const el = document.getElementById('event-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const eventCategories = [
    {
      id: 'wedding',
      title: 'Lễ Đường Tiệc Cưới Bên Bờ Biển Vàng',
      subtitle: 'Seaside Luxury Wedding Ceremonies',
      desc: 'Hiểu rằng đám cưới là sự kiện trọng đại và ý nghĩa nhất trong đời, NATHotel mang đến trải nghiệm cưới phong cách hoàng gia với lễ đường hoa tươi ngoài trời sát mép biển, thực đơn tiệc cưới Michelin 8 món cùng đội ngũ quản gia cá nhân phục vụ chu đáo.',
      image: '/images/wedding_banner.jpg',
      imageAlt: 'Lễ đường tiệc cưới bờ biển NATHotel',
      capacity: '50 - 300 Khách',
      highlights: [
        'Trang trí đường hoa tươi nghệ thuật & cổng hoa hướng biển',
        'Thực đơn tiệc cưới 8 món sáng tạo bởi chef Michelin',
        'Tặng 1 đêm nghỉ dưỡng tại Presidential Oceanfront Villa',
        'Dịch vụ Quản gia tiệc cưới riêng chu toàn'
      ]
    },
    {
      id: 'conference',
      title: 'Phòng Hội Nghị & Sảnh Tiệc Hoàng Gia',
      subtitle: 'Royal Conferences & Executive Galas',
      desc: 'Không gian hội nghị đa chức năng với sức chứa lên tới 500 khách, tích hợp hệ thống âm thanh ánh sáng sân khấu 4K hiện đại bậc nhất dành cho các hội thảo quốc tế, lễ ra mắt sản phẩm và dạ yến doanh nghiệp.',
      image: '/images/gala_banner.jpg',
      imageAlt: 'Sảnh tiệc hội nghị hoàng gia NATHotel',
      capacity: 'Sức chứa lên tới 500 Khách',
      highlights: [
        'Màn hình LED 4K siêu rộng & âm thanh công suất lớn',
        'Tiệc Buffet BBQ Hải Sản & Rượu Vang cao cấp',
        'Khu vực đón khách Foyer ngắm biển sang trọng',
        'Hỗ trợ kỹ thuật viên & Ban lễ tân chuyên nghiệp'
      ]
    },
    {
      id: 'proposal',
      title: 'Lễ Cầu Hôn & Kỷ Niệm Ngày Cưới Riêng Tư',
      subtitle: 'Romantic Proposals & Private Anniversaries',
      desc: 'Tạo nên khoảnh khắc đính hôn hoặc kỷ niệm ngày cưới ngọt ngào bất ngờ trên bãi biển biệt lập dưới ánh nến và hoa tươi rực rỡ, đi kèm bữa tối lãng mạn 5 món dành riêng cho hai người.',
      image: '/images/banner2.jpg',
      imageAlt: 'Lễ cầu hôn lãng mạn trên bãi biển',
      capacity: 'Dành cho 2 Người',
      highlights: [
        'Thiết kế không gian trái tim hoa nến riêng tư trên bãi biển',
        'Bữa tối Fine Dining 5 món riêng bên mép sóng',
        '1 Chai Champagne Pháp nổ chào mừng',
        'Nhiếp ảnh gia chuyên nghiệp ghi lại trọn vẹn khoảnh khắc'
      ]
    },
    {
      id: 'gala',
      title: 'Tiệc Sinh Nhật & Gala Dinner Dưới Ánh Đèn',
      subtitle: 'Outdoor Galas & Birthday Celebrations',
      desc: 'Tổ chức tiệc sinh nhật hoặc dạ tiệc mừng thành công trên thảm cỏ xanh hướng biển, hòa mình vào không gian âm nhạc Acoustic sống động, nướng BBQ hải sản tươi và thưởng thức cocktail nhiệt đới.',
      image: '/images/bar1.jpg',
      imageAlt: 'Tiệc sinh nhật Gala ngoài trời NATHotel',
      capacity: '20 - 150 Khách',
      highlights: [
        'Không gian thảm cỏ ngắm hoàng hôn ngả sắc vàng',
        'Quầy Bar Cocktail & Tiệc nướng hải sản tươi nóng',
        'Ban nhạc Live Acoustic biểu diễn theo yêu cầu',
        'Trang trí chủ đề tiệc sinh nhật thiết kế riêng'
      ]
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#fcf9f2] text-gray-900 min-h-screen selection:bg-amber-800/20 selection:text-amber-950">

      {/* Smart Scroll Navigation Bar */}
      <Navbar />

      {/* Full Viewport Height Hero Banner Section (100vh Full Screen using gala_banner.jpg) */}
      <section className="relative min-h-screen h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/gala_banner.jpg"
            alt="NATHotel Events & Weddings Hero Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.05]"
          />
          {/* Subtle Light Sand Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 space-y-5 text-white pt-16">
          <p className="event-hero-sub font-serif italic text-xl sm:text-2xl text-amber-200 tracking-wider">
            Không Gian Sự Kiện & Lễ Đường Hoàng Gia
          </p>
          <h1 className="event-hero-title font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight drop-shadow-2xl">
            Tổ Chức Lễ Cưới, Hội Nghị & Những Dịp Đặc Biệt Đáng Nhớ
          </h1>
          <p className="text-xs sm:text-sm font-sans tracking-[0.3em] text-amber-100 uppercase font-light pt-4">
            NATHOTEL RESORT & SPA · ROYAL EVENTS & WEDDINGS
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={scrollToSection}
          className="event-scroll-down absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-amber-200 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to Event List"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100">
            CUỘN XUỐNG KHÁM PHÁ
          </span>
          <ChevronDown size={22} className="animate-bounce text-amber-300" />
        </button>
      </section>

      {/* Main Sequential Event Showcase Section (Solid Light Sand Background - No 3D Canvas) */}
      <main id="event-list" className="relative z-10 py-24 px-6 lg:px-16 max-w-7xl mx-auto space-y-32">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold">
            WORLD-CLASS EVENT SPACES
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1c23] font-normal">
            Khám Phá Các <span className="italic font-light text-amber-800">Không Gian Sự Kiện</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
            Mỗi sự kiện tại NATHotel đều được thiết kế tỉ mỉ mang phong cách tạp chí resort cao cấp, lưu giữ trọn vẹn từng khoảnh khắc cảm xúc vô giá.
          </p>
        </div>

        {/* Event Showcase Items (Magazine Z-Pattern Layout with Vertical Bronze Line) */}
        <div className="space-y-28">
          {eventCategories.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className="event-item-block grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Text Column */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                  {/* Vertical Bronze Line Title */}
                  <div className="border-l-[2px] border-amber-800/80 pl-4 space-y-1">
                    <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">
                      {item.capacity}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1c23] font-normal leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-serif italic text-base text-amber-900 font-light">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Magazine Description */}
                  <p className="text-[#5a5852] font-sans text-sm md:text-base leading-relaxed font-light">
                    {item.desc}
                  </p>

                  {/* Highlights List */}
                  <ul className="space-y-2 pt-2">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <CheckCircle2 size={14} className="text-amber-800 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleInquiry}
                      className="px-6 py-3.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>GỬI YÊU CẦU TƯ VẤN SỰ KIỆN</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Image Column */}
                <div className={`lg:col-span-7 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                  <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-white border border-amber-900/15 shadow-xl shadow-amber-950/5 group">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Action Card */}
        <div className="bg-white border border-amber-900/15 p-8 lg:p-12 text-center space-y-6 shadow-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c23]">
            Bắt Đầu Lên Kế Hoạch Cho Sự Kiện Độc Bản Của Bạn
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
            Liên hệ ngay với bộ phận Tổ chức Sự kiện Concierge của NATHotel để nhận tư vấn không gian và thực đơn tiệc thiết kế riêng.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-[0.25em] transition-colors shadow-md"
            >
              <span>TIẾP TỤC ĐẶT LỊCH HỖ TRỢ</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventPage;
