'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Award, Percent } from 'lucide-react';

interface AchievementCardProps {
  student: {
    name: string;
    year: string;
    physicsScore: string;
    average: string;
    imageUrl: string;
    imageHint: string;
  };
  className?: string;
}

export function AchievementCard({ student, className }: AchievementCardProps) {
  return (
    <Card className={cn(
      "relative group overflow-hidden rounded-xl shadow-lg border-2 border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-2",
      "border-dashed", // Added for the dashed border effect
      className
    )}>
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={student.imageUrl}
          alt={student.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={student.imageHint}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="relative flex flex-col justify-end h-80 p-6 text-white">
        <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-20">
            <h3 className="text-2xl font-bold">{student.name}</h3>
            <p className="text-sm text-white/80">توجيهي {student.year}</p>
        </div>
        
        <div className="achievement-card-scores absolute bottom-0 left-0 w-full p-6 bg-primary/80 backdrop-blur-sm">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-sm font-semibold text-primary-foreground/80">الفيزياء</p>
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-white">
                <Award className="w-5 h-5 text-yellow-300" />
                {student.physicsScore}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-foreground/80">المعدل</p>
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-white">
                <Percent className="w-5 h-5" />
                {student.average}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
