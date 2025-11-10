
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

function WatermarkedVideoPlayer({ src }: { src: string }) {
  const currentUser = useStore((s) => s.currentUser);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle escape key to exit custom fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Effect for idle cursor in fullscreen
  useEffect(() => {
    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (isFullscreen) {
            idleTimer.current = setTimeout(() => {
                setIsIdle(true);
            }, 2000); // Become idle after 2 seconds
        }
    };
    
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('touchstart', resetIdleTimer);


    return () => {
      document.removeEventListener('mousemove', resetIdleTimer);
      document.removeEventListener('touchstart', resetIdleTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isFullscreen]);


  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!src) {
    return (
        <Card className="aspect-video w-full flex items-center justify-center bg-muted">
            <CardContent className="text-center p-4">
                <p className="text-muted-foreground">سيتم إضافة الفيديو قريبًا.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <div 
        className={cn(
            "relative w-full rounded-lg overflow-hidden shadow-lg bg-black group",
            isFullscreen 
                ? "fixed inset-0 z-50 !rounded-none" 
                : "aspect-[4/3]"
        )}
    >
      <iframe
        src={src}
        className="absolute top-0 left-0 w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={false} // Disable native iframe fullscreen
      ></iframe>

      {/* Smart Protection Overlay */}
      <div 
        className="absolute inset-x-0 top-0 bottom-[230px] z-10" // Increased bottom margin
        onClick={() => {
            // Captures clicks/taps to prevent iframe interaction
        }}
        onDoubleClick={handleFullscreenToggle} // Allow double-click on overlay to toggle fullscreen
        aria-hidden="true"
      />

      {currentUser && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none animate-float z-20"
        >
          <span className="text-white font-bold select-none transform-gpu" style={{ opacity: 0.07, fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
            {currentUser.username}
          </span>
        </div>
      )}
       <div className={cn(
           "absolute z-30 transition-opacity duration-300",
           isFullscreen ? "top-4 right-4" : "top-2 right-2", // Adjusted position for normal view
           (isIdle && isFullscreen) ? "opacity-0" : "opacity-0 group-hover:opacity-100" // Hide unless hovering
        )}>
            <Button 
                onClick={handleFullscreenToggle} 
                variant="secondary" 
                size="icon" 
                aria-label={isFullscreen ? "الخروج من وضع ملء الشاشة" : "عرض ملء الشاشة"}
                className="w-8 h-8"
            >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
        </div>
    </div>
  );
}

export default WatermarkedVideoPlayer;
