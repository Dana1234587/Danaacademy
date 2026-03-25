import React from 'react';

type Props = {
  src: string;
};

export default function WatermarkedVideoPlayer({ src }: Props) {
  return (
    <div className="relative pt-[56.25%]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        controls
        muted
        playsInline
      />
    </div>
  );
}
