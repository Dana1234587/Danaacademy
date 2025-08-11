'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

type Position = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

type Testimonial = {
  name: string;
  image: string;
  reviewScreenshot: string;
  position: Position;
};

interface TestimonialsMapProps {
  testimonials: Testimonial[];
}

export function TestimonialsMap({ testimonials }: TestimonialsMapProps) {
  return (
    <div className="relative w-full min-h-[600px] p-4">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="absolute group"
          style={{ ...testimonial.position }}
        >
          {/* Student Image */}
          <div className="relative w-[150px] h-[150px] cursor-pointer">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              data-ai-hint="student photo"
            />
            
            {/* Review Screenshot on Hover */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-[400%] h-[250%] -translate-x-1/4 -translate-y-1/4 z-10 pointer-events-none"
              >
                <Image
                  src={testimonial.reviewScreenshot}
                  alt={`${testimonial.name}'s review`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-2xl"
                  data-ai-hint="review screenshot"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}
