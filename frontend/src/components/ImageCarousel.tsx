// HomePage.tsx or ImageCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// components/ImageCarousel.tsx
export default function ImageCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      <Swiper
  spaceBetween={30}
  centeredSlides={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Autoplay, Pagination, Navigation]}
  className="mySwiper rounded-lg shadow-lg"
>
  <SwiperSlide>
    <img src="/images/v1.jpg"alt="Beach" className="w-full h-96 object-cover" />
  </SwiperSlide>
  <SwiperSlide>
    <img src="/images/v2.jpg"alt="Mountains" className="w-full h-96 object-cover" />
  </SwiperSlide>
  <SwiperSlide>
    <img src="/images/v3.jpg" alt="City" className="w-full h-96 object-cover" />
  </SwiperSlide>
    <SwiperSlide>
    <img src="/images/v4.jpg" alt="City" className="w-full h-96 object-cover" />
  </SwiperSlide>
    <SwiperSlide>
    <img src="/images/v5.jpeg" alt="City" className="w-full h-96 object-cover" />
  </SwiperSlide>

</Swiper>

    </div>
  );
}
