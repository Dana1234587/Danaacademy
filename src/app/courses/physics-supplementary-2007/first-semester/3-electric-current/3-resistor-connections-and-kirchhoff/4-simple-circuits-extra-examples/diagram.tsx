
'use client';
import React from 'react';

const Resistor = ({ x, y, label, width = 50 }: { x: number, y: number, label: string, width?: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d={`M 0 10 L 5 10 L 10 0 L 20 20 L 30 0 L 40 20 L 45 10 L ${width} 10`} stroke="black" strokeWidth="1.5" fill="none" />
    <text x={width/2} y="-5" textAnchor="middle" fontSize="12">{label}</text>
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

const Ammeter = ({ x, y }: { x: number, y: number }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
        <text x="15" y="20" textAnchor="middle" fontSize="14" fontWeight="bold">A</text>
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
        <circle cx="0" cy="10" r="3" fill="black" />
        <circle cx="40" cy="10" r="3" fill="black" />
        <line x1="0" y1="10" x2="-20" y2="10" stroke="black" strokeWidth="1.5" />
        <line x1="40" y1="10" x2="60" y2="10" stroke="black" strokeWidth="1.5" />
        <line x1="0" y1="10" x2="40" y2={open ? "-5" : "10"} stroke="black" strokeWidth="1.5" />
        <text x="20" y="30" textAnchor="middle" fontSize="12">S</text>
    </g>
);


export const ComplexCircuitDiagram = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="300" height="200" viewBox="0 0 300 200">
            {/* Left Branch */}
            <g transform="translate(30, 70)">
                 <Battery x={0} y={0} label="ε, r" vertical={true}/>
            </g>
            <line x1="30" y1="70" x2="30" y2="20" stroke="black" strokeWidth="1.5"/>
            <line x1="30" y1="110" x2="30" y2="180" stroke="black" strokeWidth="1.5"/>
            
            {/* Top Branch */}
            <line x1="30" y1="20" x2="100" y2="20" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(100, 10)"><Resistor x={0} y={0} label="R1" /></g>
            <line x1="150" y1="20" x2="180" y2="20" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(180, 10)"><Switch x={0} y={0} open={false} /></g>
            
            {/* Bottom Branch */}
            <line x1="30" y1="180" x2="100" y2="180" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(100, 170)"><Resistor x={0} y={0} label="R2" /></g>
            <line x1="150" y1="180" x2="240" y2="180" stroke="black" strokeWidth="1.5"/>
            
            {/* Right Branch with Ammeter */}
            <line x1="240" y1="20" x2="240" y2="85" stroke="black" strokeWidth="1.5"/>
            <line x1="240" y1="115" x2="240" y2="180" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(225, 85)"><Ammeter x={0} y={0} /></g>
        </svg>
    </div>
);
