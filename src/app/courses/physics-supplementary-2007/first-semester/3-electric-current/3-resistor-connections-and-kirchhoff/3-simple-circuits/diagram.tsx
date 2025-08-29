
import React from 'react';

export const SimpleCircuit = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="0 0 250 150" xmlns="http://www.w3.org/2000/svg">
            {/* Battery */}
            <line x1="50" y1="75" x2="50" y2="100" stroke="black" strokeWidth="2"/>
            <line x1="40" y1="75" x2="60" y2="75" stroke="black" strokeWidth="2"/>
            <line x1="45" y1="65" x2="55" y2="65" stroke="black" strokeWidth="2"/>
            <text x="30" y="70" fontSize="12">ε, r</text>
            <line x1="50" y1="65" x2="50" y2="40" stroke="black" strokeWidth="2"/>
            
            {/* Wires */}
            <line x1="50" y1="40" x2="150" y2="40" stroke="black" strokeWidth="2"/>
            <line x1="50" y1="100" x2="150" y2="100" stroke="black" strokeWidth="2"/>
            
            {/* Resistors */}
            <rect x="150" y="30" width="60" height="20" fill="none" stroke="black" strokeWidth="2" />
            <text x="180" y="25" textAnchor="middle" fontSize="12">R1</text>
            <line x1="210" y1="40" x2="230" y2="40" stroke="black" strokeWidth="2"/>
            
            <line x1="150" y1="100" x2="150" y2="120" stroke="black" strokeWidth="2"/>
            <rect x="140" y="120" width="20" height="40" transform="rotate(90 150 140)" fill="none" stroke="black" strokeWidth="2"/>
            <text x="185" y="115" fontSize="12">R2</text>
            <line x1="150" y1="40" x2="150" y2="20" stroke="black" strokeWidth="2"/>
            <line x1="150" y1="20" x2="230" y2="20" stroke="black" strokeWidth="2"/>
            <line x1="230" y1="20" x2="230" y2="40" stroke="black" strokeWidth="2"/>

             <rect x="150" y="90" width="60" height="20" fill="none" stroke="black" strokeWidth="2" />
             <text x="180" y="85" textAnchor="middle" fontSize="12">R3</text>
             <line x1="210" y1="100" x2="230" y2="100" stroke="black" strokeWidth="2"/>
             <line x1="230" y1="100" x2="230" y2="40" stroke="black" strokeWidth="2"/>

        </svg>
    </div>
);
