
"use client";

import { useState, useEffect } from 'react';
import { Atom, Rocket, GitBranch, Lightbulb, Sigma, Orbit, Waves, Magnet } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { component: Atom, className: "top-[10%] left-[5%] w-16 h-16", duration: '8s', "data-depth": 0.2 },
  { component: Rocket, className: "top-[20%] right-[10%] w-20 h-20", duration: '10s', "data-depth": 0.4 },
  { component: GitBranch, className: "bottom-[15%] left-[15%] w-24 h-24", duration: '12s', "data-depth": 0.6 },
  { component: Lightbulb, className: "top-[60%] left-[30%] w-12 h-12", duration: '7s', "data-depth": 0.3 },
  { component: Sigma, className: "bottom-[10%] right-[25%] w-16 h-16", duration: '9s', "data-depth": 0.5 },
  { component: Orbit, className: "top-[40%] right-[40%] w-14 h-14", duration: '11s', "data-depth": 0.25 },
  { component: Waves, className: "bottom-[5%] right-[5%] w-16 h-16", duration: '8s', "data-depth": 0.35 },
  { component: Rocket, className: "bottom-[20%] left-[10%] w-20 h-20", duration: '10s', "data-depth": 0.15 },
  { component: Magnet, className: "top-[15%] right-[15%] w-24 h-24", duration: '12s', "data-depth": 0.55 },
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (event: MouseEvent) => {
      // Ensure we're on the client side
      if (typeof window !== 'undefined') {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateTransform = (depth: number) => {
    if (!isMounted || typeof window === 'undefined') return {};
    const moveX = (mousePosition.x - window.innerWidth / 2) * depth / 20;
    const moveY = (mousePosition.y - window.innerHeight / 2) * depth / 20;
    return { transform: `translate(${moveX}px, ${moveY}px)` };
  };

  if (!isMounted) {
    // Render a static version on the server and initial client render
    // to avoid hydration mismatch. The animation will be applied on the client.
    return (
        <div className="absolute inset-0 z-0">
        {icons.map((icon, index) => (
            <Icon
              key={index}
              component={icon.component}
              className={cn(icon.className, 'animate-float')}
              style={{ 
                  animationDuration: icon.duration,
              }}
              data-depth={icon['data-depth']}
            />
        ))}
        </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      {icons.map((icon, index) => (
        <Icon
          key={index}
          component={icon.component}
          className={cn(icon.className, 'animate-float')}
          style={{ 
            animationDuration: icon.duration, 
            ...calculateTransform(icon['data-depth'])
          }}
          data-depth={icon['data-depth']}
        />
      ))}
    </div>
  );
}
