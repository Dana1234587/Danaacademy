
'use client';

import React from 'react';

const Resistor = ({ label }: { label: string }) => (
    <g>
        {/* The resistor path starts at (0,0) and ends at (60,0) to make positioning simple */}
        <path d="M 0 0 L 10 -8 L 20 8 L 30 -8 L 40 8 L 50 -8 L 60 0" stroke="black" strokeWidth="1.5" fill="none" />
        <text x="30" y="-12" textAnchor="middle" fontSize="12">{label}</text>
    </g>
);

export const WheatstoneBridge = ({ r1 = "R1", r2 = "R2", r3 = "R3", r4 = "R4", r5 = "R5" }: { r1?: string, r2?: string, r3?: string, r4?: string, r5?: string }) => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="-10 -10 270 170">
            {/* Nodes */}
            <circle cx="20" cy="75" r="3" fill="black" />
            <text x="15" y="95" fontSize="12">a</text>
            <circle cx="125" cy="20" r="3" fill="black" />
            <text x="125" y="15" textAnchor="middle" fontSize="12">c</text>
            <circle cx="125" cy="130" r="3" fill="black" />
            <text x="125" y="145" textAnchor="middle" fontSize="12">d</text>
            <circle cx="230" cy="75" r="3" fill="black" />
            <text x="235" y="95" fontSize="12">b</text>

            {/* Wires */}
            <line x1="0" y1="75" x2="20" y2="75" stroke="black" strokeWidth="1.5" />
            <line x1="230" y1="75" x2="250" y2="75" stroke="black" strokeWidth="1.5" />

            {/* R1 Path from a to c */}
            <line x1="20" y1="75" x2="70" y2="50" stroke="black" strokeWidth="1.5" />
            <g transform="translate(70, 50) rotate(-26.57)">
                <Resistor label={r1} />
            </g>
            <line x1="123.85" y1="21.18" x2="125" y2="20" stroke="black" strokeWidth="1.5" />

            {/* R2 Path from c to b */}
             <line x1="125" y1="20" x2="175" y2="45" stroke="black" strokeWidth="1.5" />
             <g transform="translate(175, 45) rotate(26.57)">
                 <Resistor label={r2} />
             </g>
             <line x1="228.85" y1="73.82" x2="230" y2="75" stroke="black" strokeWidth="1.5" />

            {/* R3 Path from a to d */}
             <line x1="20" y1="75" x2="70" y2="100" stroke="black" strokeWidth="1.5" />
             <g transform="translate(70, 100) rotate(26.57)">
                 <Resistor label={r3} />
             </g>
             <line x1="123.85" y1="128.82" x2="125" y2="130" stroke="black" strokeWidth="1.5" />

            {/* R4 Path from d to b */}
             <line x1="125" y1="130" x2="175" y2="105" stroke="black" strokeWidth="1.5" />
             <g transform="translate(175, 105) rotate(-26.57)">
                 <Resistor label={r4} />
             </g>
             <line x1="228.85" y1="76.18" x2="230" y2="75" stroke="black" strokeWidth="1.5" />
            
            {/* R5 Path from c to d */}
            <line x1="125" y1="20" x2="125" y2="40" stroke="black" strokeWidth="1.5" />
            <g transform="translate(125, 40) rotate(90)">
                <Resistor label={r5} />
            </g>
            <line x1="125" y1="100" x2="125" y2="130" stroke="black" strokeWidth="1.5" />
        </svg>
    </div>
);
