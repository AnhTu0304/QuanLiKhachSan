import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import StepRoomSelect from '../components/booking/StepRoomSelect';
import StepGuestDetails from '../components/booking/StepGuestDetails';
import StepPayment from '../components/booking/StepPayment';
import StepConfirmation from '../components/booking/StepConfirmation';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'CHỌN PHÒNG & DỊCH VỤ' },
    { number: 2, title: 'THÔNG TIN KHÁCH HÀNG' },
    { number: 3, title: 'THANH TOÁN TRỰC TUYẾN' },
    { number: 4, title: 'XÁC NHẬN VÉ VOUCHER' },
  ];

  return (
    <div className="relative bg-[#fcf9f2] text-gray-900 min-h-screen flex flex-col justify-between selection:bg-amber-800/20 selection:text-amber-950">
      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-6 lg:px-16 max-w-7xl mx-auto w-full flex-grow space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-3">
          <p className="text-xs font-sans tracking-[0.35em] text-amber-800 uppercase font-semibold">
            ONLINE RESERVATION & CHECKOUT
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1a1c23] font-normal">
            Đặt Phòng Nghỉ Dưỡng <span className="italic font-light text-amber-800">NATHotel</span>
          </h1>
        </div>

        {/* Step Progress Indicator Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-amber-900/15 py-6">
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isDone = currentStep > step.number;
            return (
              <div
                key={step.number}
                className={`flex items-center gap-3 p-3 transition-colors ${
                  isActive
                    ? 'border-b-2 border-amber-800 text-amber-950'
                    : isDone
                    ? 'text-amber-800/80'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isActive
                      ? 'bg-amber-800 text-white'
                      : isDone
                      ? 'bg-amber-800/10 text-amber-800 border border-amber-800/30'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-[11px] font-sans tracking-widest uppercase truncate font-semibold">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Component Viewport */}
        <div>
          {currentStep === 1 && <StepRoomSelect onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && (
            <StepGuestDetails
              onNext={() => setCurrentStep(3)}
              onPrev={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <StepPayment
              onNext={() => setCurrentStep(4)}
              onPrev={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 4 && <StepConfirmation />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
