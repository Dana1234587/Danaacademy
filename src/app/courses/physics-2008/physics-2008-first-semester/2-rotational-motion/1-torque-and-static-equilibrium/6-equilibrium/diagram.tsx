
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

export const Seesaw = () => (
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
