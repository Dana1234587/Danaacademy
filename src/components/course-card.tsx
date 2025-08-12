
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    imageHint: string;
  };
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  return (
    <div
      className={cn("w-full max-w-sm h-96 perspective-1000 group", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          "relative w-full h-full transform-style-preserve-3d transition-transform duration-700",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full backface-visibility-hidden flex flex-col overflow-hidden rounded-lg shadow-lg border-2 border-primary bg-white/30 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden">
                <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
                data-ai-hint={course.imageHint}
                />
            </div>
            <div className="flex flex-1 flex-col p-4 justify-between">
                <CardHeader className="p-0">
                <CardTitle className="text-lg font-bold text-primary leading-tight h-14">
                    {course.title}
                </CardTitle>
                </CardHeader>
                <CardFooter className="p-0 flex justify-between items-center">
                   <p className="text-xl font-bold text-foreground">{course.price}</p>
                   <Button variant="ghost" size="sm" className="pointer-events-none">
                      تفاصيل
                   </Button>
                </CardFooter>
            </div>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-visibility-hidden rotate-y-180 flex flex-col p-6 bg-primary text-primary-foreground shadow-xl rounded-lg justify-between">
            <CardHeader className="p-0">
                <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2 flex-1">
                <p className="text-sm">
                    {course.description}
                </p>
            </CardContent>
            <CardFooter className="p-0 mt-4 flex justify-between items-center">
                <p className="text-xl font-bold">{course.price}</p>
                <Button variant="secondary" size="sm">
                    <ShoppingCart className="h-4 w-4 me-2" />
                    أضف للسلة
                </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
