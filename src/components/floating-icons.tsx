
"use client";

import { useState, useEffect } from 'react';
import { Atom, Rocket, GitBranch, Lightbulb, Sigma, Orbit, Waves, Magnet } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { component: Atom, className: "top-[10%] left-[5%] w-16 h-16", "data-depth": 0.2 },
  { component: Rocket, className: "top-[20%] right-[10%] w-20 h-20", "data-depth": 0.4 },
  { component: GitBranch, className: "bottom-[15%] left-[15%] w-24 h-24", "data-depth": 0.6 },
  { component: Lightbulb, className: "top-[60%] left-[30%] w-12 h-12", "data-depth": 0.3 },
  { component: Sigma, className: "bottom-[10%] right-[25%] w-16 h-16", "data-depth": 0.5 },
  { component: Orbit, className: "top-[40%] right-[40%] w-14 h-14", "data-depth": 0.25 },
  { component: Waves, className: "bottom-[5%] right-[5%] w-16 h-16", "data-depth": 0.35 },
  { component: Rocket, className: "bottom-[20%] left-[10%] w-20 h-20", "data-depth": 0.15 },
  { component: Magnet, className: "top-[15%] right-[15%] w-24 h-24", "data-depth": 0.55 },
];

const Icon = ({ component: Component, className, "data-depth": dataDepth }: { component: React.ElementType, className?: string, "data-depth": number }) => (
  <div
    className={cn("absolute text-primary/10", className)}
    data-depth={dataDepth}
  >
    <Component className="w-full h-full" />
  </div>
);

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 z-0 hero-bg-fixed">
      {icons.map((icon, index) => (
        <Icon
          key={index}
          component={icon.component}
          className={cn(icon.className)}
          data-depth={icon['data-depth']}
        />
      ))}
    </div>
  );
}
