
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type Testimonial = {
  name: string;
  title: string;
  image: string;
  review: string;
  position: { top: string; left: string };
};

interface TestimonialsMapProps {
  testimonials: Testimonial[];
}

export function TestimonialsMap({ testimonials }: TestimonialsMapProps) {
  const [selected, setSelected] = useState<Testimonial | null>(null);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      {/* Background Map Image */}
      <Image
        src="https://i.ibb.co/3mPqb2d/Untitled-design-23.png"
        alt="World Map"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
      />

      {/* Student Avatars */}
      {testimonials.map((testimonial, index) => (
        <motion.button
          key={index}
          onClick={() => setSelected(testimonial)}
          className="absolute z-10 rounded-full"
          style={{
            top: testimonial.position.top,
            left: testimonial.position.left,
            transform: 'translate(-50%, -50%)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className={cn(
            "w-20 h-20 border-4 transition-all duration-300",
            selected?.name === testimonial.name ? "border-primary" : "border-primary/50 hover:border-primary"
            )}>
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
           <p className="text-center mt-2 font-semibold text-sm text-foreground">{testimonial.name}</p>
        </motion.button>
      ))}

      {/* Selected Testimonial Card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-[350px] bg-background/80 backdrop-blur-sm shadow-2xl border-primary">
              <CardHeader>
                <CardTitle className="text-center">{selected.name}</CardTitle>
                 <p className="text-center text-sm text-muted-foreground">{selected.title}</p>
              </CardHeader>
              <CardContent>
                <p className="text-center italic">"{selected.review}"</p>
                 <button
                    onClick={() => setSelected(null)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
                 >
                    &times;
                 </button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
       {/* Overlay when a testimonial is selected */}
        <AnimatePresence>
            {selected && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-black/30"
                onClick={() => setSelected(null)}
            />
            )}
      </AnimatePresence>

    </div>
  );
}
