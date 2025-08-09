"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FlippableCardProps {
  cardId: string;
  frontContent: {
    title: string;
    imageUrl: string;
    imageHint: string;
  };
  backContent: {
    description: string;
  };
  className?: string;
}

export function FlippableCard({ cardId, frontContent, backContent, className }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  return (
    <div
      className={cn("w-full h-64 perspective-1000 group", className)}
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
        <Card className="absolute w-full h-full backface-visibility-hidden flex flex-col items-center justify-center text-center p-6 bg-white shadow-xl border-2 border-dashed border-primary">
          <div className="mb-4 relative w-24 h-24 rounded-full overflow-hidden">
            <Image
                src={frontContent.imageUrl}
                alt={frontContent.title}
                width={100}
                height={100}
                className="object-cover"
                data-ai-hint={frontContent.imageHint}
            />
          </div>
          <h3 className="text-xl font-bold text-primary">{frontContent.title}</h3>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-visibility-hidden rotate-y-180 flex items-center justify-center text-center p-6 bg-primary shadow-xl">
          <p className="text-primary-foreground">
            {backContent.description}
          </p>
        </Card>
      </div>
    </div>
  );
}
