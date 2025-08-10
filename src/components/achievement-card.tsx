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
    <div className={cn("relative group w-[300px] h-[200px]", className)}>
        {/* Text Card */}
        <Card className={cn(
            "w-full h-full rounded-xl transition-all duration-300 transform overflow-hidden", // Added overflow-hidden
            "border-2 border-dashed border-primary bg-white/30 backdrop-blur-sm shadow-lg text-foreground p-0 flex flex-col justify-between" // Changed padding
        )}>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-primary">{student.name}</h3>
                <p className="text-sm text-muted-foreground">توجيهي {student.year}</p>
            </div>
            
            <div className="bg-primary text-primary-foreground p-4">
              <div className="flex justify-around text-center">
                  <div>
                      <p className="text-sm font-semibold text-primary-foreground/80">الفيزياء</p>
                      <p className="flex items-center justify-center gap-1 text-2xl font-bold text-primary-foreground">
                      <Award className="w-5 h-5 text-yellow-400" />
                      {student.physicsScore}
                      </p>
                  </div>
                  <div>
                      <p className="text-sm font-semibold text-primary-foreground/80">المعدل</p>
                      <p className="flex items-center justify-center gap-1 text-2xl font-bold text-primary-foreground">
                      <Percent className="w-5 h-5" />
                      {student.average}
                      </p>
                  </div>
              </div>
            </div>
        </Card>

        {/* Image that appears on hover */}
        <div className={cn(
            "absolute top-0 right-0 w-[200px] h-[300px] rounded-xl shadow-xl transition-all duration-500 ease-in-out",
            "opacity-0 scale-90 -translate-y-4 -z-10",
            "group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1/3 group-hover:-translate-x-[110%] group-hover:z-10"
        )}>
            <Image
            src={student.imageUrl}
            alt={student.name}
            fill
            className="object-contain rounded-xl"
            data-ai-hint={student.imageHint}
            />
        </div>
    </div>
  );
}
