import React from 'react';
import WatermarkedVideoPlayer from '@/components/video-player/WatermarkedVideoPlayer';

export default function Page() {
  return (
    <div className="p-4">
      <WatermarkedVideoPlayer src="https://example.com/ac-circuits-session1.m3u8" />
    </div>
  );
}
