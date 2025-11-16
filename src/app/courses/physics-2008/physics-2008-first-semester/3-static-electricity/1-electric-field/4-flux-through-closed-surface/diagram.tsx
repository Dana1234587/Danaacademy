
'use client';
import React from 'react';

export const CylinderInField = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="150" viewBox="0 0 250 150">
      {/* Electric Field Lines */}
      {[...Array(5)].map((_, i) => (
        <line key={i} x1="10" y1={30 + i * 20} x2="240" y2={30 + i * 20} stroke="hsl(var(--primary))" strokeWidth="1" />
      ))}
      <polygon points="235,25 245,30 235,35" fill="hsl(var(--primary))" />
      <text x="230" y="20" fontSize="12" fill="hsl(var(--primary))">E</text>

      {/* Cylinder */}
      <ellipse cx="180" cy="80" rx="30" ry="50" stroke="black" strokeWidth="1.5" fill="none" fillOpacity="0.1" />
      <ellipse cx="70" cy="80" rx="30" ry="50" stroke="black" strokeWidth="1.5" fill="hsl(var(--primary-foreground))" fillOpacity="0.5" />
      <line x1="70" y1="30" x2="180" y2="30" stroke="black" strokeWidth="1.5" />
      <line x1="70" y1="130" x2="180" y2="130" stroke="black" strokeWidth="1.5" />
    </svg>
  </div>
);

export const PrismInField = () => (
     <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="0 0 250 150">
            {/* Electric Field Lines */}
            {[...Array(7)].map((_, i) => (
                <line key={i} x1={10 + i*35} y1="10" x2={10 + i*35} y2="140" stroke="hsl(var(--primary))" strokeWidth="1" />
            ))}
            <polygon points="5,135 10,145 15,135" fill="hsl(var(--primary))" />
            <text x="20" y="135" fontSize="12" fill="hsl(var(--primary))">E</text>
            
            {/* Prism */}
            <polygon points="50,50 200,50 125,120" stroke="black" fill="hsl(var(--primary-foreground))" strokeWidth="1.5" fillOpacity="0.5" />
        </svg>
    </div>
);

export const HemisphereInField = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="200" height="150" viewBox="0 0 200 150">
            {/* Electric Field Lines */}
            {[...Array(5)].map((_, i) => (
                <line key={i} x1={20 + i*40} y1="10" x2={20 + i*40} y2="140" stroke="hsl(var(--primary))" strokeWidth="1" />
            ))}
            <polygon points="15,135 20,145 25,135" fill="hsl(var(--primary))" />
            <text x="30" y="135" fontSize="12" fill="hsl(var(--primary))">E</text>

            {/* Hemisphere */}
            <path d="M 50 100 A 50 50 0 0 1 150 100" stroke="black" fill="hsl(var(--primary-foreground))" fillOpacity="0.5" strokeWidth="1.5" />
            <line x1="50" y1="100" x2="150" y2="100" stroke="black" strokeWidth="1.5" />
        </svg>
    </div>
);

