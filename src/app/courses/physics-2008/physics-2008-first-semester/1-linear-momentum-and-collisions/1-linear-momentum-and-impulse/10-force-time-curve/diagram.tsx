
import React from 'react';

export const Diagram1 = () => (
  <div className="my-4 p-4 bg-gray-100 rounded-lg flex justify-center items-center">
    <svg width="300" height="200" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="30" y1="200" x2="330" y2="200" stroke="black" strokeWidth="2" /> {/* X-axis */}
      <line x1="30" y1="200" x2="30" y2="20" stroke="black" strokeWidth="2" /> {/* Y-axis */}
      
      {/* X-axis label */}
      <text x="340" y="215" textAnchor="middle" fontSize="14">t (s)</text>
      
      {/* Y-axis label */}
      <text x="15" y="25" textAnchor="middle" fontSize="14">F (N)</text>

      {/* Ticks and labels on X-axis */}
      <text x="30" y="215" textAnchor="middle">0</text>
      <line x1="180" y1="195" x2="180" y2="205" stroke="black" strokeWidth="1" />
      <text x="180" y="215" textAnchor="middle">2</text>
      <line x1="330" y1="195" x2="330" y2="205" stroke="black" strokeWidth="1" />
      <text x="330" y="215" textAnchor="middle">4</text>
      
      {/* Ticks and labels on Y-axis */}
      <line x1="25" y1="40" x2="35" y2="40" stroke="black" strokeWidth="1" />
      <text x="15" y="45" textAnchor="end">40</text>

      {/* Graph line */}
      <path d="M 30 200 L 330 40" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      
      {/* Area shading for impulse calculation */}
      <polygon points="30,200 330,40 330,200" fill="hsl(var(--primary))" fillOpacity="0.2" />
    </svg>
  </div>
);


export const Diagram2 = () => (
    <div className="my-4 p-4 bg-gray-100 rounded-lg flex justify-center items-center">
      <svg width="300" height="200" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg">
        {/* Axes */}
        <line x1="30" y1="200" x2="330" y2="200" stroke="black" strokeWidth="2" /> {/* X-axis */}
        <line x1="30" y1="200" x2="30" y2="20" stroke="black" strokeWidth="2" /> {/* Y-axis */}
        
        {/* X-axis label */}
        <text x="340" y="215" textAnchor="middle" fontSize="14">t (s)</text>
        
        {/* Y-axis label */}
        <text x="15" y="25" textAnchor="middle" fontSize="14">F (N)</text>
  
        {/* Ticks and labels on X-axis */}
        <text x="30" y="215" textAnchor="middle">0</text>
        <line x1="90" y1="195" x2="90" y2="205" stroke="black" strokeWidth="1" />
        <text x="90" y="215" textAnchor="middle">1</text>
        <line x1="270" y1="195" x2="270" y2="205" stroke="black" strokeWidth="1" />
        <text x="270" y="215" textAnchor="middle">4</text>
        <line x1="330" y1="195" x2="330" y2="205" stroke="black" strokeWidth="1" />
        <text x="330" y="215" textAnchor="middle">5</text>
        
        {/* Ticks and labels on Y-axis */}
        <line x1="25" y1="80" x2="35" y2="80" stroke="black" strokeWidth="1" />
        <text x="15" y="85" textAnchor="end">15</text>
  
        {/* Graph line */}
        <path d="M 30 200 L 90 80 L 270 80 L 330 200" stroke="hsl(var(--primary))" strokeWidth="3" fill="hsl(var(--primary))" fillOpacity="0.2" />
      </svg>
    </div>
  );
