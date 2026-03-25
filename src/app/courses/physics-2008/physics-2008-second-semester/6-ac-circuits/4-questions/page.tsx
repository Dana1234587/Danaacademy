import React from 'react';
import WatermarkedVideoPlayer from '@/components/video-player/WatermarkedVideoPlayer';

export default function Page() {
  return (
    <div className="p-4">
      <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/297d9745-09e7-49fb-92f2-194ca54c6e07/playlist.m3u8" />
    </div>
  );
}
