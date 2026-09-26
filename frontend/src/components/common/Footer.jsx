import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Camera, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#f6f1e7] border-t border-amber-900/15 text-gray-700 py-16 px-6 lg:px-16 z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-amber-900/15 pb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-medium tracking-[0.25em] text-[#1a1c23]">
                NATHOTEL
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-amber-800 uppercase font-semibold">
                Luxury Seaside Retreat
              </span>
            </Link>
            <p className="text-xs font-light text-gray-600 max-w-sm leading-relaxed">
              Trải nghiệm khoảng trời bình yên vô tận và dịch vụ nghỉ dưỡng hoàng gia tại dải bờ biển đẹp nhất Việt Nam.
            </p>
          </div>

          {/* Nav Links Col */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1a1c23] font-bold">Khám Phá</p>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/rooms" className="hover:text-amber-800 transition-colors">Các Hạng Phòng & Villa</Link></li>
              <li><Link to="/services" className="hover:text-amber-800 transition-colors">Buffet Sáng & Dịch Vụ</Link></li>
              <li><Link to="/events" className="hover:text-amber-800 transition-colors">Sự Kiện & Lễ Đường</Link></li>
              <li><a href="/#contact" className="hover:text-amber-800 transition-colors">Liên Hệ Tư Vấn</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1a1c23] font-bold">Nhận Ưu Đãi Độc Quyền</p>
            <p className="text-xs font-light text-gray-600">Đăng ký để nhận các ưu đãi đặc quyền từ NATHotel.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full bg-white border border-amber-900/15 text-xs px-4 py-2.5 text-gray-900 outline-none focus:border-amber-800"
              />
              <button
                type="submit"
                className="bg-amber-800 text-white px-4 py-2.5 hover:bg-amber-900 transition-colors shadow-sm"
              >
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-gray-600">
          <p>© 2026 NATHotel Luxury Seaside Retreat. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#camera" className="hover:text-amber-800 transition-colors" title="Instagram Gallery"><Camera size={16} /></a>
            <a href="#globe" className="hover:text-amber-800 transition-colors" title="Global Website"><Globe size={16} /></a>
            <a href="#share" className="hover:text-amber-800 transition-colors" title="Share Resort"><Share2 size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
