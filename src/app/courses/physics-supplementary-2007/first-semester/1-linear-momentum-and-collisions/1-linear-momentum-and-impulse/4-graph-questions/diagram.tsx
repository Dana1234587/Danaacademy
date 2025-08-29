
import React from 'react';

export const ForceTimeGraph = () => (
  <div className="my-4 p-4 bg-gray-100 rounded-lg flex justify-center items-center">
    <svg width="300" height="200" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="30" y1="200" x2="330" y2="200" stroke="black" strokeWidth="2" /> {/* X-axis */}
      <line x1="30" y1="200" x2="30" y2="20" stroke="black" strokeWidth="2" /> {/* Y-axis */}
      
      {/* X-axis label */}
      <text x="335" y="205" textAnchor="start" fontSize="14">t (s)</text>
      
      {/* Y-axis label */}
      <text x="25" y="15" textAnchor="end" fontSize="14">F (N)</text>

      {/* Ticks and labels on X-axis */}
      <text x="30" y="215" textAnchor="middle">0</text>
      <line x1="105" y1="195" x2="105" y2="205" stroke="black" strokeWidth="1" />
      <text x="105" y="215" textAnchor="middle">1</text>
      <line x1="180" y1="195" x2="180" y2="205" stroke="black" strokeWidth="1" />
      <text x="180" y="215" textAnchor="middle">2</text>
      <line x1="255" y1="195" x2="255" y2="205" stroke="black" strokeWidth="1" />
      <text x="255" y="215" textAnchor="middle">3</text>
      <line x1="330" y1="195" x2="330" y2="205" stroke="black" strokeWidth="1" />
      <text x="330" y="215" textAnchor="middle">4</text>
      
      {/* Ticks and labels on Y-axis */}
      <line x1="25" y1="120" x2="35" y2="120" stroke="black" strokeWidth="1" />
      <text x="20" y="125" textAnchor="end">5</text>
      <line x1="25" y1="40" x2="35" y2="40" stroke="black" strokeWidth="1" />
      <text x="20" y="45" textAnchor="end">10</text>

      {/* Graph line */}
      <path d="M 30 200 L 330 40" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      
      {/* Area shading for impulse calculation */}
      <polygon points="30,200 330,40 330,200" fill="hsl(var(--primary))" fillOpacity="0.2" />
    </svg>
  </div>
);
