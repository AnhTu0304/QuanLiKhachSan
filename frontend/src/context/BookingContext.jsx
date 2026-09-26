import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const ROOMS_DATA = [
  {
    id: 'ocean-suite',
    name: 'Ocean Deluxe Suite',
    category: 'Suite',
    tagline: '180° Panoramic Ocean View & Private Balcony',
    size: '65 m²',
    capacity: '2 Người lớn · 1 Trẻ em',
    bed: '1 Giường King Size',
    pricePerNight: 3500000,
    formattedPrice: '3.500.000 ₫',
    image: '/images/phong1.jpg',
    description: 'Căn hộ Suite sang trọng với tầm nhìn ôm trọn biển xanh, thiết kế nội thất gỗ tự nhiên cao cấp và bồn tắm ngâm mình ngắm hoàng hôn.',
    features: ['Ban công riêng hướng biển', 'Bồn tắm ngâm mình cao cấp', 'Ăn sáng Buffet miễn phí', 'Wifi tốc độ cao', 'Dịch vụ Dọn phòng 24/7']
  },
  {
    id: 'beachfront-villa',
    name: 'Presidential Beachfront Villa',
    category: 'Villa',
    tagline: 'Private Infinity Pool & Exclusive Butler Service',
    size: '180 m²',
    capacity: '4 Người lớn · 2 Trẻ em',
    bed: '2 Giường King Size',
    pricePerNight: 8500000,
    formattedPrice: '8.500.000 ₫',
    image: '/images/phong2.jpg',
    description: 'Biệt thự bãi biển độc bản sở hữu hồ bơi vô cực riêng, lối đi thẳng ra bãi biển cát trắng cùng quản gia riêng phục vụ 24/7.',
    features: ['Hồ bơi vô cực riêng', 'Lối đi riêng ra bãi biển', 'Quản gia cá nhân 24/7', 'Buffet sáng tại Villa', 'Đưa đón sân bay hạng sang']
  },
  {
    id: 'sunset-room',
    name: 'Sunset Executive Room',
    category: 'Suite',
    tagline: 'Private Sunset Terrace & Contemporary Elegance',
    size: '50 m²',
    capacity: '2 Người lớn',
    bed: '1 Giường Queen Size',
    pricePerNight: 2800000,
    formattedPrice: '2.800.000 ₫',
    image: '/images/phong3.jpg',
    description: 'Không gian ấm cúng tinh tế với ban công riêng hướng thẳng về phía mặt trời lặn, tạo cảm giác thư thái đỉnh cao.',
    features: ['Ban công ngắm hoàng hôn', 'Hệ thống âm thanh Marshall', 'Trà & Cà phê cao cấp', 'Buffet sáng bao gồm']
  },
  {
    id: 'royal-grand-suite',
    name: 'Royal Grand Sea Suite',
    category: 'Suite',
    tagline: 'Ultimate Opulence & Panoramic Horizon View',
    size: '120 m²',
    capacity: '3 Người lớn · 1 Trẻ em',
    bed: '1 Giường Super King',
    pricePerNight: 5900000,
    formattedPrice: '5.900.000 ₫',
    image: '/images/phong4.jpg',
    description: 'Đỉnh cao nghỉ dưỡng hoàng gia với phòng khách rộng lớn, quầy minibar thiết kế riêng và ban công Panorama toàn cảnh đại dương.',
    features: ['Phòng khách độc lập', 'Quầy Bar cá nhân', 'Dịch vụ Spa tại phòng', 'Đón tiễn ưu tiên tại sân bay']
  },
  {
    id: 'horizon-bungalow',
    name: 'Horizon Garden Bungalow',
    category: 'Bungalow',
    tagline: 'Secluded Garden Sanctuary & Ocean Breeze',
    size: '75 m²',
    capacity: '2 Người lớn · 2 Trẻ em',
    bed: '1 Giường King Size',
    pricePerNight: 4200000,
    formattedPrice: '4.200.000 ₫',
    image: '/images/phong5.jpg',
    description: 'Bungalow ẩn mình giữa khu vườn nhiệt đới xanh mát, hòa mình vào thiên nhiên tươi đẹp với tiếng sóng biển thì rào.',
    features: ['Khu vườn riêng tư', 'Bồn tắm sân vườn ngoài trời', 'Gần nhà hàng Buffet', 'Xe điện đưa đón nội khu']
  }
];

