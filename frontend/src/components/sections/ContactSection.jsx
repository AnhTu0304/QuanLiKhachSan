import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Đặt phòng nghỉ dưỡng',
    message: ''
  });

  useGSAP(() => {
    gsap.fromTo('.contact-wrapper',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.contact-wrapper',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: 'Đặt phòng nghỉ dưỡng',
        message: ''
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-28 px-6 lg:px-16 bg-[#fcf9f2] border-t border-amber-900/10 z-10 text-gray-900"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="contact-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold mb-2">
                GET IN TOUCH
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1a1c23] font-normal">
                Liên Hệ Với <span className="italic font-light text-amber-800">Chúng Tôi</span>
              </h2>
              <p className="text-gray-600 text-sm font-light mt-4 leading-relaxed">
                Đội ngũ Quản gia & Concierge 24/7 của NATHotel luôn sẵn sàng lắng nghe và tư vấn chi tiết nhất cho chuyến nghỉ dưỡng đặc biệt của bạn.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-800/10 border border-amber-800/20 flex items-center justify-center text-amber-800 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-amber-800 uppercase tracking-widest font-semibold">Hotline Đặt Phòng 24/7</p>
                  <p className="text-[#1a1c23] font-serif text-lg font-bold">+84 (0) 28 8888 9999</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-800/10 border border-amber-800/20 flex items-center justify-center text-amber-800 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-amber-800 uppercase tracking-widest font-semibold">Email Hỗ Trợ Concierge</p>
                  <p className="text-[#1a1c23] font-serif text-lg font-bold">reservations@nathotel.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-800/10 border border-amber-800/20 flex items-center justify-center text-amber-800 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-amber-800 uppercase tracking-widest font-semibold">Địa Chỉ Resort</p>
                  <p className="text-gray-700 text-sm font-light">Đại lộ Bờ Biển Vàng, Phường Biển Xanh, Việt Nam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white border border-amber-900/15 p-8 lg:p-12 shadow-xl relative">
            <h3 className="font-serif text-2xl text-[#1a1c23] font-normal mb-6">
              Gửi Yêu Cầu Tư Vấn / Đặt Tiệc
            </h3>

            {submitted ? (
              <div className="bg-amber-800/10 border border-amber-800/30 p-8 text-center space-y-3">
                <CheckCircle2 className="text-amber-800 mx-auto" size={40} />
                <h4 className="font-serif text-xl text-[#1a1c23]">Gửi Thông Tin Thành Công!</h4>
                <p className="text-xs text-gray-700 font-light">
                  Cảm ơn bạn đã liên hệ. Bộ phận Concierge của NATHotel sẽ phản hồi trực tiếp qua SĐT/Email trong vòng 15 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-gray-700 mb-2 font-medium">
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-[#fcf9f2] border border-amber-900/15 focus:border-amber-800 text-gray-900 text-sm px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-gray-700 mb-2 font-medium">
                      Số Điện Thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0901 234 567"
                      className="w-full bg-[#fcf9f2] border border-amber-900/15 focus:border-amber-800 text-gray-900 text-sm px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-gray-700 mb-2 font-medium">
                      Email Liên Hệ *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className="w-full bg-[#fcf9f2] border border-amber-900/15 focus:border-amber-800 text-gray-900 text-sm px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-gray-700 mb-2 font-medium">
                      Dịch Vụ Quan Tâm
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#fcf9f2] border border-amber-900/15 focus:border-amber-800 text-gray-900 text-sm px-4 py-3 outline-none transition-colors"
                    >
                      <option value="Đặt phòng nghỉ dưỡng">Đặt phòng nghỉ dưỡng</option>
                      <option value="Tổ chức sự kiện / Tiệc cưới">Tổ chức sự kiện / Tiệc cưới</option>
                      <option value="Đặt tiệc Buffet & Dining">Đặt tiệc Buffet & Dining</option>
                      <option value="Dịch vụ Spa Trị liệu">Dịch vụ Spa Trị liệu</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-gray-700 mb-2 font-medium">
                    Lời Nhắn Hoặc Yêu Cầu Đặc Biệt
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Vui lòng cung cấp ngày dự kiến hoặc các thông tin đặc biệt..."
                    className="w-full bg-[#fcf9f2] border border-amber-900/15 focus:border-amber-800 text-gray-900 text-sm px-4 py-3 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-md"
                >
                  <Send size={14} />
                  <span>GỬI YÊU CẦU CHO CHÚNG TÔI</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
