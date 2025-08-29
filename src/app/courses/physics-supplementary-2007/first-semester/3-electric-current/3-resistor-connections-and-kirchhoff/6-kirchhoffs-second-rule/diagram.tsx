
'use client';
import React from 'react';

const Resistor = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?: boolean }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d={vertical ? "M 0 0 L 0 5 L -10 10 L 10 20 L -10 30 L 10 40 L 0 45 L 0 50" : "M 0 0 L 5 0 L 10 -10 L 20 10 L 30 -10 L 40 10 L 45 0 L 50 0"} stroke="black" strokeWidth="1.5" fill="none" />
    <text x={vertical ? 15 : 25} y={vertical ? 25 : -15} textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?: boolean }) => (
    <g transform={`translate(${x}, ${y})`}>
      {vertical ? (
        <>
            <line x1="0" y1="0" x2="0" y2="5" stroke="black" strokeWidth="1.5" />
            <line x1="-10" y1="15" x2="10" y2="15" stroke="black" strokeWidth="1.5" />
            <line x1="-5" y1="25" x2="5" y2="25" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="35" x2="0" y2="40" stroke="black" strokeWidth="1.5" />
            <text x="20" y="23" fontSize="12">{label}</text>
        </>
      ) : (
        <>
            <line x1="0" y1="0" x2="5" y2="0" stroke="black" strokeWidth="1.5" />
            <line x1="15" y1="-10" x2="15" y2="10" stroke="black" strokeWidth="1.5" />
            <line x1="25" y1="-5" x2="25" y2="5" stroke="black" strokeWidth="1.5" />
            <line x1="35" y1="0" x2="40" y2="0" stroke="black" strokeWidth="1.5" />
            <text x="20" y="-15" textAnchor="middle" fontSize="12">{label}</text>
        </>
      )}
    </g>
);


export const LoopDiagram = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="200" viewBox="0 0 250 200">
             {/* Loop path arrow */}
             <path d="M 200 150 A 50 50 0 1 1 200 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" />
             <polygon points="205,55 200,45 195,55" fill="hsl(var(--primary))" />
             <text x="180" y="100" fill="hsl(var(--primary))" fontSize="12" fontWeight="bold">Loop</text>


            {/* Top Branch */}
            <g transform="translate(40, 30)">
                <Battery x={0} y={0} label="ε1" />
            </g>
            <g transform="translate(100, 30)">
                <Resistor x={0} y={0} label="R1" />
            </g>
             <line x1="20" y1="30" x2="40" y2="30" stroke="black" strokeWidth="1.5" />
             <line x1="80" y1="30" x2="100" y2="30" stroke="black" strokeWidth="1.5" />
             <line x1="150" y1="30" x2="180" y2="30" stroke="black" strokeWidth="1.5" />

            {/* Right Branch */}
             <g transform="translate(170, 50)">
                <Resistor x={0} y={0} label="R2" vertical={true} />
            </g>
            <line x1="180" y1="30" x2="180" y2="50" stroke="black" strokeWidth="1.5" />
            <line x1="180" y1="100" x2="180" y2="150" stroke="black" strokeWidth="1.5" />

            {/* Bottom Branch */}
            <line x1="180" y1="150" x2="80" y2="150" stroke="black" strokeWidth="1.5" />
             <g transform="translate(20, 150)">
                <Resistor x={0} y={0} label="R3" />
            </g>
             <line x1="20" y1="150" x2="20" y2="30" stroke="black" strokeWidth="1.5" />
        </svg>
    </div>
);
