import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { X, Maximize2, Users, Bed, CheckCircle2, ArrowRight, ShieldCheck, Wifi, Coffee } from 'lucide-react';

const RoomDetailModal = ({ room, onClose }) => {
  const { setSelectedRoom } = useBooking();
  const navigate = useNavigate();

  if (!room) return null;

  const handleBookNow = () => {
    setSelectedRoom(room);
    onClose();
    navigate('/booking');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-amber-900/15 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-gray-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 border border-amber-900/20 text-gray-800 hover:text-amber-800 flex items-center justify-center transition-colors shadow-md"
        >
          <X size={20} />
        </button>

        {/* Room Header Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div>
              <span className="bg-amber-800 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 mb-2 inline-block">
                {room.category}
              </span>
              <h3 className="font-serif text-3xl font-normal drop-shadow-md">{room.name}</h3>
              <p className="text-xs text-amber-200 tracking-wide mt-0.5">{room.tagline}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-200 uppercase tracking-widest block font-medium">Giá theo đêm</span>
              <span className="font-serif text-2xl text-white font-bold">{room.formattedPrice}</span>
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-8 space-y-6">
          <p className="text-sm text-gray-700 leading-relaxed font-light">
            {room.description}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#fcf9f2] border border-amber-900/15 text-xs text-gray-800 font-medium">
            <div className="flex items-center gap-2">
              <Maximize2 size={16} className="text-amber-800 shrink-0" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Diện tích</span>
                <span className="font-semibold">{room.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-amber-800 shrink-0" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Sức chứa</span>
                <span className="font-semibold">{room.capacity}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bed size={16} className="text-amber-800 shrink-0" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Loại giường</span>
                <span className="font-semibold">{room.bed}</span>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div>
            <h4 className="font-serif text-lg text-[#1a1c23] mb-3">Tiện Nghi Độc Quyền Nổi Bật</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-800 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Wifi size={14} className="text-amber-800 shrink-0" />
                <span>Internet Wifi tốc độ cao miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee size={14} className="text-amber-800 shrink-0" />
                <span>Trà & Cà phê Specialty phục vụ tại phòng</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-amber-900/15 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600 font-light">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>Miễn phí hủy phòng trước 48h · Cam kết giá ưu đãi nhất</span>
            </div>

            <button
              onClick={handleBookNow}
              className="px-8 py-3.5 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-md flex items-center gap-2"
            >
              <span>ĐẶT PHÒNG NGAY</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;
