import React from 'react';
import WatermarkedVideoPlayer from '@/components/video-player/WatermarkedVideoPlayer';

export default function Page() {
  return (
    <div className="p-4">
      <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/4d2cdf72-6deb-4888-8fd4-6b5bc852a2ed/playlist.m3u8" />
    </div>
  );
}
