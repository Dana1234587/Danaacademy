
'use client';

import React from 'react';

export const TwoForcesDiagram = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="100" viewBox="0 0 250 100">
      <rect x="75" y="30" width="100" height="40" fill="hsl(var(--primary-foreground))" stroke="black" strokeWidth="2" />
      
      {/* Force 1 (Right) */}
      <line x1="175" y1="50" x2="225" y2="50" stroke="hsl(var(--primary))" strokeWidth="2" />
      <polygon points="225,45 235,50 225,55" fill="hsl(var(--primary))" />
      <text x="200" y="45" textAnchor="middle" fontSize="12">10 N</text>

      {/* Force 2 (Left) */}
      <line x1="75" y1="50" x2="25" y2="50" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <polygon points="25,45 15,50 25,55" fill="hsl(var(--destructive))" />
      <text x="50" y="45" textAnchor="middle" fontSize="12">4 N</text>
    </svg>
  </div>
);
