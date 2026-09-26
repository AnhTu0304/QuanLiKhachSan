import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { User, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';

const StepGuestDetails = ({ onNext, onPrev }) => {
  const { guestInfo, setGuestInfo, selectedRoom, calculateTotal } = useBooking();
  const { nights, grandTotal } = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-gray-900">
      <div className="bg-white border border-amber-900/15 p-8 space-y-6 shadow-sm">
        <h3 className="font-serif text-2xl text-[#1a1c23]">Thông Tin Khách Hàng Nghỉ Dưỡng</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
              <User size={14} /> Họ và Tên Khách Đặt *
            </label>
            <input
              type="text"
              required
              value={guestInfo.fullName}
              onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full bg-[#fcf9f2] border border-amber-900/15 text-gray-900 text-sm px-4 py-3 outline-none focus:border-amber-800"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
              <Phone size={14} /> Số Điện Thoại Di Động *
            </label>
            <input
              type="tel"
              required
              value={guestInfo.phone}
              onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
              placeholder="0901 234 567"
              className="w-full bg-[#fcf9f2] border border-amber-900/15 text-gray-900 text-sm px-4 py-3 outline-none focus:border-amber-800"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
            <Mail size={14} /> Địa Chỉ Email (Nhận mã QR Check-in) *
          </label>
          <input
            type="email"
            required
            value={guestInfo.email}
            onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
            placeholder="example@domain.com"
            className="w-full bg-[#fcf9f2] border border-amber-900/15 text-gray-900 text-sm px-4 py-3 outline-none focus:border-amber-800"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
            <FileText size={14} /> Ghi Chú Đặt Phòng / Yêu Cầu Đặc Biệt
          </label>
          <textarea
            rows={3}
            value={guestInfo.notes}
            onChange={(e) => setGuestInfo({ ...guestInfo, notes: e.target.value })}
            placeholder="Tầng cao, phòng yên tĩnh, trang trí kỷ niệm ngày cưới..."
            className="w-full bg-[#fcf9f2] border border-amber-900/15 text-gray-900 text-sm px-4 py-3 outline-none focus:border-amber-800 resize-none"
          />
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-white border border-amber-900/15 p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div>
          <span className="text-xs text-amber-800 uppercase tracking-widest block font-bold">{selectedRoom?.name}</span>
          <span className="text-xs text-gray-600 font-light">{nights} đêm lưu trú · Tổng tiền bao gồm thuế & phí</span>
        </div>
        <span className="font-serif text-2xl text-amber-800 font-bold">{grandTotal.toLocaleString('vi-VN')} ₫</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 border border-amber-900/20 text-gray-800 hover:text-amber-800 text-xs uppercase tracking-widest transition-colors font-medium"
        >
          <ArrowLeft size={14} /> Quay lại chọn phòng
        </button>

        <button
          type="submit"
          className="px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
        >
          TIẾP TỤC: THANH TOÁN
        </button>
      </div>
    </form>
  );
};

export default StepGuestDetails;
