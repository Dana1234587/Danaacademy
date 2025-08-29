
'use client';
import React from 'react';

const Resistor = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M 0 0 L 5 -8 L 15 8 L 25 -8 L 35 8 L 45 -8 L 50 0" stroke="black" strokeWidth="1.5" fill="none" />
    <line x1={-10} y1="0" x2="0" y2="0" stroke="black" strokeWidth="1.5" />
    <line x1={50} y1="0" x2={60} y2="0" stroke="black" strokeWidth="1.5" />
    <text x="25" y="-12" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label }: { x: number, y: number, label: string }) => (
    <g transform={`translate(${x}, ${y})`}>
        <line x1={-10} y1="0" x2="5" y2="0" stroke="black" strokeWidth="1.5" />
        <line x1="15" y1="-10" x2="15" y2="10" stroke="black" strokeWidth="2" />
        <line x1="25" y1="-5" x2="25" y2="5" stroke="black" strokeWidth="1.5" />
        <line x1="35" y1="0" x2="50" y2="0" stroke="black" strokeWidth="1.5" />
        <text x="25" y="-15" textAnchor="middle" fontSize="12">{label}</text>
    </g>
);


export const KirchhoffCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="200" viewBox="0 0 250 200">
            {/* Top Branch */}
            <g transform="translate(70, 50)"><Resistor x={0} y={0} label="R1" /></g>
            <line x1="50" y1="50" x2="60" y2="50" stroke="black" strokeWidth="1.5"/>
            <line x1="130" y1="50" x2="200" y2="50" stroke="black" strokeWidth="1.5"/>
            
            {/* Middle Branch */}
            <g transform="translate(70, 100)"><Battery x={0} y={0} label="ε1" /></g>
            <line x1="50" y1="100" x2="60" y2="100" stroke="black" strokeWidth="1.5"/>
            <line x1="120" y1="100" x2="130" y2="100" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(130, 100)"><Resistor x={0} y={0} label="R2" /></g>
            <line x1="190" y1="100" x2="200" y2="100" stroke="black" strokeWidth="1.5"/>

            {/* Bottom Branch */}
            <g transform="translate(130, 150)"><Battery x={0} y={0} label="ε2" /></g>
            <line x1="50" y1="150" x2="120" y2="150" stroke="black" strokeWidth="1.5"/>
            <line x1="180" y1="150" x2="200" y2="150" stroke="black" strokeWidth="1.5"/>

            {/* Vertical connections */}
            <line x1="50" y1="50" x2="50" y2="150" stroke="black" strokeWidth="1.5"/>
            <line x1="200" y1="50" x2="200" y2="150" stroke="black" strokeWidth="1.5"/>

             {/* Currents */}
            <text x="95" y="45" fontSize="12" fill="blue">I1 →</text>
            <text x="165" y="95" fontSize="12" fill="blue">I2 →</text>
            <text x="95" y="165" fontSize="12" fill="blue">I3 →</text>

        </svg>
    </div>
);
