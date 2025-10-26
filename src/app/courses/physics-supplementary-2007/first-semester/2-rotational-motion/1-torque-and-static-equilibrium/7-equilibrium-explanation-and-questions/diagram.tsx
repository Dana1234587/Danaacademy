
'use client';
import React from 'react';

export const SeesawBalanced = () => (
    <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
        <svg width="300" height="120" viewBox="0 0 300 120">
            <rect x="20" y="50" width="260" height="8" fill="hsl(var(--primary))" stroke="black"/>
            <path d="M 150 58 L 160 88 L 140 88 Z" fill="hsl(var(--secondary))" stroke="black"/>
            <line x1="80" y1="50" x2="80" y2="70" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="75,70 85,70 80,80" fill="hsl(var(--destructive))"/>
            <text x="80" y="95" fontSize="12" textAnchor="middle">600 N</text>
            <line x1="220" y1="50" x2="220" y2="70" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="215,70 225,70 220,80" fill="hsl(var(--destructive))"/>
            <text x="220" y="95" fontSize="12" textAnchor="middle">F = ?</text>
            <line x1="80" y1="45" x2="150" y2="45" stroke="black" strokeDasharray="2,2"/>
            <text x="115" y="40" fontSize="12" textAnchor="middle">2.0 m</text>
            <line x1="150" y1="45" x2="220" y2="45" stroke="black" strokeDasharray="2,2"/>
            <text x="185" y="40" fontSize="12" textAnchor="middle">1.4 m</text>
        </svg>
    </div>
);

export const BeamOnTwoSupports = () => (
    <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
        <svg width="400" height="150" viewBox="0 0 400 150">
            <rect x="20" y="50" width="360" height="10" fill="hsl(var(--primary))" stroke="black"/>
            <path d="M 50 60 L 60 80 L 40 80 Z" fill="hsl(var(--secondary))" stroke="black"/>
            <text x="50" y="95" fontSize="12" textAnchor="middle">F1</text>
            <path d="M 350 60 L 360 80 L 340 80 Z" fill="hsl(var(--secondary))" stroke="black"/>
            <text x="350" y="95" fontSize="12" textAnchor="middle">F2</text>
            <line x1="200" y1="50" x2="200" y2="70" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="195,70 205,70 200,80" fill="hsl(var(--destructive))"/>
            <text x="200" y="95" fontSize="12" textAnchor="middle">400 N</text>
            <line x1="280" y1="50" x2="280" y2="70" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="275,70 285,70 280,80" fill="hsl(var(--destructive))"/>
            <text x="280" y="95" fontSize="12" textAnchor="middle">800 N</text>
             <line x1="280" y1="110" x2="350" y2="110" stroke="black" strokeDasharray="2,2"/>
             <text x="315" y="125" fontSize="12" textAnchor="middle">1.5 m</text>
        </svg>
    </div>
);

export const HangingSign = () => (
    <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
        <svg width="250" height="150" viewBox="0 0 250 150">
            <rect x="20" y="70" width="210" height="10" fill="hsl(var(--primary))" stroke="black" />
            <path d="M 125 80 L 135 110 L 115 110 Z" fill="hsl(var(--secondary))" stroke="black"/>

            {/* Weight W */}
            <line x1="75" y1="80" x2="75" y2="100" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="70,100 80,100 75,110" fill="hsl(var(--destructive))"/>
            <text x="75" y="125" fontSize="12" textAnchor="middle">W</text>
             <line x1="75" y1="65" x2="125" y2="65" stroke="black" strokeDasharray="2,2"/>
            <text x="100" y="60" fontSize="12" textAnchor="middle">L/4</text>

            {/* Weight 2W */}
            <line x1="200" y1="80" x2="200" y2="100" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="195,100 205,100 200,110" fill="hsl(var(--destructive))"/>
            <text x="200" y="125" fontSize="12" textAnchor="middle">2W</text>
             <line x1="125" y1="65" x2="200" y2="65" stroke="black" strokeDasharray="2,2"/>
            <text x="162.5" y="60" fontSize="12" textAnchor="middle">d = ?</text>
        </svg>
    </div>
);

export const Ladder = () => (
    <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
        <svg width="200" height="220" viewBox="0 0 200 220">
            <line x1="20" y1="200" x2="180" y2="200" stroke="black" strokeWidth="2"/>
            <line x1="20" y1="20" x2="20" y2="200" stroke="black" strokeWidth="2"/>
            <g transform="translate(20, 200) rotate(-60)">
              <rect x="0" y="-5" width="150" height="10" fill="hsl(var(--primary))" stroke="black"/>
            </g>
            <text x="70" y="100" fontSize="12">W = 300 N</text>
            <text x="80" y="180" fontSize="12">60°</text>
        </svg>
    </div>
);

export const BeamWithWeight = () => (
    <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
        <svg width="350" height="150" viewBox="0 0 350 150">
            <rect x="20" y="70" width="310" height="10" fill="hsl(var(--primary))" stroke="black"/>
            <path d="M 20 80 L 30 110 L 10 110 Z" fill="hsl(var(--secondary))" stroke="black"/>
            <text x="20" y="125" fontSize="12" textAnchor="middle">Pivot</text>
            <line x1="120" y1="70" x2="120" y2="90" stroke="hsl(var(--destructive))" strokeWidth="2"/>
            <polygon points="115,90 125,90 120,100" fill="hsl(var(--destructive))"/>
            <text x="120" y="115" fontSize="12" textAnchor="middle">100 N</text>
            <line x1="280" y1="80" x2="280" y2="100" stroke="hsl(var(--primary-foreground))" strokeWidth="2"/>
            <polygon points="275,80 285,80 280,70" fill="hsl(var(--primary-foreground))"/>
            <text x="280" y="60" fontSize="12" textAnchor="middle">F = ?</text>
            <line x1="20" y1="60" x2="120" y2="60" strokeDasharray="2,2" stroke="black"/>
            <text x="70" y="55" fontSize="12" textAnchor="middle">1.0 m</text>
            <line x1="20" y1="50" x2="280" y2="50" strokeDasharray="2,2" stroke="black"/>
            <text x="150" y="45" fontSize="12" textAnchor="middle">2.8 m</text>
        </svg>
    </div>
);

