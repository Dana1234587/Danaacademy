
'use client';

import React from 'react';

const Resistor = ({ x, y, label, width = 50 }: { x: number, y: number, label: string, width?: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d={`M 0 0 L 5 -8 L 15 8 L 25 -8 L 35 8 L 45 -8 L 50 0`} stroke="black" strokeWidth="1.5" fill="none" />
    <line x1={-10} y1="0" x2="0" y2="0" stroke="black" strokeWidth="1.5" />
    <line x1={50} y1="0" x2={width} y2="0" stroke="black" strokeWidth="1.5" />
    <text x={width/2 - 5} y="-12" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?:boolean }) => (
    <g transform={`translate(${x}, ${y})`}>
      {vertical ? (
          <>
            <line x1="0" y1={-10} x2="0" y2="5" stroke="black" strokeWidth="1.5" />
            <line x1="-10" y1="15" x2="10" y2="15" stroke="black" strokeWidth="2" />
            <line x1="-5" y1="25" x2="5" y2="25" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="35" x2="0" y2="50" stroke="black" strokeWidth="1.5" />
            <text x="20" y="23" fontSize="12">{label}</text>
          </>
      ) : (
          <>
            <line x1={-10} y1="10" x2="5" y2="10" stroke="black" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="20" stroke="black" strokeWidth="2" />
            <line x1="25" y1="5" x2="25" y2="15" stroke="black" strokeWidth="1.5" />
            <line x1="35" y1="10" x2="50" y2="10" stroke="black" strokeWidth="1.5" />
            <text x="20" y="-5" textAnchor="middle" fontSize="12">{label}</text>
          </>
      )}
    </g>
);


export const SimpleCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="0 0 250 150">
            {/* Battery */}
            <g transform="translate(40, 50)">
                 <Battery x={0} y={0} label="ε, r" vertical={true}/>
            </g>
           
            {/* Wires */}
            <line x1="40" y1="40" x2="150" y2="40" stroke="black" strokeWidth="1.5"/>
            <line x1="40" y1="100" x2="150" y2="100" stroke="black" strokeWidth="1.5"/>
            
            {/* Top Branch */}
            <line x1="150" y1="40" x2="150" y2="20" stroke="black" strokeWidth="1.5" />
            <line x1="150" y1="20" x2="220" y2="20" stroke="black" strokeWidth="1.5" />
            <line x1="220" y1="20" x2="220" y2="120" stroke="black" strokeWidth="1.5" />
            <line x1="150" y1="120" x2="220" y2="120" stroke="black" strokeWidth="1.5" />

            {/* Resistors */}
            <g transform="translate(160, 20)">
                <Resistor x={0} y={0} label="R1" />
            </g>
             <g transform="translate(160, 60)">
                <Resistor x={0} y={0} label="R2" />
            </g>
             <g transform="translate(160, 100)">
                <Resistor x={0} y={0} label="R3" />
            </g>

            {/* Connecting parallel branches */}
             <line x1="150" y1="40" x2="150" y2="120" stroke="black" strokeWidth="1.5"/>
        </svg>
    </div>
);
