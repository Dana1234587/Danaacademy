
"use client";

import { useState, useEffect } from 'react';
import { 
    AiOutlineApi, 
    AiOutlineExperiment, 
    AiOutlineRocket, 
    AiOutlineBulb,
    AiOutlineGlobal,
    AiOutlineThunderbolt,
    AiOutlineFork,
    AiOutlineBarChart
} from 'react-icons/ai';
import { cn } from '@/lib/utils';

const icons = [
  { component: AiOutlineApi, className: "top-[10%] left-[5%] w-16 h-16", "data-depth": 0.2 },
  { component: AiOutlineRocket, className: "top-[20%] right-[10%] w-20 h-20", "data-depth": 0.4 },
  { component: AiOutlineFork, className: "bottom-[15%] left-[15%] w-24 h-24", "data-depth": 0.6 },
  { component: AiOutlineBulb, className: "top-[60%] left-[30%] w-12 h-12", "data-depth": 0.3 },
  { component: AiOutlineBarChart, className: "bottom-[10%] right-[25%] w-16 h-16", "data-depth": 0.5 },
  { component: AiOutlineGlobal, className: "top-[40%] right-[40%] w-14 h-14", "data-depth": 0.25 },
  { component: AiOutlineThunderbolt, className: "bottom-[5%] right-[5%] w-16 h-16", "data-depth": 0.35 },
  { component: AiOutlineRocket, className: "bottom-[20%] left-[10%] w-20 h-20", "data-depth": 0.15 },
  { component: AiOutlineExperiment, className: "top-[15%] right-[15%] w-24 h-24", "data-depth": 0.55 },
];

const Icon = ({ component: Component, className, style, "data-depth": dataDepth }: { component: React.ElementType, className?: string, style?: React.CSSProperties, "data-depth": number }) => (
  <div
    className={cn("absolute text-primary/10 transition-transform duration-300 ease-out", className)}
    style={style}
    data-depth={dataDepth}
  >
    <Component className="w-full h-full" />
  </div>
);

export function FloatingIcons() {
  const [isMounted, setIsMounted] = useState(false);
  const [transforms, setTransforms] = useState(icons.map(() => ''));

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const newTransforms = icons.map(icon => {
        const depth = icon['data-depth'];
        const moveX = (clientX - window.innerWidth / 2) * depth / 25;
        const moveY = (clientY - window.innerHeight / 2) * depth / 25;
        return `translate(${moveX}px, ${moveY}px)`;
      });
      setTransforms(newTransforms);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0">
      {icons.map((icon, index) => (
        <Icon
          key={index}
          component={icon.component}
          className={cn(icon.className)}
          style={{ transform: transforms[index] }}
          data-depth={icon['data-depth']}
        />
      ))}
    </div>
  );
}
