
'use client';
import React from 'react';

const Resistor = ({ x, y, label }: { x: number, y: number, label: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <path d="M 0 10 L 5 10 L 10 0 L 20 20 L 30 0 L 40 20 L 45 10 L 50 10" stroke="black" strokeWidth="1.5" fill="none" />
    <text x="25" y="-5" textAnchor="middle" fontSize="12">{label}</text>
  </g>
);

const Battery = ({ x, y, label }: { x: number, y: number, label: string }) => (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="40" stroke="black" strokeWidth="1.5" />
      <line x1="-10" y1="10" x2="10" y2="10" stroke="black" strokeWidth="1.5" />
      <line x1="-5" y1="20" x2="5" y2="20" stroke="black" strokeWidth="1.5" />
      <text x="15" y="18" fontSize="12">{label}</text>
    </g>
);

const Ammeter = ({ x, y }: { x: number, y: number }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx="15" cy="15" r="15" stroke="black" strokeWidth="1.5" fill="white" />
        <text x="15" y="20" textAnchor="middle" fontSize="14" fontWeight="bold">A</text>
    </g>
);

const Voltmeter = ({ x1, y1, x2, y2 }: { x1: number, y1: number, x2:number, y2:number }) => (
    <g>
        <circle cx={x1} cy={y1} r="15" stroke="black" strokeWidth="1.5" fill="white" />
        <text x={x1} y={y1+5} textAnchor="middle" fontSize="14" fontWeight="bold">V</text>
        <line x1={x1} y1={y1+15} x2={x2} y2={y2} stroke="black" strokeWidth="1" strokeDasharray="3,3" />
        <line x1={x1} y1={y1-15} x2={x2-20} y2={y2-50} stroke="black" strokeWidth="1" strokeDasharray="3,3" />
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
            <g transform="translate(20, 50)">
                 <Battery x={0} y={0} label="ε, r" />
            </g>
            <line x1="20" y1="50" x2="100" y2="50" stroke="black" strokeWidth="1.5" />
            <line x1="20" y1="90" x2="100" y2="90" stroke="black" strokeWidth="1.5" />
            
            <g transform="translate(100, 40)">
                 <Resistor x={0} y={0} label="R1" />
            </g>
             <line x1="150" y1="50" x2="200" y2="50" stroke="black" strokeWidth="1.5" />
            <g transform="translate(200, 40)">
                 <Switch x={0} y={0} open={false} />
            </g>
            
            <line x1="100" y1="90" x2="150" y2="90" stroke="black" strokeWidth="1.5" />
             <g transform="translate(150, 80)">
                 <Resistor x={0} y={0} label="R2" />
            </g>
             <line x1="200" y1="90" x2="260" y2="90" stroke="black" strokeWidth="1.5" />

            <line x1="260" y1="50" x2="260" y2="90" stroke="black" strokeWidth="1.5" />
            
            <g transform="translate(260, 60)">
                 <Ammeter x={0} y={0} />
            </g>
             <line x1="290" y1="75" x2="300" y2="75" stroke="black" strokeWidth="1.5" />

        </svg>
    </div>
);
