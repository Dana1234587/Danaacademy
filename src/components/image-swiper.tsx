"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSwiperProps {
  images: { src: string }[];
}

export function ImageSwiper({ images }: ImageSwiperProps) {
  return (
    <div className="relative max-w-5xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
        }}
        className="!pb-12" // Add padding-bottom for pagination
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square relative w-full h-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image.src}
                alt={`ذكرى ${index + 1}`}
                fill={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 flex items-center justify-center w-10 h-10 bg-primary/50 text-white rounded-full cursor-pointer hover:bg-primary transition-colors after:!text-xl"></div>
      <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-0 z-10 flex items-center justify-center w-10 h-10 bg-primary/50 text-white rounded-full cursor-pointer hover:bg-primary transition-colors after:!text-xl"></div>
    </div>
  );
}
