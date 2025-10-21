
'use client';

import React from 'react';

export const SteeringWheelDiagram = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Steering wheel */}
      <circle cx="100" cy="100" r="80" stroke="black" strokeWidth="2" fill="none" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="black" strokeWidth="1.5" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="black" strokeWidth="1.5" />
      
      {/* Diameter line */}
      <line x1="20" y1="140" x2="180" y2="140" stroke="black" strokeDasharray="3,3"/>
      <text x="100" y="155" textAnchor="middle" fontSize="12">قطر = 40 cm</text>
      
      {/* Top Force */}
      <line x1="100" y1="20" x2="150" y2="20" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <polygon points="150,15 160,20 150,25" fill="hsl(var(--primary))"/>
      <text x="125" y="15" textAnchor="middle" fontSize="12">20 N</text>

      {/* Bottom Force */}
      <line x1="100" y1="180" x2="50" y2="180" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <polygon points="50,175 40,180 50,185" fill="hsl(var(--primary))"/>
       <text x="75" y="175" textAnchor="middle" fontSize="12">20 N</text>
    </svg>
  </div>
);

export const RodWithForcesDiagram = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
     <svg width="300" height="150" viewBox="0 0 300 150">
      {/* Rod */}
      <rect x="50" y="70" width="200" height="10" fill="hsl(var(--secondary))" stroke="black"/>
       <text x="150" y="65" textAnchor="middle" fontSize="12">L</text>

      {/* Top Force at right end */}
      <g transform="translate(250, 75)">
        <g transform="rotate(-60)">
          <line x1="0" y1="0" x2="40" y2="0" stroke="hsl(var(--primary))" strokeWidth="2"/>
          <polygon points="40,-5 50,0 40,5" fill="hsl(var(--primary))"/>
          <text x="20" y="-8" textAnchor="middle" fontSize="12">F</text>
        </g>
      </g>
       {/* Dotted vertical line for angle */}
       <line x1="250" y1="75" x2="250" y2="30" stroke="black" strokeDasharray="2,2" />
       <text x="255" y="60" fontSize="10">30°</text>

      {/* Bottom Force at left end */}
       <g transform="translate(50, 75)">
        <g transform="rotate(120)">
           <line x1="0" y1="0" x2="40" y2="0" stroke="hsl(var(--primary))" strokeWidth="2"/>
          <polygon points="40,-5 50,0 40,5" fill="hsl(var(--primary))"/>
          <text x="20" y="-8" textAnchor="middle" fontSize="12">F</text>
        </g>
      </g>
       <line x1="50" y1="75" x2="50" y2="120" stroke="black" strokeDasharray="2,2" />
        <text x="45" y="95" textAnchor="end" fontSize="10">30°</text>
    </svg>
  </div>
);
