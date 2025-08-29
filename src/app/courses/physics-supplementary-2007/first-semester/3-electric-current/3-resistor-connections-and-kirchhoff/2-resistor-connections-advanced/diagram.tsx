
'use client';

import React from 'react';

const Resistor = ({ x, y, label, width = 60, vertical=false }: { x: number, y: number, label: string, width?: number, vertical?: boolean }) => {
    const path = vertical
      ? `M ${width/2} 0 L ${width/2} 5 L 0 10 L ${width} 20 L 0 30 L ${width} 40 L ${width/2} 45 L ${width/2} 50`
      : `M 0 ${width/2} L 5 ${width/2} L 10 0 L 20 ${width} L 30 0 L 40 ${width} L 45 ${width/2} L 50 ${width/2}`;

    const textX = vertical ? width + 5: width / 2;
    const textY = vertical ? width/2 : -5;
  
    return (
    <g transform={`translate(${x}, ${y})`}>
      <path d={path} stroke="black" strokeWidth="1.5" fill="none" />
      <text x={textX} y={textY} textAnchor={vertical ? "start" : "middle"} fontSize="12">{label}</text>
    </g>
  )};

export const WheatstoneBridge = ({ r1="R1", r2="R2", r3="R3", r4="R4", r5="R5" }: {r1?: string, r2?: string, r3?: string, r4?: string, r5?: string}) => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="150" viewBox="-10 -10 270 170">
      {/* Nodes */}
      <circle cx="20" cy="75" r="3" fill="black" />
      <text x="15" y="95" fontSize="12">a</text>
      <circle cx="125" cy="20" r="3" fill="black" />
      <text x="125" y="15" textAnchor="middle" fontSize="12">c</text>
      <circle cx="125" cy="130" r="3" fill="black" />
      <text x="125" y="145" textAnchor="middle" fontSize="12">d</text>
      <circle cx="230" cy="75" r="3" fill="black" />
      <text x="235" y="95" fontSize="12">b</text>

      {/* Wires */}
      <line x1="0" y1="75" x2="20" y2="75" stroke="black" strokeWidth="1.5" />
      <line x1="230" y1="75" x2="250" y2="75" stroke="black" strokeWidth="1.5" />
      
      {/* Resistors */}
      <line x1="20" y1="75" x2="125" y2="20" stroke="black" strokeWidth="1.5" />
      <g transform="translate(62, 40) rotate(-24)">
        <Resistor x={0} y={0} label={r1} width={50} />
      </g>
      
      <line x1="125" y1="20" x2="230" y2="75" stroke="black" strokeWidth="1.5" />
       <g transform="translate(165, 40) rotate(24)">
        <Resistor x={0} y={0} label={r2} width={50} />
      </g>

      <line x1="20" y1="75" x2="125" y2="130" stroke="black" strokeWidth="1.5" />
      <g transform="translate(62, 95) rotate(24)">
        <Resistor x={0} y={0} label={r3} width={50} />
      </g>

      <line x1="125" y1="130" x2="230" y2="75" stroke="black" strokeWidth="1.5" />
      <g transform="translate(165, 95) rotate(-24)">
        <Resistor x={0} y={0} label={r4} width={50} />
      </g>
      
      <line x1="125" y1="20" x2="125" y2="130" stroke="black" strokeWidth="1.5" />
      <g transform="translate(118, 70)">
        <Resistor x={0} y={0} label={r5} width={15} vertical={true}/>
      </g>

    </svg>
  </div>
);
