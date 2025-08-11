
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
  const [hovered, setHovered] = useState<Testimonial | null>(null);

  return (
    <div className="relative w-full min-h-[500px] md:h-[600px] rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Left side for the review card */}
        <div className="md:col-span-1 flex items-center justify-center p-4">
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm"
              >
                <Card className="bg-background/80 backdrop-blur-sm shadow-2xl border-primary">
                  <CardHeader>
                    <CardTitle className="text-center">{hovered.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[3/2] w-full rounded-md overflow-hidden">
                      <Image
                        src={hovered.reviewScreenshot}
                        alt={`Review from ${hovered.name}`}
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
        </div>

        {/* Right side for scattered images */}
        <div className="relative md:col-span-2 min-h-[400px] md:min-h-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHovered(testimonial)}
              onMouseLeave={() => setHovered(null)}
              className="absolute z-10"
              style={{ ...testimonial.position }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, zIndex: 20 }}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg cursor-pointer overflow-hidden border-2 border-primary/50 hover:border-primary transition-all duration-300">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="student photo"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
