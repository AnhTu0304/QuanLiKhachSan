import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { CheckCircle2, Printer, Home } from 'lucide-react';

const StepConfirmation = () => {
  const { bookingReceipt } = useBooking();

  if (!bookingReceipt) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-gray-600 text-sm">Chưa tìm thấy dữ liệu hóa đơn đặt phòng.</p>
        <Link to="/" className="text-amber-800 underline text-xs font-semibold">Trở về Trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto text-gray-900">
      {/* Top Banner */}
      <div className="bg-amber-800/10 border border-amber-800/30 p-8 text-center space-y-4 shadow-sm">
        <CheckCircle2 size={48} className="text-amber-800 mx-auto" />
        <h3 className="font-serif text-3xl sm:text-4xl text-[#1a1c23] font-normal">
          XÁC NHẬN ĐẶT PHÒNG THÀNH CÔNG!
        </h3>
        <p className="text-xs text-amber-900 tracking-widest uppercase font-semibold">
          MÃ ĐẶT PHÒNG CỦA BẠN: <span className="font-mono text-lg font-bold text-gray-900 ml-1">{bookingReceipt.receiptId}</span>
        </p>
        <p className="text-xs text-gray-700 font-light max-w-md mx-auto">
          Cảm ơn bạn đã lựa chọn NATHotel. Thông tin vé xác nhận và mã QR Check-in đã được gửi tới email <strong>{bookingReceipt.email}</strong>.
        </p>
      </div>

      {/* Printable Receipt Voucher */}
      <div className="bg-white border border-amber-900/15 p-8 space-y-6 shadow-md relative">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-amber-900/15 pb-6 gap-4">
          <div>
            <h4 className="font-serif text-2xl text-[#1a1c23] font-normal">NATHOTEL RESORT & SPA</h4>
            <p className="text-[10px] text-amber-800 tracking-widest uppercase font-bold">E-VOUCHER CHECK-IN NGHỈ DƯỠNG</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 block font-medium">Thời gian thanh toán</span>
            <span className="text-xs text-gray-800 font-mono font-semibold">{bookingReceipt.paidAt}</span>
          </div>
        </div>

        {/* Voucher Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
          <div className="space-y-3">
            <div>
              <span className="text-gray-500 block text-[11px] uppercase font-medium">Họ và Tên Khách Hàng</span>
              <span className="text-[#1a1c23] text-sm font-semibold">{bookingReceipt.guestName}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px] uppercase font-medium">Số Điện Thoại</span>
              <span className="text-gray-900 font-medium">{bookingReceipt.phone}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px] uppercase font-medium">Email</span>
              <span className="text-gray-900 font-medium">{bookingReceipt.email}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-gray-500 block text-[11px] uppercase font-medium">Hạng Phòng Đặt</span>
              <span className="text-amber-800 text-sm font-serif font-semibold">{bookingReceipt.roomName}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px] uppercase font-medium">Thời Gian Lưu Trú ({bookingReceipt.nights} đêm)</span>
              <span className="text-gray-900 font-medium">{bookingReceipt.checkInDate} ➔ {bookingReceipt.checkOutDate}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[11px] uppercase font-medium">Dịch Vụ Đi Kèm</span>
              <span className="text-gray-900 font-medium">{bookingReceipt.services.join(', ') || 'Không chọn thêm'}</span>
            </div>
          </div>
        </div>

        {/* Amount & QR Checkin */}
        <div className="pt-6 border-t border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs text-gray-500 block font-medium">TỔNG TIỀN ĐÃ THANH TOÁN ({bookingReceipt.paymentMethod})</span>
            <span className="font-serif text-3xl text-amber-800 font-bold">{bookingReceipt.totalAmount.toLocaleString('vi-VN')} ₫</span>
          </div>

          <div className="text-center p-3 bg-[#fcf9f2] border border-amber-900/15">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CHECKIN_${bookingReceipt.receiptId}`}
              alt="Mã QR Check-in"
              className="w-20 h-20 mx-auto"
            />
            <span className="text-[9px] text-gray-800 font-mono block mt-1 font-bold">QUÉT KHI CHECK-IN</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 border border-amber-900/20 text-amber-800 hover:bg-amber-900/10 text-xs uppercase tracking-widest transition-colors font-semibold"
        >
          <Printer size={16} /> IN VÉ VOUCHER
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 px-8 py-3.5 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
        >
          <Home size={16} /> TRỞ VỀ TRANG CHỦ
        </Link>
      </div>
    </div>
  );
};

export default StepConfirmation;
