
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

interface CourseCardProps {
  course: {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    imageHint: string;
    curriculum?: string;
    link?: string;
    detailsLink?: string;
  };
  className?: string;
}

export function CourseCard({ course, className }: CourseCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  const handleCardClick = () => {
    if (isMobile) {
        // On mobile, clicking the card should navigate, not flip.
        const path = course.detailsLink || course.link || '#';
        // This programmatic navigation would require useRouter, but a Link wrapper is simpler.
        // For now, we will let the Link components handle navigation.
    } else {
       setIsFlipped(!isFlipped);
    }
  };


  const curriculumColorMap: { [key: string]: string } = {
    'الأردن': 'bg-red-600',
    'فلسطين': 'bg-green-600',
    'قطر': 'bg-yellow-600',
  };

  const curriculumColor = course.curriculum ? curriculumColorMap[course.curriculum] || 'bg-gray-500' : 'bg-gray-500';


  if (isMobile) {
    // --- Mobile View: A simple, non-flipping card ---
    return (
        <Card className={cn("w-full max-w-sm flex flex-col overflow-hidden rounded-lg shadow-lg border-2 border-primary bg-white/30 backdrop-blur-sm", className)}>
            <Link href={course.detailsLink || course.link || '#'} className="block">
                {course.curriculum && (
                  <div className={cn(
                    "absolute top-2 -right-11 transform rotate-45 text-white text-xs font-bold text-center z-10 w-40 py-1",
                    curriculumColor
                  )}>
                    {course.curriculum}
                  </div>
                )}
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
                     <CardContent className="p-0 mt-2 flex-1">
                        <p className="text-sm text-muted-foreground">
                            {course.description}
                        </p>
                    </CardContent>
                    <CardFooter className="p-0 pt-4 flex justify-between items-center">
                       <p className="text-xl font-bold text-foreground">{course.price}</p>
                       <Button variant="ghost" size="sm" asChild>
                           <span>
                               تفاصيل <ArrowLeft className="w-4 h-4 ms-2" />
                           </span>
                       </Button>
                    </CardFooter>
                </div>
            </Link>
        </Card>
    );
  }


  // --- Desktop View: The original flipping card ---
  return (
      <div
        className={cn("w-full max-w-sm h-96 perspective-1000 group", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <div
          className={cn(
            "relative w-full h-full transform-style-preserve-3d transition-transform duration-700",
            isFlipped ? "rotate-y-180" : ""
          )}
        >
          {/* Front of the card */}
            <Card className="absolute w-full h-full backface-visibility-hidden flex flex-col overflow-hidden rounded-lg shadow-lg border-2 border-primary bg-white/30 backdrop-blur-sm">
                {course.curriculum && (
                  <div className={cn(
                    "absolute top-2 -right-11 transform rotate-45 text-white text-xs font-bold text-center z-10 w-40 py-1",
                    curriculumColor
                  )}>
                    {course.curriculum}
                  </div>
                )}
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
                       <Button variant="ghost" size="sm">
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
                    <Link href={course.detailsLink || course.link || '#'} onClick={(e) => e.stopPropagation()}>
                        <Button variant="secondary" size="sm">
                            <ShoppingCart className="h-4 w-4 me-2" />
                            تفاصيل الدورة
                        </Button>
                    </Link>
              </CardFooter>
            </Card>
        </div>
      </div>
  );
}
