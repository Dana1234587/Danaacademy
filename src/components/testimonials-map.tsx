
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';


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

  const handleDotClick = (testimonial: Testimonial) => {
    setActiveTestimonial(testimonial);
  };

  const handleClose = () => {
    setActiveTestimonial(null);
  };
  
  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] bg-background rounded-lg overflow-auto"
    >
        <div className="relative w-[800px] h-full md:w-full">
          {testimonials.map((testimonial) => (
            <button
              key={testimonial.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ ...testimonial.position }}
              onClick={() => handleDotClick(testimonial)}
            >
              <div className="relative w-24 h-24 md:w-36 md:h-36 group">
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
        </div>

      <AnimatePresence>
        {activeTestimonial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 p-4"
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
                className="object-contain max-w-full h-auto max-h-[80vh]"
                data-ai-hint="review screenshot"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

