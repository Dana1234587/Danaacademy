
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


export const KirchhoffCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="200" viewBox="0 0 250 200">
            {/* Top Branch */}
            <line x1="50" y1="50" x2="70" y2="50" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(70, 50)"><Resistor x={0} y={0} label="R1" /></g>
            <line x1="120" y1="50" x2="200" y2="50" stroke="black" strokeWidth="1.5"/>
            
            {/* Middle Branch */}
            <line x1="50" y1="100" x2="70" y2="100" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(70, 100)"><Battery x={0} y={0} label="ε1" /></g>
            <line x1="110" y1="100" x2="140" y2="100" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(140, 100)"><Resistor x={0} y={0} label="R2" /></g>
            <line x1="190" y1="100" x2="200" y2="100" stroke="black" strokeWidth="1.5"/>

            {/* Bottom Branch */}
            <line x1="50" y1="150" x2="140" y2="150" stroke="black" strokeWidth="1.5"/>
            <g transform="translate(140, 150)"><Battery x={0} y={0} label="ε2" /></g>
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
