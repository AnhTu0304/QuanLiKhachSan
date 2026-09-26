import React, { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import WaterCanvas from '../components/3d/WaterCanvas';
import HeroSection from '../components/sections/HeroSection';
import RoomsSection from '../components/sections/RoomsSection';
import ServicesSection from '../components/sections/ServicesSection';
import LocationSection from '../components/sections/LocationSection';
import OnlyAtSection from '../components/sections/OnlyAtSection';
import StorySection from '../components/sections/StorySection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/common/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after component render & image load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="relative bg-[#fcf9f2] text-gray-900 min-h-screen selection:bg-amber-800/20 selection:text-amber-950">
      {/* 3D WebGL Water Waves Canvas */}
      <WaterCanvas />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <RoomsSection />
        <ServicesSection />
        <LocationSection />
        <OnlyAtSection />
        <StorySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
