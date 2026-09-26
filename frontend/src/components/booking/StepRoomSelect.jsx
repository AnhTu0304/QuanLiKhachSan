import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Check, Calendar, Users } from 'lucide-react';

const StepRoomSelect = ({ onNext }) => {
  const {
    ROOMS_DATA,
    SERVICES_DATA,
    selectedRoom,
    setSelectedRoom,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guests,
    setGuests,
    selectedServices,
    toggleService,
    calculateTotal
  } = useBooking();

  const { nights, grandTotal } = calculateTotal();

  return (
    <div className="space-y-10 text-gray-900">
      {/* Date & Guest Filter Bar */}
      <div className="bg-white border border-amber-900/15 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md">
        <div>
          <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
            <Calendar size={14} /> Ngày Check-in
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full bg-[#fcf9f2] border border-amber-900/15 text-gray-900 text-sm px-4 py-2.5 outline-none focus:border-amber-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
            <Calendar size={14} /> Ngày Check-out
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full bg-[#fcf9f2] border border-amber-900/15 text-gray-900 text-sm px-4 py-2.5 outline-none focus:border-amber-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2 font-semibold">
            <Users size={14} /> Số Lượng Khách ({nights} Đêm)
          </label>
          <div className="flex items-center gap-3 bg-[#fcf9f2] border border-amber-900/15 px-4 py-2 text-sm font-medium">
            <button
              onClick={() => setGuests({ ...guests, adults: Math.max(1, guests.adults - 1) })}
              className="text-amber-800 hover:text-amber-950 px-2 py-0.5 text-lg font-bold"
            >
              -
            </button>
            <span className="text-gray-900 font-semibold">{guests.adults} Người lớn</span>
            <button
              onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
              className="text-amber-800 hover:text-amber-950 px-2 py-0.5 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Room Options Selection */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl text-[#1a1c23]">1. Chọn Hạng Phòng Nghỉ Dưỡng</h3>
        <div className="grid grid-cols-1 gap-6">
          {ROOMS_DATA.map((room) => {
            const isSelected = selectedRoom?.id === room.id;
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`cursor-pointer bg-white border p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 shadow-sm ${
                  isSelected
                    ? 'border-amber-800 bg-amber-900/5 shadow-md'
                    : 'border-amber-900/15 hover:border-amber-700/40'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-3/4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full md:w-48 h-32 object-cover"
                  />
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="font-serif text-2xl text-[#1a1c23]">{room.name}</h4>
                    <p className="text-xs text-amber-800 font-semibold">{room.tagline}</p>
                    <p className="text-xs text-gray-600 font-light line-clamp-2">{room.description}</p>
                    <p className="text-xs text-gray-700 font-medium">{room.size} · {room.capacity}</p>
                  </div>
                </div>

                <div className="text-right w-full md:w-auto flex flex-col items-end gap-3">
                  <div>
                    <span className="text-xs text-gray-500 block">Giá theo đêm</span>
                    <span className="font-serif text-xl text-amber-800 font-bold">{room.formattedPrice}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    isSelected ? 'bg-amber-800 border-amber-800 text-white' : 'border-gray-400'
                  }`}>
                    {isSelected && <Check size={14} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add-on Services Selection */}
      <div className="space-y-4 pt-6 border-t border-amber-900/15">
        <h3 className="font-serif text-2xl text-[#1a1c23]">2. Chọn Thêm Dịch Vụ Độc Quyền</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => {
            const isChecked = selectedServices.includes(srv.id);
            return (
              <div
                key={srv.id}
                onClick={() => toggleService(srv.id)}
                className={`cursor-pointer bg-white border p-6 space-y-4 transition-all duration-300 shadow-sm ${
                  isChecked
                    ? 'border-amber-800 bg-amber-900/5'
                    : 'border-amber-900/15 hover:border-amber-700/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-800 uppercase tracking-widest font-bold">{srv.formattedPrice}</span>
                  <div className={`w-5 h-5 border flex items-center justify-center ${
                    isChecked ? 'bg-amber-800 border-amber-800 text-white' : 'border-gray-400'
                  }`}>
                    {isChecked && <Check size={12} />}
                  </div>
                </div>
                <h4 className="font-serif text-lg text-[#1a1c23]">{srv.name}</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">{srv.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Action Button */}
      <div className="flex items-center justify-between pt-8 border-t border-amber-900/15">
        <div>
          <span className="text-xs text-gray-600 block">TỔNG CỘNG TẠM TÍNH</span>
          <span className="font-serif text-3xl text-amber-800 font-bold">{grandTotal.toLocaleString('vi-VN')} ₫</span>
        </div>
        <button
          onClick={onNext}
          className="px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md"
        >
          TIẾP TỤC: NHẬP THÔNG TIN KHOÁ
        </button>
      </div>
    </div>
  );
};

export default StepRoomSelect;
