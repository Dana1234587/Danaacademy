
'use client';
import React from 'react';

export const Junction = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="0 0 250 150">
            <title>Kirchhoff's Junction Rule</title>
            
            {/* Central Junction */}
            <circle cx="125" cy="75" r="5" fill="hsl(var(--primary))" />
            <text x="125" y="95" fontSize="12" textAnchor="middle">Junction</text>

            {/* Incoming current I1 */}
            <line x1="20" y1="75" x2="120" y2="75" stroke="black" strokeWidth="1.5" />
            <polygon points="115,70 125,75 115,80" fill="black" />
            <text x="70" y="70" fontSize="14" fontWeight="bold">I1</text>
            
            {/* Incoming current I2 */}
            <line x1="125" y1="20" x2="125" y2="70" stroke="black" strokeWidth="1.5" />
            <polygon points="120,65 125,75 130,65" fill="black" />
            <text x="110" y="45" fontSize="14" fontWeight="bold">I2</text>

            {/* Outgoing current I3 */}
            <line x1="130" y1="75" x2="230" y2="75" stroke="black" strokeWidth="1.5" />
            <polygon points="225,70 235,75 225,80" fill="black" />
            <text x="180" y="70" fontSize="14" fontWeight="bold">I3</text>

            {/* Outgoing current I4 */}
            <line x1="125" y1="80" x2="125" y2="130" stroke="black" strokeWidth="1.5" />
            <polygon points="120,125 125,135 130,125" fill="black" />
            <text x="135" y="110" fontSize="14" fontWeight="bold">I4</text>
            
        </svg>
    </div>
);
