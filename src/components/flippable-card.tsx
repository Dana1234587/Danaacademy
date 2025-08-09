"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlippableCardProps {
  frontContent: {
    icon: React.ReactNode;
    title: string;
  };
  backContent: {
    description: string;
  };
  className?: string;
}

export function FlippableCard({ frontContent, backContent, className }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={cn("w-full h-52 perspective-1000 cursor-pointer", className)}
      onClick={handleCardClick}
    >
      <div
        className={cn(
          "relative w-full h-full transform-style-preserve-3d transition-transform duration-700",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full backface-visibility-hidden flex flex-col items-center justify-center text-center p-6">
          <div className="mb-4 p-4 bg-accent rounded-full">
            {frontContent.icon}
          </div>
          <h3 className="text-xl font-bold">{frontContent.title}</h3>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-visibility-hidden rotate-y-180 flex items-center justify-center text-center p-6">
          <p className="text-muted-foreground">
            {backContent.description}
          </p>
        </Card>
      </div>
    </div>
  );
}
