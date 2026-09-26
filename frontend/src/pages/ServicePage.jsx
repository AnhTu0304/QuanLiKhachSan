import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useBooking } from '../context/BookingContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, Waves, Sparkles, GlassWater, ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicePage = () => {
  const containerRef = useRef(null);
  const { toggleService } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Hero Banner text entrance
    gsap.from('.service-hero-sub', { y: 25, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.service-hero-title', { y: 45, opacity: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' });
    gsap.from('.service-scroll-down', { y: 20, opacity: 0, duration: 1, delay: 0.8, ease: 'power3.out' });

    // Scroll reveal for review items
    gsap.utils.toArray('.review-item-block').forEach((block) => {
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

  const handleBookService = (serviceId) => {
    toggleService(serviceId);
    navigate('/booking');
  };

  const scrollToSection = () => {
    const el = document.getElementById('service-reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceCategories = [
    {
      categoryName: 'Ẩm Thực Thượng Hạng & Buffet',
      icon: <Utensils className="text-amber-800" size={20} />,
      serviceId: 'buffet',
      reviews: [
        {
          title: 'Buffet Sáng Phong Phú Á - Âu',
          desc: 'Thưởng thức bữa sáng đỉnh cao với hơn 80 món ăn chế biến tươi nóng trực tiếp bởi đội ngũ đầu bếp 5 sao: Hải sản đại dương, nướng than hồng, quầy phô mai và trạm cà phê Specialty.',
          image: '/images/buffet.jpg',
          imageAlt: 'Buffet sáng NATHotel'
        },
        {
          title: 'Ẩm thực riêng tư ngay tại phòng',
          desc: 'Mang đến một trải nghiệm riêng tư dành cho thực khách, các bữa ăn thịnh soạn sẽ được chuẩn bị bởi đội ngũ đầu bếp chuyên nghiệp ngay tại phòng, giúp Quý khách vừa tận hưởng không gian riêng, vừa thưởng thức những món ngon hấp dẫn nhất.',
          image: '/images/buffet2.jpg',
          imageAlt: 'Ẩm thực riêng tư ngay tại phòng NATHotel'
        }
      ]
    },
    {
      categoryName: 'NATHotel Serenity Spa & Wellness',
      icon: <Sparkles className="text-amber-800" size={20} />,
      serviceId: 'spa',
      reviews: [
        {
          title: 'Liệu Trình Massage Thảo Dược Himalayan',
          desc: 'Giải tỏa mọi căng thẳng tích tụ với liệu pháp ấn huyệt chuyên sâu kết hợp tinh dầu thảo mộc tự nhiên, đá nóng và xông hơi đá muối Himalayan thanh lọc cơ thể.',
          image: '/images/lobby.jpg',
          imageAlt: 'Serenity Spa NATHotel'
        },
        {
          title: 'Trị Liệu Phục Hồi Năng Lượng Chuyên Sâu',
          desc: 'Không gian trị liệu tĩnh lặng giữa thiên nhiên xanh mát, mang lại sự bình yên tuyệt đối cho thân - tâm - trí của du khách trong suốt kỳ nghỉ dưỡng.',
          image: '/images/spa5.jpg',
          imageAlt: 'Không gian trị liệu Spa'
        }
      ]
    },
    {
      categoryName: 'Rooftop Sunset Lounge & Cocktail Bar',
      icon: <GlassWater className="text-amber-800" size={20} />,
      serviceId: 'shuttle',
      reviews: [
        {
          title: 'Sunset Cocktail Lounge Ngắm Hoàng Hôn',
          desc: 'Tận hưởng những khoảnh khắc hoàng hôn ngả sắc vàng rực rỡ trên tầng thượng với các dòng Cocktail Signature độc đáo sáng tạo bởi bartender hàng đầu.',
          image: '/images/bar4.jpg',
          imageAlt: 'Rooftop Sunset Bar'
        },
        {
          title: 'Đêm Nhạc Live Acoustic & Wine Bar',
          desc: 'Nhâm nhi những ly rượu vang Ý thượng hạng cùng giai điệu Acoustic nồng nàn dưới bầu trời đêm đầy sao lãng mạn.',
          image: '/images/bar1.jpg',
          imageAlt: 'Đêm nhạc Acoustic Wine Bar'
        }
      ]
    },
    {
      categoryName: 'Hồ Bơi Vô Cực Hướng Biển',
      icon: <Waves className="text-amber-800" size={20} />,
      serviceId: 'buffet',
      reviews: [
        {
          title: 'Bể Bơi Tràn Viền Tầm Nhìn Đại Dương 360°',
          desc: 'Hòa mình vào làn nước trong xanh nối liền với chân trời biển cả, thư thái trên những giường tắm nắng bọc nệm sang trọng và không gian khoáng đạt.',
          image: '/images/hoboi1.jpg',
          imageAlt: 'Oceanfront Infinity Pool'
        },
        {
          title: 'Dịch Vụ Phục Vụ Đồ Uống Tận Giường Tắm Nắng',
          desc: 'Thưởng thức các loại nước ép trái cây mọng nước và món ăn nhẹ nhiệt đới được phục vụ tận nơi ngay tại hồ bơi vô cực.',
          image: '/images/buffet4.jpg',
          imageAlt: 'Poolside beverage service'
        }
      ]
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#fcf9f2] text-gray-900 min-h-screen selection:bg-amber-800/20 selection:text-amber-950">

      {/* Smart Scroll Navigation Bar */}
      <Navbar />

      {/* Full Viewport Height Hero Banner Section (Using buffet2.jpg) */}
      <section className="relative min-h-screen h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/buffet2.jpg"
            alt="NATHotel Gourmet Buffet & Service Banner"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.05]"
          />
          {/* Light Sand Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 space-y-5 text-white pt-16">
          <p className="service-hero-sub font-serif italic text-xl sm:text-2xl text-amber-200 tracking-wider">
            Trải nghiệm & Ẩm thực 5 sao
          </p>
          <h1 className="service-hero-title font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight drop-shadow-2xl">
            Buffet sáng thượng hạng, Spa trị liệu & Rooftop Sunset Bar
          </h1>
          <p className="text-xs sm:text-sm font-sans tracking-[0.3em] text-amber-100 uppercase font-light pt-4">
            NATHOTEL RESORT & SPA · WORLD-CLASS HOSPITALITY
          </p>
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={scrollToSection}
          className="service-scroll-down absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-amber-200 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to Services"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] font-medium opacity-80 group-hover:opacity-100">
            CUỘN XUỐNG KHÁM PHÁ
          </span>
          <ChevronDown size={22} className="animate-bounce text-amber-300" />
        </button>
      </section>

      {/* Main Sequential Reviews Section (Pure Solid Light Sand Background - No 3D Canvas) */}
      <main id="service-reviews" className="relative z-10 py-24 px-6 lg:px-16 max-w-7xl mx-auto space-y-32">

        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold">
            LUXURY HOSPITALITY COLLECTION
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1c23] font-normal">
            Trải Nghiệm Dịch Vụ <span className="italic font-light text-amber-800">Độc Bản</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
            Mỗi dịch vụ tại NATHotel là một mảnh ghép hoàn hảo tạo nên kỳ nghỉ dưỡng đỉnh cao dành riêng cho bạn và gia đình.
          </p>
        </div>

        {/* Service Categories Showcase Blocks */}
        {serviceCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-16 pt-8 border-t border-amber-900/15">
            {/* Category Header Title */}
            <div className="flex items-center justify-between border-b border-amber-900/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-800/10 border border-amber-800/20">
                  {cat.icon}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1c23] font-normal">
                  {cat.categoryName}
                </h3>
              </div>

              <button
                onClick={() => handleBookService(cat.serviceId)}
                className="hidden sm:flex items-center gap-2 px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
              >
                <span>ĐẶT TRẢI NGHIỆM</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 2 Sub-Reviews for each Service Category (Matching Image Style media_1787151216890.png) */}
            <div className="space-y-20">
              {cat.reviews.map((rev, revIdx) => {
                const isEven = revIdx % 2 === 0;
                return (
                  <div
                    key={revIdx}
                    className="review-item-block grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                  >
                    {/* Text Column */}
                    <div className={`lg:col-span-5 space-y-6 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                      {/* Vertical Line Title (Exact match to uploaded image) */}
                      <div className="border-l-[2px] border-amber-800/80 pl-4 space-y-1">
                        <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1a1c23] font-normal leading-tight">
                          {rev.title}
                        </h4>
                      </div>

                      {/* Description Paragraph */}
                      <p className="text-[#5a5852] font-sans text-sm md:text-base leading-relaxed font-light">
                        {rev.desc}
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => handleBookService(cat.serviceId)}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 hover:text-amber-950 transition-colors group"
                        >
                          <span>KHÁM PHÁ CHI TIẾT</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className={`lg:col-span-7 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                      <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-white border border-amber-900/15 shadow-xl shadow-amber-950/5 group">
                        <img
                          src={rev.image}
                          alt={rev.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Bottom Booking Action Card */}
        <div className="bg-white border border-amber-900/15 p-8 lg:p-12 text-center space-y-6 shadow-xl">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c23]">
            Sẵn Sàng Trải Nghiệm Kỳ Nghỉ Dưỡng Thượng Hạng?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
            Đặt phòng trực tuyến tại NATHotel ngay hôm nay để nhận ưu đãi tặng kèm Buffet sáng và dịch vụ Spa miễn phí.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-[0.25em] transition-colors shadow-md"
            >
              <span>TIẾP TỤC ĐẶT PHÒNG NGAY</span>
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

export default ServicePage;
