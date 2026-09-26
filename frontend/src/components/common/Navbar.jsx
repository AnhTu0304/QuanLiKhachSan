import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PHÒNG & VILLA', to: '/rooms' },
    { name: 'DỊCH VỤ & BUFFET', to: '/services' },
    { name: 'SỰ KIỆN', to: '/events' },
    { name: 'LIÊN HỆ', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#fcf9f2]/95 backdrop-blur-md border-b border-amber-900/10 py-4 shadow-md'
          : 'bg-gradient-to-b from-black/60 via-black/25 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex flex-col tracking-widest transition-opacity duration-300"
        >
          <span className={`font-serif text-2xl lg:text-3xl font-medium tracking-[0.25em] transition-colors ${
            scrolled ? 'text-[#1a1c23] group-hover:text-amber-800' : 'text-white group-hover:text-amber-200'
          }`}>
            NATHOTEL
          </span>
          <span className={`text-[9px] tracking-[0.3em] font-sans uppercase font-semibold ${
            scrolled ? 'text-amber-800/80' : 'text-amber-200/90'
          }`}>
            Luxury Seaside Retreat
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = link.to && location.pathname === link.to;
            return link.to ? (
              <Link
                key={link.name}
                to={link.to}
                className={`text-xs font-sans tracking-[0.2em] transition-colors duration-300 uppercase py-1 relative group font-semibold ${
                  scrolled
                    ? isActive ? 'text-amber-800' : 'text-gray-800 hover:text-amber-800'
                    : isActive ? 'text-amber-200' : 'text-white hover:text-amber-200'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                  scrolled ? 'bg-amber-700' : 'bg-amber-300'
                } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-sans tracking-[0.2em] transition-colors duration-300 uppercase py-1 relative group font-semibold ${
                  scrolled ? 'text-gray-800 hover:text-amber-800' : 'text-white hover:text-amber-200'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-amber-700' : 'bg-amber-300'
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Primary CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/booking"
            className={`group relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300 shadow-sm ${
              scrolled
                ? 'text-gray-900 border border-amber-800/40 hover:border-amber-800 hover:bg-amber-800 hover:text-white'
                : 'text-white border border-white/50 hover:border-amber-300 hover:bg-amber-300 hover:text-black'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:translate-x-0.5 transition-transform">
              ĐẶT PHÒNG NGAY
              <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${
                scrolled ? 'text-amber-800 group-hover:text-white' : 'text-amber-300 group-hover:text-black'
              }`} />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 focus:outline-none ${scrolled ? 'text-gray-900 hover:text-amber-800' : 'text-white hover:text-amber-200'}`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcf9f2]/98 backdrop-blur-xl border-b border-amber-900/10 px-6 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            link.to ? (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-sans tracking-[0.2em] text-gray-800 hover:text-amber-800 uppercase py-2 border-b border-amber-900/10 font-semibold"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-sans tracking-[0.2em] text-gray-800 hover:text-amber-800 uppercase py-2 border-b border-amber-900/10 font-medium"
              >
                {link.name}
              </a>
            )
          ))}
          <Link
            to="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-md"
          >
            ĐẶT PHÒNG NGAY
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
