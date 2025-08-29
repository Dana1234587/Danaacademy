
'use client';

import React from 'react';

const Resistor = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M 0 10 L 5 10 L 10 0 L 20 20 L 30 0 L 40 20 L 45 10 L 50 10" stroke="black" strokeWidth="1.5" fill="none" />
    <text x="25" y="-5" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label }: { x: number, y: number, label: string }) => (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="40" stroke="black" strokeWidth="1.5" />
      <line x1="-10" y1="10" x2="10" y2="10" stroke="black" strokeWidth="1.5" />
      <line x1="-5" y1="20" x2="5" y2="20" stroke="black" strokeWidth="1.5" />
      <text x="15" y="18" fontSize="12">{label}</text>
    </g>
);


export const SimpleCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="0 0 250 150">
            {/* Battery */}
            <g transform="translate(40, 50)">
                 <Battery x={0} y={0} label="ε, r" />
            </g>
           
            {/* Wires */}
            <line x1="40" y1="50" x2="150" y2="50" stroke="black" strokeWidth="1.5"/>
            <line x1="40" y1="90" x2="150" y2="90" stroke="black" strokeWidth="1.5"/>
            
            {/* Top Branch */}
            <line x1="150" y1="50" x2="150" y2="30" stroke="black" strokeWidth="1.5" />
            <line x1="150" y1="30" x2="220" y2="30" stroke="black" strokeWidth="1.5" />
            <line x1="220" y1="30" x2="220" y2="110" stroke="black" strokeWidth="1.5" />
            <line x1="150" y1="110" x2="220" y2="110" stroke="black" strokeWidth="1.5" />

            {/* Resistors */}
            <g transform="translate(160, 20)">
                <Resistor x={0} y={0} label="R1" />
            </g>
             <g transform="translate(160, 55)">
                <Resistor x={0} y={0} label="R2" />
            </g>
             <g transform="translate(160, 90)">
                <Resistor x={0} y={0} label="R3" />
            </g>

            {/* Connecting parallel branches */}
             <line x1="150" y1="50" x2="150" y2="110" stroke="black" strokeWidth="1.5"/>
        </svg>
    </div>
);
