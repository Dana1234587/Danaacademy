
'use client';

import React from 'react';

const Resistor = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M 0 10 L 10 10 L 15 0 L 25 20 L 35 0 L 45 20 L 50 10 L 60 10" stroke="black" strokeWidth="1.5" fill="none" />
    <text x="30" y="-5" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

export const ResistorsInSeries = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="300" height="80" viewBox="0 0 300 80">
      <line x1="10" y1="40" x2="30" y2="40" stroke="black" strokeWidth="1.5" />
      <Resistor x={30} y={30} label="R1" />
      <Resistor x={90} y={30} label="R2" />
      <Resistor x={150} y={30} label="R3" />
      <line x1="210" y1="40" x2="230" y2="40" stroke="black" strokeWidth="1.5" />
    </svg>
  </div>
);

export const ResistorsInParallel = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="200" height="180" viewBox="0 0 200 180">
      <line x1="10" y1="90" x2="50" y2="90" stroke="black" strokeWidth="1.5" />
      <line x1="130" y1="90" x2="170" y2="90" stroke="black" strokeWidth="1.5" />
      
      {/* Top Branch */}
      <line x1="50" y1="90" x2="50" y2="30" stroke="black" strokeWidth="1.5" />
      <line x1="50" y1="30" x2="70" y2="30" stroke="black" strokeWidth="1.5" />
      <g transform="translate(70, 20)"><Resistor x={0} y={0} label="R1" /></g>
      <line x1="130" y1="30" x2="150" y2="30" stroke="black" strokeWidth="1.5" />
      <line x1="150" y1="30" x2="150" y2="90" stroke="black" strokeWidth="1.5" />

      {/* Middle Branch */}
       <g transform="translate(70, 80)"><Resistor x={0} y={0} label="R2" /></g>

      {/* Bottom Branch */}
      <line x1="50" y1="90" x2="50" y2="150" stroke="black" strokeWidth="1.5" />
      <line x1="50" y1="150" x2="70" y2="150" stroke="black" strokeWidth="1.5" />
      <g transform="translate(70, 140)"><Resistor x={0} y={0} label="R3" /></g>
      <line x1="130" y1="150" x2="150" y2="150" stroke="black" strokeWidth="1.5" />
      <line x1="150" y1="150" x2="150" y2="90" stroke="black" strokeWidth="1.5" />
    </svg>
  </div>
);

    