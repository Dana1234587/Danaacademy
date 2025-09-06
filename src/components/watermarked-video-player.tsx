
'use client';

import React, { useRef } from 'react';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';

function WatermarkedVideoPlayer({ src }: { src: string }) {
  const { currentUser } = useStore();
  const containerRef = useRef<HTMLDivElement>(null); 

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full rounded-lg overflow-hidden shadow-lg bg-black" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        className="absolute top-0 left-0 w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>
      {currentUser && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none animate-float"
        >
          <span className="text-white font-bold select-none transform-gpu" style={{ opacity: 0.05, fontSize: 'clamp(1rem, 4vw, 2rem)' }}>
            {currentUser.username}
          </span>
        </div>
      )}
       <div className="absolute bottom-2 right-2 z-10">
            <Button onClick={handleFullscreen} variant="secondary" size="icon" aria-label="توسيع الشاشة" className="w-8 h-8 opacity-70 hover:opacity-100">
                <Maximize className="w-4 h-4" />
            </Button>
        </div>
    </div>
  );
}

export default WatermarkedVideoPlayer;
