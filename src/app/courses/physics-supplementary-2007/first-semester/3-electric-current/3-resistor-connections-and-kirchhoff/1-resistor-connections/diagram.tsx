
'use client';

import React from 'react';

const Resistor = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M 0 10 L 5 10 L 10 0 L 20 20 L 30 0 L 40 20 L 45 10 L 50 10" stroke="black" strokeWidth="1.5" fill="none" />
    <text x="25" y="-5" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

export const ResistorsInSeries = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="300" height="80" viewBox="0 0 300 80">
      <line x1="10" y1="40" x2="40" y2="40" stroke="black" strokeWidth="1.5" />
      <Resistor x={40} y={30} label="R1" />
      <Resistor x={120} y={30} label="R2" />
      <Resistor x={200} y={30} label="R3" />
      <line x1="250" y1="40" x2="280" y2="40" stroke="black" strokeWidth="1.5" />
    </svg>
  </div>
);

export const ResistorsInParallel = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="200" height="180" viewBox="0 0 200 180">
      <line x1="10" y1="90" x2="50" y2="90" stroke="black" strokeWidth="1.5" />
      <line x1="150" y1="90" x2="190" y2="90" stroke="black" strokeWidth="1.5" />
      
      {/* Top Branch */}
      <line x1="50" y1="90" x2="50" y2="30" stroke="black" strokeWidth="1.5" />
      <line x1="50" y1="30" x2="70" y2="30" stroke="black" strokeWidth="1.5" />
      <Resistor x={70} y={20} label="R1" />
      <line x1="120" y1="30" x2="150" y2="30" stroke="black" strokeWidth="1.5" />
      <line x1="150" y1="30" x2="150" y2="90" stroke="black" strokeWidth="1.5" />

      {/* Middle Branch */}
      <line x1="50" y1="90" x2="70" y2="90" stroke="black" strokeWidth="1.5" />
      <Resistor x={70} y={80} label="R2" />
      <line x1="120" y1="90" x2="150" y2="90" stroke="black" strokeWidth="1.5" />

      {/* Bottom Branch */}
      <line x1="50" y1="90" x2="50" y2="150" stroke="black" strokeWidth="1.5" />
      <line x1="50" y1="150" x2="70" y2="150" stroke="black" strokeWidth="1.5" />
      <Resistor x={70} y={140} label="R3" />
      <line x1="120" y1="150" x2="150" y2="150" stroke="black" strokeWidth="1.5" />
      <line x1="150" y1="150" x2="150" y2="90" stroke="black" strokeWidth="1.5" />
    </svg>
  </div>
);
