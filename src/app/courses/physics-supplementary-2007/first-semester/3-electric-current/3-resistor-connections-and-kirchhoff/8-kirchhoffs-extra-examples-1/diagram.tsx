
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

export const VoltmeterCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="280" height="180" viewBox="0 0 280 180">
            <g transform="translate(100, 20)"><Resistor x={0} y={0} label="3Ω" /></g>
            <line x1="100" y1="20" x2="50" y2="20" stroke="black" strokeWidth="1.5" />
            <line x1="150" y1="20" x2="230" y2="20" stroke="black" strokeWidth="1.5" />
            
            <line x1="50" y1="20" x2="50" y2="80" stroke="black" strokeWidth="1.5" />
            <g transform="translate(40, 80)"><Battery x={0} y={0} label="10V" vertical={true} /></g>
            <line x1="50" y1="120" x2="50" y2="160" stroke="black" strokeWidth="1.5" />

            <line x1="50" y1="160" x2="230" y2="160" stroke="black" strokeWidth="1.5" />
            <g transform="translate(100, 160)"><Resistor x={0} y={0} label="2Ω" /></g>

            <line x1="230" y1="160" x2="230" y2="20" stroke="black" strokeWidth="1.5" />
            
            {/* Voltmeter */}
            <circle cx="140" cy="90" r="15" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="white" />
            <text x="140" y="95" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(var(--primary))">V</text>
            <line x1="100" y1="50" x2="128" y2="80" stroke="hsl(var(--primary))" strokeDasharray="2,2" strokeWidth="1.5"/>
            <line x1="152" y1="100" x2="180" y2="150" stroke="hsl(var(--primary))" strokeDasharray="2,2" strokeWidth="1.5"/>

            <circle cx="100" cy="50" r="3" fill="black" />
            <text x="95" y="45" fontSize="12">a</text>
            <circle cx="180" cy="150" r="3" fill="black" />
            <text x="185" y="165" fontSize="12">b</text>

        </svg>
    </div>
);