export const BUFFET_IMAGES = [
  {
    src: '/images/buffet.jpg',
    title: 'Quầy Ẩm Thực Á - Âu Phong Phú',
    desc: 'Hơn 80 món ăn tươi ngon được chế biến trực tiếp từ nguyên liệu thượng hạng.'
  },
  {
    src: '/images/buffet2.jpg',
    title: 'Hải Sản Tươi Sống Đánh Bắt Trong Ngày',
    desc: 'Tôm hùm, hàu đại dương, và các món nướng thơm lừng trên than hồng.'
  },
  {
    src: '/images/buffet3.png',
    title: 'Bánh Ngọt & Tráng Miệng Pháp Thủ Công',
    desc: 'Các loại bánh sừng bò, phô mai nướng, và trái cây nhiệt đới tươi mát.'
  },
  {
    src: '/images/buffet4.jpg',
    title: 'Trạm Cà Phê & Nước Ép Tươi',
    desc: 'Cà phê Specialty pha thủ công và các loại nước ép trái cây mọng nước.'
  }
];

export const SERVICES_DATA = [
  {
    id: 'buffet',
    name: 'Buffet Sáng Thượng Hạng (Gourmet Breakfast)',
    price: 450000,
    formattedPrice: '450.000 ₫ / người / ngày',
    description: 'Thưởng thức bữa sáng phong phú Á - Âu với hơn 80 món ăn tươi ngon chuẩn 5 sao được chế biến trực tiếp bởi đầu bếp thượng hạng.',
    icon: 'Coffee'
  },
  {
    id: 'spa',
    name: 'Gói Spa & Thư Giãn Trị Liệu (NATHotel Spa Package)',
    price: 1200000,
    formattedPrice: '1.200.000 ₫ / gói',
    description: 'Liệu trình massage tinh dầu thảo dược 90 phút phục hồi năng lượng và xông hơi đá muối Himalayan.',
    icon: 'Sparkles'
  },
  {
    id: 'shuttle',
    name: 'Đưa Đón Sân Bay Hạng Sang (Luxury Airport Transfer)',
    price: 600000,
    formattedPrice: '600.000 ₫ / lượt',
    description: 'Dịch vụ đưa đón riêng bằng xe Mercedes-Benz E-Class kèm nước uống và khăn lạnh cao cấp.',
    icon: 'Car'
  }
];

export const BookingProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS_DATA[0]);
  const [checkInDate, setCheckInDate] = useState('2026-08-25');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-27');
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedServices, setSelectedServices] = useState(['buffet']);
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [bookingReceipt, setBookingReceipt] = useState(null);

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

    const roomCost = (selectedRoom ? selectedRoom.pricePerNight : 0) * nights;
    
    let servicesCost = 0;
    selectedServices.forEach(srvId => {
      const srv = SERVICES_DATA.find(s => s.id === srvId);
      if (srv) {
        if (srv.id === 'buffet') {
          servicesCost += srv.price * (guests.adults + guests.children) * nights;
        } else {
          servicesCost += srv.price;
        }
      }
    });

    return {
      nights,
      roomCost,
      servicesCost,
      grandTotal: roomCost + servicesCost
    };
  };

  return (
    <BookingContext.Provider
      value={{
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
        guestInfo,
        setGuestInfo,
        paymentMethod,
        setPaymentMethod,
        bookingReceipt,
        setBookingReceipt,
        calculateTotal,
        ROOMS_DATA,
        BUFFET_IMAGES,
        SERVICES_DATA
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
