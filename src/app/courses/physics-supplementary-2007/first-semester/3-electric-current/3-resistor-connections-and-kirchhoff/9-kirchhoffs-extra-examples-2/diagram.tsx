
'use client';
import React from 'react';

const Resistor = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?: boolean }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d={vertical ? "M 0 0 L 0 5 L -10 10 L 10 20 L -10 30 L 10 40 L 0 45 L 0 50" : "M 0 10 L 5 10 L 10 0 L 20 20 L 30 0 L 40 20 L 45 10 L 50 10"} stroke="black" strokeWidth="1.5" fill="none" />
    <text x={vertical ? 15 : 25} y={vertical ? 25 : -15} textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label, vertical = false }: { x: number, y: number, label: string, vertical?: boolean }) => (
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
            <line x1="50" y1="20" x2="70" y2="20" stroke="black" strokeWidth="1.5" />
            <g transform="translate(70, 10)"><Resistor x={0} y={0} label="4Ω" /></g>
            <line x1="120" y1="20" x2="160" y2="20" stroke="black" strokeWidth="1.5" />
            <g transform="translate(160, 10)"><Resistor x={0} y={0} label="2Ω" /></g>
            <line x1="210" y1="20" x2="230" y2="20" stroke="black" strokeWidth="1.5" />
            

            <line x1="50" y1="20" x2="50" y2="100" stroke="black" strokeWidth="1.5" />
            <g transform="translate(40, 100)"><Battery x={0} y={0} label="28V" vertical={true} /></g>
            <line x1="50" y1="140" x2="50" y2="180" stroke="black" strokeWidth="1.5" />
            
            <line x1="230" y1="20" x2="230" y2="100" stroke="black" strokeWidth="1.5" />
            <g transform="translate(220, 100)"><Battery x={0} y={0} label="7V" vertical={true} /></g>
            <line x1="230" y1="140" x2="230" y2="180" stroke="black" strokeWidth="1.5" />
            
            <line x1="50" y1="180" x2="230" y2="180" stroke="black" strokeWidth="1.5" />
            <g transform="translate(140, 120)"><Ground x={0} y={0} /></g>
            <line x1="140" y1="120" x2="140" y2="180" stroke="black" strokeWidth="1.5" />
             <circle cx="140" cy="180" r="3" fill="black" />
             <text x="140" y="195" fontSize="12" textAnchor="middle">b</text>

             <circle cx="140" cy="20" r="3" fill="black" />
             <text x="140" y="15" fontSize="12" textAnchor="middle">a</text>
             <line x1="140" y1="20" x2="140" y2="100" stroke="black" strokeWidth="1.5" />
             <g transform="translate(130, 100)"><Resistor x={0} y={0} label="1Ω" vertical={true} /></g>
        </svg>
    </div>
);
