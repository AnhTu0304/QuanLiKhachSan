import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { QrCode, CreditCard, ShieldCheck, ArrowLeft, Clock, CheckCircle, Sparkles, Lock } from 'lucide-react';

const StepPayment = ({ onNext, onPrev }) => {
  const {
    paymentMethod,
    setPaymentMethod,
    calculateTotal,
    selectedRoom,
    guestInfo,
    checkInDate,
    checkOutDate,
    selectedServices,
    SERVICES_DATA,
    setBookingReceipt
  } = useBooking();

  const { nights, grandTotal } = calculateTotal();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown for QR
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setVerificationStep(1);

    // Step 1: Connecting gateway (0 - 1000ms)
    setTimeout(() => {
      setVerificationStep(2); // Step 2: Checking QR transaction (1000 - 2000ms)
    }, 1000);

    setTimeout(() => {
      setVerificationStep(3); // Step 3: Success & Generating E-Voucher (2000 - 3000ms)
    }, 2000);

    setTimeout(() => {
      const receiptId = `NAT-${Math.floor(100000 + Math.random() * 900000)}`;
      const receiptData = {
        receiptId,
        guestName: guestInfo.fullName || 'Khách Hàng NATHotel',
        email: guestInfo.email || 'guest@nathotel.com',
        phone: guestInfo.phone || '0901234567',
        roomName: selectedRoom?.name,
        checkInDate,
        checkOutDate,
        nights,
        services: selectedServices.map(id => SERVICES_DATA.find(s => s.id === id)?.name),
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'qr' ? 'Mã QR MoMo/VNPay' : 'Thẻ Quốc Tế Visa/Mastercard',
        paidAt: new Date().toLocaleString('vi-VN')
      };
      setBookingReceipt(receiptData);
      setIsProcessing(false);
      onNext();
    }, 3000);
  };

  return (
    <div className="space-y-8 text-gray-900">
      {/* Payment Method Selector */}
      <div className="bg-white border border-amber-900/15 p-8 space-y-6 shadow-sm">
        <h3 className="font-serif text-2xl text-[#1a1c23]">Chọn Phương Thức Thanh Toán</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => setPaymentMethod('qr')}
            className={`cursor-pointer p-6 border flex items-center gap-4 transition-all ${
              paymentMethod === 'qr'
                ? 'border-amber-800 bg-amber-900/5 shadow-md'
                : 'border-amber-900/15 hover:border-amber-700/40'
            }`}
          >
            <QrCode size={32} className="text-amber-800 shrink-0" />
            <div>
              <h4 className="font-serif text-lg text-[#1a1c23]">Thanh Toán Mã QR (MoMo / VNPay)</h4>
              <p className="text-xs text-gray-600 font-light mt-0.5">Quét mã QR qua ứng dụng ngân hàng hoặc ví điện tử.</p>
            </div>
          </div>

          <div
            onClick={() => setPaymentMethod('card')}
            className={`cursor-pointer p-6 border flex items-center gap-4 transition-all ${
              paymentMethod === 'card'
                ? 'border-amber-800 bg-amber-900/5 shadow-md'
                : 'border-amber-900/15 hover:border-amber-700/40'
            }`}
          >
            <CreditCard size={32} className="text-amber-800 shrink-0" />
            <div>
              <h4 className="font-serif text-lg text-[#1a1c23]">Thẻ Quốc Tế (Visa / Mastercard)</h4>
              <p className="text-xs text-gray-600 font-light mt-0.5">Thanh toán bảo mật SSL 256-bit trực tuyến.</p>
            </div>
          </div>
        </div>

        {/* QR Code Screen */}
        {paymentMethod === 'qr' ? (
          <div className="bg-[#fcf9f2] border border-amber-900/15 p-8 text-center space-y-6 max-w-md mx-auto shadow-inner">
            <div className="flex items-center justify-center gap-2 text-xs text-amber-800 font-medium">
              <Clock size={16} />
              <span>Mã QR có hiệu lực trong: <strong className="text-[#1a1c23] font-mono text-base">{formatTimer(timeLeft)}</strong></span>
            </div>

            {/* QR Mockup */}
            <div className="p-4 bg-white inline-block shadow-lg border border-amber-900/10">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NATHOTEL_PAYMENT_${grandTotal}`}
                alt="QR Code Thanh Toán"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <div className="space-y-1 text-xs text-gray-700 font-medium">
              <p>Chủ Tài Khoản: <strong className="text-gray-900">NATHOTEL RESORT LUXURY CO.</strong></p>
              <p>Số Tiền: <strong className="text-amber-800 font-serif text-base font-bold">{grandTotal.toLocaleString('vi-VN')} ₫</strong></p>
              <p className="text-gray-600">Nội dung CK: <span className="font-mono text-amber-900 font-semibold">NAT BOOKING {guestInfo.phone || '0901234567'}</span></p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-gray-600 flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" /> Hệ thống kiểm tra giao dịch tự động 24/7
              </span>
            </div>
          </div>
        ) : (
          /* Credit Card Form Simulation */
          <div className="bg-[#fcf9f2] border border-amber-900/15 p-6 space-y-4 max-w-lg mx-auto shadow-inner">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-800 mb-1 font-semibold">Số Thẻ (Card Number)</label>
              <input
                type="text"
                placeholder="4111 2222 3333 4444"
                className="w-full bg-white border border-amber-900/15 text-gray-900 text-sm px-4 py-2.5 outline-none font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-800 mb-1 font-semibold">Hạn Thẻ (MM/YY)</label>
                <input
                  type="text"
                  placeholder="12/28"
                  className="w-full bg-white border border-amber-900/15 text-gray-900 text-sm px-4 py-2.5 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-800 mb-1 font-semibold">Mã CVV</label>
                <input
                  type="password"
                  maxLength={3}
                  placeholder="888"
                  className="w-full bg-white border border-amber-900/15 text-gray-900 text-sm px-4 py-2.5 outline-none font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-amber-900/15">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 border border-amber-900/20 text-gray-800 hover:text-amber-800 text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer"
        >
          <ArrowLeft size={14} /> Quay lại điền thông tin
        </button>

        <button
          onClick={handleCompletePayment}
          disabled={isProcessing}
          className="px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <span>ĐANG XÁC NHẬN GIAO DỊCH...</span>
          ) : (
            <>
              <CheckCircle size={16} />
              <span>XÁC NHẬN HOÀN TẤT THANH TOÁN</span>
            </>
          )}
        </button>
      </div>

      {/* Luxury Payment Verification Loading Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-amber-900/20 max-w-md w-full p-8 text-center space-y-6 shadow-2xl relative">
            {/* Animated Gold Concentric Spinner */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-amber-800/15 border-t-amber-800 animate-spin" />
              <div className="w-12 h-12 rounded-full bg-amber-800/10 border border-amber-800/30 flex items-center justify-center text-amber-800 animate-pulse">
                <Sparkles size={24} />
              </div>
            </div>

            {/* Dynamic Step Text */}
            <div className="space-y-2">
              <span className="text-[10px] text-amber-800 font-sans uppercase tracking-[0.25em] font-bold">
                HỆ THỐNG ĐỐI SOÁT TỰ ĐỘNG
              </span>
              <h4 className="font-serif text-xl text-[#1a1c23] transition-all">
                {verificationStep === 1 && 'Kết Nối Cổng Thanh Toán...'}
                {verificationStep === 2 && 'Kiểm Tra Giao Dịch Mã QR...'}
                {verificationStep === 3 && 'Khởi Tạo Vé E-Voucher Nghỉ Dưỡng...'}
              </h4>
              <p className="text-xs text-gray-500 font-light">
                {verificationStep === 1 && 'Đang bảo mật kết nối mã hóa SSL 256-bit...'}
                {verificationStep === 2 && 'Đang xác nhận số tiền chuyển khoản từ Ngân Hàng...'}
                {verificationStep === 3 && 'Hoàn tất! Đang chuyển tiếp sang trang vé xác nhận...'}
              </p>
            </div>

            {/* Step Progress Indicator Bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-800 h-full transition-all duration-700 ease-out"
                style={{
                  width: verificationStep === 1 ? '33%' : verificationStep === 2 ? '66%' : '100%'
                }}
              />
            </div>

            {/* Security Footer Note */}
            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium border-t border-amber-900/10">
              <Lock size={12} className="text-emerald-600" />
              <span>Giao dịch an toàn & Phát hành E-Voucher tự động</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPayment;
