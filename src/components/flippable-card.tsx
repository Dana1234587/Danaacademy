
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// SVG Icon Components
const EverydayIcon = ({ color = "hsl(var(--primary))" }: { color?: string }) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58Z" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 32C22 26.4772 26.4772 22 32 22C37.5228 22 42 26.4772 42 32C42 37.5228 37.5228 42 32 42" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M51.999 26.668C48.349 20.738 43.149 16.038 37.339 12.668" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.001 37.332C15.651 43.262 20.851 47.962 26.661 51.332" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26.661 12.668C20.851 16.038 15.651 20.738 12.001 26.668" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M37.339 51.332C43.149 47.962 48.349 43.262 51.999 37.332" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SimulationIcon = ({ color = "hsl(var(--primary))" }: { color?: string }) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 14H14V50H50V14Z" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38 6H26" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M58 26V38" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38 58H26" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 26V38" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 22L22 42" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 22L42 42" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AIIcon = ({ color = "hsl(var(--primary))" }: { color?: string }) => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 22L22 42" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 22L42 42" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M46 6H18C11.3726 6 6 11.3726 6 18V46C6 52.6274 11.3726 58 18 58H46C52.6274 58 58 52.6274 58 46V18C58 11.3726 52.6274 6 46 6Z" stroke={color} strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const icons: { [key: string]: React.ReactNode } = {
  everyday: <EverydayIcon color="#4f46e5" />, // Indigo
  simulation: <SimulationIcon color="#14b8a6" />, // Teal
  ai: <AIIcon color="#f97316" />, // Golden Orange
};


interface FlippableCardProps {
  cardId: string;
  frontContent: {
    title: string;
  };
  backContent: {
    description: string;
  };
  className?: string;
}

export function FlippableCard({ cardId, frontContent, backContent, className }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };
  
  const icon = icons[cardId];

  return (
    <div
      className={cn("w-full h-52 perspective-1000 group", className)}
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
        <Card className="absolute w-full h-full backface-visibility-hidden flex flex-col items-center justify-center text-center p-6">
          <div className="mb-4 p-4 bg-accent rounded-full transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{frontContent.title}</h3>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-visibility-hidden rotate-y-180 flex items-center justify-center text-center p-6 bg-card/60 backdrop-blur-sm">
          <p className="text-muted-foreground transition-opacity duration-500 delay-200 opacity-0 group-hover:opacity-100">
            {backContent.description}
          </p>
        </Card>
      </div>
    </div>
  );
}
