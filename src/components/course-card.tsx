
'use client';

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
  return (
    <Card className={cn("group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto", className)}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          data-ai-hint={course.imageHint}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold text-primary leading-tight h-14">
            {course.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-2 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="p-0 mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-foreground">{course.price}</p>
          <Button variant="outline" size="sm">
            <ShoppingCart className="h-4 w-4 me-2" />
            أضف للسلة
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
