
'use client';
import React from 'react';

const Resistor = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?: boolean }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d={vertical ? "M 0 0 L -8 10 L 8 20 L -8 30 L 8 40 L 0 50" : "M 0 0 L 5 -8 L 15 8 L 25 -8 L 35 8 L 45 -8 L 50 0"} stroke="black" strokeWidth="1.5" fill="none" />
    <line x1={vertical ? 0 : -10} y1={vertical ? -10 : 0} x2="0" y2="0" stroke="black" strokeWidth="1.5" />
    <line x1={vertical ? 0: 50} y1={vertical ? 50 : 0} x2={vertical ? 0 : 60} y2={vertical ? 60 : 0} stroke="black" strokeWidth="1.5" />
    <text x={vertical ? 15 : 25} y={vertical ? 25: -12} textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?: boolean }) => (
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

const Ground = ({ x, y }: { x: number, y: number }) => (
    <g transform={`translate(${x}, ${y})`}>
        <line x1="0" y1="0" x2="0" y2="10" stroke="black" strokeWidth="1.5" />
        <line x1="-15" y1="10" x2="15" y2="10" stroke="black" strokeWidth="1.5" />
        <line x1="-10" y1="15" x2="10" y2="15" stroke="black" strokeWidth="1.5" />
        <line x1="-5" y1="20" x2="5" y2="20" stroke="black" strokeWidth="1.5" />
    </g>
);

export const GroundedCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="280" height="200" viewBox="0 0 280 200">
            <g transform="translate(70, 20)"><Resistor x={0} y={0} label="4Ω" /></g>
            <line x1="50" y1="20" x2="60" y2="20" stroke="black" strokeWidth="1.5" />
            <line x1="130" y1="20" x2="160" y2="20" stroke="black" strokeWidth="1.5" />
            <g transform="translate(160, 20)"><Resistor x={0} y={0} label="2Ω" /></g>
            <line x1="220" y1="20" x2="230" y2="20" stroke="black" strokeWidth="1.5" />
            

            <g transform="translate(40, 100)"><Battery x={0} y={0} label="28V" vertical={true} /></g>
            <line x1="50" y1="20" x2="50" y2="90" stroke="black" strokeWidth="1.5" />
            <line x1="50" y1="150" x2="50" y2="180" stroke="black" strokeWidth="1.5" />
            
            <g transform="translate(220, 100)"><Battery x={0} y={0} label="7V" vertical={true} /></g>
            <line x1="230" y1="20" x2="230" y2="90" stroke="black" strokeWidth="1.5" />
            <line x1="230" y1="150" x2="230" y2="180" stroke="black" strokeWidth="1.5" />
            
            <line x1="50" y1="180" x2="230" y2="180" stroke="black" strokeWidth="1.5" />
            <g transform="translate(140, 120)"><Ground x={0} y={0} /></g>
            <line x1="140" y1="120" x2="140" y2="180" stroke="black" strokeWidth="1.5" />
             <circle cx="140" cy="180" r="3" fill="black" />
             <text x="140" y="195" fontSize="12" textAnchor="middle">b</text>

             <circle cx="140" cy="20" r="3" fill="black" />
             <text x="140" y="15" fontSize="12" textAnchor="middle">a</text>
             <g transform="translate(140, 40)"><Resistor x={0} y={0} label="1Ω" vertical={true} /></g>
             <line x1="140" y1="20" x2="140" y2="30" stroke="black" strokeWidth="1.5" />
             <line x1="140" y1="90" x2="140" y2="100" stroke="black" strokeWidth="1.5" />
             <circle cx="140" cy="100" r="3" fill="black" />
        </svg>
    </div>
);
