
'use client';
import React from 'react';

const Resistor = ({ x, y, label, width = 60, vertical=false }: { x: number, y: number, label: string, width?: number, vertical?: boolean }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d={vertical ? "M 0 0 L -8 10 L 8 20 L -8 30 L 8 40 L 0 50" : "M 0 0 L 10 -8 L 20 8 L 30 -8 L 40 8 L 50 -8 L 60 0"} stroke="black" strokeWidth="1.5" fill="none" />
    <line x1={vertical ? 0 : -10} y1={vertical ? -10 : 0} x2="0" y2="0" stroke="black" strokeWidth="1.5" />
    <line x1={vertical ? 0: 60} y1={vertical ? 50 : 0} x2={vertical ? 0 : width} y2={vertical ? width : 0} stroke="black" strokeWidth="1.5" />
    <text x={vertical ? 15 : 30} y={vertical ? 25: -12} textAnchor="middle" fontSize="12">{label}</text>
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
            <line x1={-10} y1="0" x2="5" y2="0" stroke="black" strokeWidth="1.5" />
            <line x1="15" y1="-10" x2="15" y2="10" stroke="black" strokeWidth="2" />
            <line x1="25" y1="-5" x2="25" y2="5" stroke="black" strokeWidth="1.5" />
            <line x1="35" y1="0" x2="50" y2="0" stroke="black" strokeWidth="1.5" />
            <text x="25" y="-15" textAnchor="middle" fontSize="12">{label}</text>
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


const Switch = ({ x, y, open=false }: { x: number, y: number, open?: boolean }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx="0" cy="0" r="3" fill="black" />
        <circle cx="40" cy="0" r="3" fill="black" />
        <line x1="-20" y1="0" x2="0" y2="0" stroke="black" strokeWidth="1.5" />
        <line x1="40" y1="0" x2="60" y2="0" stroke="black" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="40" y2={open ? -15 : 0} stroke="black" strokeWidth="1.5" />
        <text x="20" y="20" textAnchor="middle" fontSize="12">S</text>
    </g>
);


export const VoltmeterCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="280" height="200" viewBox="0 0 280 200">
            {/* Top wire and resistor */}
            <g transform="translate(100, 40)"><Resistor x={0} y={0} label="3Ω" /></g>
            <line x1="50" y1="40" x2="90" y2="40" stroke="black" strokeWidth="1.5" />
            <line x1="160" y1="40" x2="230" y2="40" stroke="black" strokeWidth="1.5" />

            {/* Left wire and battery */}
            <g transform="translate(40, 60)"><Battery x={0} y={0} label="10V" vertical={true} /></g>
            <line x1="50" y1="40" x2="50" y2="50" stroke="black" strokeWidth="1.5" />
            <line x1="50" y1="110" x2="50" y2="160" stroke="black" strokeWidth="1.5" />
            
            {/* Bottom wire and resistor */}
            <g transform="translate(170, 160)"><Resistor x={0} y={0} label="2Ω" /></g>
            <line x1="50" y1="160" x2="160" y2="160" stroke="black" strokeWidth="1.5" />
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
