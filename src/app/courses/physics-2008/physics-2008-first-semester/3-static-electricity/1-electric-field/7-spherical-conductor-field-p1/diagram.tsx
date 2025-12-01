
'use client';

import React from 'react';

export const ElectricFieldGraph = () => (
  <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex justify-center items-center">
    <svg width="300" height="200" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="30" y1="180" x2="310" y2="180" stroke="currentColor" strokeWidth="2" /> {/* X-axis (r) */}
      <line x1="30" y1="180" x2="30" y2="10" stroke="currentColor" strokeWidth="2" /> {/* Y-axis (E) */}
      
      {/* Labels */}
      <text x="300" y="195" textAnchor="middle" fontSize="14" fill="currentColor">r (البعد)</text>
      <text x="20" y="20" textAnchor="middle" transform="rotate(-90 20,100)" fontSize="14" fill="currentColor">E (المجال)</text>

      {/* Origin */}
      <text x="30" y="195" textAnchor="middle" fontSize="12" fill="currentColor">0</text>

      {/* Radius R tick */}
      <line x1="120" y1="175" x2="120" y2="185" stroke="currentColor" strokeWidth="1" />
      <text x="120" y="195" textAnchor="middle" fontSize="14" fill="hsl(var(--primary))">R</text>
      
      {/* E_max tick */}
      <line x1="25" y1="40" x2="35" y2="40" stroke="currentColor" strokeWidth="1" />
      <text x="20" y="45" textAnchor="end" fontSize="12" fill="hsl(var(--primary))">E_max</text>
      
      {/* Graph line */}
      {/* E=0 inside sphere */}
      <line x1="30" y1="180" x2="120" y2="180" stroke="hsl(var(--primary))" strokeWidth="3" />
      {/* Jump to E_max at R */}
      <line x1="120" y1="180" x2="120" y2="40" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="2,2" />
      <circle cx="120" cy="40" r="3" fill="hsl(var(--primary))" />
      
      {/* E decreases outside */}
      <path d="M 120 40 Q 180 30, 300 15" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
    </svg>
  </div>
);
