
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

function WatermarkedVideoPlayer({ src }: { src: string }) {
  const { currentUser } = useStore();
  const containerRef = useRef<HTMLDivElement>(null); 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      if (!isCurrentlyFullscreen) {
         setIsIdle(false); // Reset idle state on exiting fullscreen
         if(idleTimer.current) clearTimeout(idleTimer.current);
      }
    };

    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        if (isFullscreen) {
            idleTimer.current = setTimeout(() => {
                setIsIdle(true);
            }, 1000); // Become idle after 1 second
        }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('mousemove', resetIdleTimer);


    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('mousemove', resetIdleTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isFullscreen]);


  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black group" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        className="absolute top-0 left-0 w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>

      {/* Smart Protection Overlay */}
      <div 
        className="absolute inset-x-0 top-0 bottom-[40px] z-10"
        onClick={() => {
            // This captures the click/double-click, preventing the iframe from handling it.
            // We can add play/pause logic here if needed in the future.
        }}
        aria-hidden="true"
      />

      {currentUser && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none animate-float z-20"
        >
          <span className="text-white font-bold select-none transform-gpu" style={{ opacity: 0.07, fontSize: 'clamp(1rem, 4vw, 2rem)' }}>
            {currentUser.username}
          </span>
        </div>
      )}
       <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30">
            <Button 
                onClick={handleFullscreen} 
                variant="secondary" 
                size="icon" 
                aria-label="توسيع الشاشة" 
                className={cn(
                    "w-8 h-8 transition-opacity duration-500",
                    isIdle ? "opacity-5" : "opacity-70 group-hover:opacity-100"
                )}
            >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
        </div>
    </div>
  );
}

export default WatermarkedVideoPlayer;

