
'use client';
import React from 'react';

export const UniformBeam = () => (
  <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
    <svg width="400" height="150" viewBox="0 0 400 150">
      {/* Beam */}
      <rect x="20" y="50" width="360" height="10" fill="hsl(var(--primary))" stroke="black" strokeWidth="1" />
      
      {/* Left Support (Pivot) */}
      <path d="M 20 60 L 40 100 L 0 100 Z" fill="hsl(var(--secondary))" stroke="black" />
      <text x="20" y="115" fontSize="12">FL</text>

      {/* Right Support */}
      <path d="M 380 60 L 400 100 L 360 100 Z" fill="hsl(var(--secondary))" stroke="black" />
      <text x="380" y="115" fontSize="12">FR</text>
      
      {/* Beam Weight */}
      <line x1="200" y1="55" x2="200" y2="80" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <polygon points="195,80 205,80 200,90" fill="hsl(var(--destructive))" />
      <text x="200" y="105" fontSize="12">200 N</text>
      
      {/* Child's Weight */}
      <line x1="164" y1="55" x2="164" y2="80" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <polygon points="159,80 169,80 164,90" fill="hsl(var(--destructive))" />
      <text x="164" y="105" fontSize="12">300 N</text>

      {/* Dimensions */}
      <line x1="20" y1="130" x2="164" y2="130" stroke="black" strokeDasharray="3,3"/>
      <line x1="20" y1="125" x2="20" y2="135" stroke="black"/>
      <line x1="164" y1="125" x2="164" y2="135" stroke="black"/>
      <text x="92" y="145" fontSize="12">2 m</text>
      <line x1="20" y1="120" x2="380" y2="120" stroke="black" strokeDasharray="3,3"/>
      <text x="200" y="110" fontSize="12">5 m</text>
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
             <line x1="50" y1="40" x2="350" y2="40" stroke="black" strokeDasharray="2,2"/>
             <text x="200" y="35" fontSize="12" textAnchor="middle">6 m</text>
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

export const SeesawFindDistance = () => (
     <div className="my-4 p-4 bg-muted/50 rounded-lg flex justify-center items-center">
    <svg width="400" height="150" viewBox="0 0 400 150">
      {/* Seesaw Beam */}
      <rect x="50" y="50" width="300" height="10" fill="hsl(var(--primary))" stroke="black" strokeWidth="1" />
      
      {/* Pivot */}
      <path d="M 200 60 L 220 100 L 180 100 Z" fill="hsl(var(--secondary))" stroke="black" />
      
      {/* Child 1 */}
      <rect x="120" y="30" width="20" height="20" fill="hsl(var(--destructive))" />
      <line x1="130" y1="50" x2="130" y2="70" stroke="hsl(var(--destructive))" strokeWidth="2"/>
      <polygon points="125,70 135,70 130,80" fill="hsl(var(--destructive))" />
      <text x="130" y="95" fontSize="12">400 N</text>
      
      {/* Child 2 */}
      <rect x="280" y="30" width="20" height="20" fill="hsl(var(--destructive))" />
      <line x1="290" y1="50" x2="290" y2="70" stroke="hsl(var(--destructive))" strokeWidth="2"/>
      <polygon points="285,70 295,70 290,80" fill="hsl(var(--destructive))" />
      <text x="290" y="95" fontSize="12">300 N</text>

       {/* Dimensions */}
      <line x1="130" y1="110" x2="200" y2="110" stroke="black" strokeDasharray="3,3"/>
      <line x1="130" y1="105" x2="130" y2="115" stroke="black"/>
      <line x1="200" y1="105" x2="200" y2="115" stroke="black"/>
      <text x="165" y="125" fontSize="12">1.5 m</text>
      
       <line x1="200" y1="110" x2="290" y2="110" stroke="black" strokeDasharray="3,3"/>
       <line x1="290" y1="105" x2="290" y2="115" stroke="black"/>
       <text x="245" y="125" fontSize="12">d = ?</text>
    </svg>
  </div>
);


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

