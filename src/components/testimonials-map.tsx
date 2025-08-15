
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type Position = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

type Testimonial = {
  id: number;
  image: string;
  reviewScreenshot: string;
  position: Position;
};

interface TestimonialsMapProps {
  testimonials: Testimonial[];
}

export function TestimonialsMap({ testimonials }: TestimonialsMapProps) {
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);
  const isMobile = useIsMobile();


  const handleDotClick = (testimonial: Testimonial) => {
    setActiveTestimonial(testimonial);
  };

  const handleClose = () => {
    setActiveTestimonial(null);
  };
  
  // Smart Solution: Show an elegant swiper on mobile, and the interactive map on desktop.
  if (isMobile) {
      return (
        <div className="w-full max-w-md mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="!pb-10" // Add padding-bottom for pagination
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="aspect-[9/16] relative w-full h-full overflow-hidden rounded-lg shadow-lg border">
                  <Image
                    src={testimonial.reviewScreenshot}
                    alt={`Review screenshot ${testimonial.id}`}
                    fill={true}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )
  }


  return (
    <div 
      className="relative w-full h-[600px] bg-background rounded-lg overflow-hidden"
    >
      {testimonials.map((testimonial) => (
        <button
          key={testimonial.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{ ...testimonial.position }}
          onClick={() => handleDotClick(testimonial)}
        >
          <div className="relative w-36 h-36 group">
            <span className="absolute inset-0 bg-primary/30 rounded-full animate-ping-slow group-hover:animate-ping"></span>
            <Image
              src={testimonial.image}
              alt={`Testimonial ${testimonial.id}`}
              fill
              className="object-cover rounded-full border-4 border-white shadow-lg"
              data-ai-hint="student photo"
            />
          </div>
        </button>
      ))}

      <AnimatePresence>
        {activeTestimonial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 p-4"
            onClick={handleClose}
          >
            <div className="relative bg-background rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
               <button onClick={handleClose} className="absolute top-2 right-2 z-10 p-1 bg-background/50 rounded-full hover:bg-background/80 transition-colors">
                    <X className="w-5 h-5 text-foreground" />
                    <span className="sr-only">إغلاق</span>
                </button>
              <Image
                src={activeTestimonial.reviewScreenshot}
                alt={`Review screenshot for testimonial ${activeTestimonial.id}`}
                width={500}
                height={300}
                className="object-contain max-w-full h-auto"
                data-ai-hint="review screenshot"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
