
'use client';
import React from 'react';

const Resistor = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M 0 10 L 5 10 L 10 0 L 20 20 L 30 0 L 40 20 L 45 10 L 50 10" stroke="black" strokeWidth="1.5" fill="none" />
    <text x="25" y="-5" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?:boolean }) => (
    <g transform={`translate(${x}, ${y})`}>
      {vertical ? (
          <>
            <line x1="0" y1="0" x2="0" y2="5" stroke="black" strokeWidth="1.5" />
            <line x1="-10" y1="15" x2="10" y2="15" stroke="black" strokeWidth="2" />
            <line x1="-5" y1="25" x2="5" y2="25" stroke="black" strokeWidth="1.5" />
            <line x1="0" y1="35" x2="0" y2="40" stroke="black" strokeWidth="1.5" />
            <text x="20" y="23" fontSize="12">{label}</text>
          </>
      ) : (
          <>
            <line x1="0" y1="10" x2="5" y2="10" stroke="black" strokeWidth="1.5" />
            <line x1="15" y1="0" x2="15" y2="20" stroke="black" strokeWidth="2" />
            <line x1="25" y1="5" x2="25" y2="15" stroke="black" strokeWidth="1.5" />
            <line x1="35" y1="10" x2="40" y2="10" stroke="black" strokeWidth="1.5" />
            <text x="20" y="-5" textAnchor="middle" fontSize="12">{label}</text>
          </>
      )}
    </g>
);

const Voltmeter = ({ x, y, size=15 }: { x: number, y: number, size?: number }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx={size} cy={size} r={size} stroke="hsl(var(--primary))" strokeWidth="1.5" fill="white" />
        <text x={size} y={size+5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(var(--primary))">V</text>
    </g>
);


export const VoltmeterCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="280" height="200" viewBox="0 0 280 200">
            {/* Top wire and resistor */}
            <line x1="50" y1="40" x2="100" y2="40" stroke="black" strokeWidth="1.5" />
            <g transform="translate(100, 30)"><Resistor x={0} y={0} label="3Ω" /></g>
            <line x1="150" y1="40" x2="230" y2="40" stroke="black" strokeWidth="1.5" />

            {/* Left wire and battery */}
            <line x1="50" y1="40" x2="50" y2="60" stroke="black" strokeWidth="1.5" />
            <g transform="translate(40, 60)"><Battery x={0} y={0} label="10V" vertical={true} /></g>
            <line x1="50" y1="100" x2="50" y2="160" stroke="black" strokeWidth="1.5" />

            {/* Bottom wire and resistor */}
            <line x1="50" y1="160" x2="180" y2="160" stroke="black" strokeWidth="1.5" />
            <g transform="translate(180, 150)"><Resistor x={0} y={0} label="2Ω" /></g>
            <line x1="230" y1="160" x2="260" y2="160" stroke="black" strokeWidth="1.5" />
            
            {/* Right wire */}
            <line x1="260" y1="160" x2="260" y2="40" stroke="black" strokeWidth="1.5" />
            <line x1="230" y1="40" x2="260" y2="40" stroke="black" strokeWidth="1.5" />
            
            
            {/* Voltmeter and connection points */}
            <g transform="translate(130, 85)"><Voltmeter x={0} y={0} /></g>
            <line x1="145" y1="85" x2="180" y2="40" stroke="hsl(var(--primary))" strokeDasharray="2,2" strokeWidth="1.5"/>
            <line x1="145" y1="100" x2="180" y2="160" stroke="hsl(var(--primary))" strokeDasharray="2,2" strokeWidth="1.5"/>

            <circle cx="180" cy="40" r="3" fill="black" />
            <text x="175" y="35" fontSize="12">a</text>
            <circle cx="180" cy="160" r="3" fill="black" />
            <text x="185" y="175" fontSize="12">b</text>

        </svg>
    </div>
);
