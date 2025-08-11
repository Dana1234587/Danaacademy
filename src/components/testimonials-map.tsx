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
    <div className="relative w-full p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="relative group flex flex-col items-center">
            {/* Student Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer">
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
                  className="absolute inset-0 w-full h-full"
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
            
            {/* Student Name */}
            <p className="mt-4 font-bold text-primary text-center">
              {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
