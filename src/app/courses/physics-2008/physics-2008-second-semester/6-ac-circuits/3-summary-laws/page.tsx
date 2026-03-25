import React from 'react';
import WatermarkedVideoPlayer from '@/components/video-player/WatermarkedVideoPlayer';

export default function Page() {
  return (
    <div className="p-4">
      <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/d216ca8f-50a4-42f5-884f-fc438450781a/playlist.m3u8" />
    </div>
  );
}
