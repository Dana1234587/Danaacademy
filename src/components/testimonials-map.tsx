
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);

  return (
    <div className="relative w-full min-h-[500px] md:h-[600px] rounded-lg overflow-hidden">
      {/* Container for scattered images */}
      <div className="relative w-full h-full">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setActiveTestimonial(testimonial)}
            onMouseLeave={() => setActiveTestimonial(null)}
            className="absolute z-10"
            style={{ ...testimonial.position }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                data-ai-hint="student photo"
              />
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_25px_3px_hsl(var(--primary)/0.6)] opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <AnimatePresence>
              {activeTestimonial === testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 w-80"
                  style={{ top: '50%', left: 'calc(100% + 1rem)' }}
                >
                  <Card className="bg-background/80 backdrop-blur-sm shadow-2xl border-primary">
                    <CardHeader>
                      <CardTitle className="text-center text-lg">{testimonial.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden">
                        <Image
                          src={testimonial.reviewScreenshot}
                          alt={`Review from ${testimonial.name}`}
                          layout="fill"
                          objectFit="contain"
                          data-ai-hint="screenshot review"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
