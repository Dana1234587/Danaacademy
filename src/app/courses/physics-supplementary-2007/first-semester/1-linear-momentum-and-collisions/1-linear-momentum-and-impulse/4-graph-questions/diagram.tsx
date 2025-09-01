
import React from 'react';

export const MomentumVelocityGraph = () => (
  <div className="my-4 p-4 bg-gray-100 rounded-lg flex justify-center items-center">
    <svg width="300" height="200" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="30" y1="200" x2="330" y2="200" stroke="black" strokeWidth="2" /> {/* X-axis */}
      <line x1="30" y1="200" x2="30" y2="20" stroke="black" strokeWidth="2" /> {/* Y-axis */}
      
      {/* X-axis label */}
      <text x="330" y="218" textAnchor="end" fontSize="14">v (m/s)</text>
      
      {/* Y-axis label */}
      <text x="12" y="25" textAnchor="middle" fontSize="14">p (kg.m/s)</text>

      {/* Ticks and labels on X-axis */}
      <text x="30" y="215" textAnchor="middle">0</text>
      <line x1="130" y1="195" x2="130" y2="205" stroke="black" strokeWidth="1" />
      <text x="130" y="215" textAnchor="middle">1</text>
      <line x1="230" y1="195" x2="230" y2="205" stroke="black" strokeWidth="1" />
      <text x="230" y="215" textAnchor="middle">2</text>
      <line x1="330" y1="195" x2="330" y2="205" stroke="black" strokeWidth="1" />
      <text x="330" y="215" textAnchor="middle">3</text>
      
      {/* Ticks and labels on Y-axis */}
       <line x1="25" y1="140" x2="35" y2="140" stroke="black" strokeWidth="1" />
      <text x="15" y="145" textAnchor="end">4</text>
      <line x1="25" y1="80" x2="35" y2="80" stroke="black" strokeWidth="1" />
      <text x="15" y="85" textAnchor="end">8</text>
       <line x1="25" y1="20" x2="35" y2="20" stroke="black" strokeWidth="1" />
      <text x="15" y="25" textAnchor="end">12</text>
      

      {/* Graph line A */}
      <path d="M 30 200 L 330 80" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      <text x="290" y="90" fill="hsl(var(--primary))" fontSize="14" fontWeight="bold">A</text>

       {/* Graph line B */}
       <path d="M 30 200 L 330 140" stroke="hsl(var(--destructive))" strokeWidth="3" fill="none" />
       <text x="290" y="150" fill="hsl(var(--destructive))" fontSize="14" fontWeight="bold">B</text>
    </svg>
  </div>
);

export const MomentumMassGraph = () => (
    <div className="my-4 p-4 bg-gray-100 rounded-lg flex justify-center items-center">
      <svg width="300" height="200" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg">
        {/* Axes */}
        <line x1="30" y1="200" x2="330" y2="200" stroke="black" strokeWidth="2" /> {/* X-axis */}
        <line x1="30" y1="200" x2="30" y2="20" stroke="black" strokeWidth="2" /> {/* Y-axis */}
        
        {/* X-axis label */}
        <text x="330" y="218" textAnchor="end" fontSize="14">m (kg)</text>
        
        {/* Y-axis label */}
       <text x="10" y="25" textAnchor="middle" fontSize="14">p (kg.m/s)</text>
  
        {/* Ticks and labels on X-axis */}
        <text x="30" y="215" textAnchor="middle">0</text>
        <line x1="105" y1="195" x2="105" y2="205" stroke="black" strokeWidth="1" />
        <text x="105" y="215" textAnchor="middle">1</text>
        <line x1="180" y1="195" x2="180" y2="205" stroke="black" strokeWidth="1" />
        <text x="180" y="215" textAnchor="middle">2</text>
        <line x1="255" y1="195" x2="255" y2="205" stroke="black" strokeWidth="1" />
        <text x="255" y="215" textAnchor="middle">3</text>
        <line x1="330" y1="195" x2="330" y2="205" stroke="black" strokeWidth="1" />
        <text x="330" y="215" textAnchor="middle">4</text>
        
        {/* Ticks and labels on Y-axis */}
        <line x1="25" y1="155" x2="35" y2="155" stroke="black" strokeWidth="1" />
        <text x="15" y="160" textAnchor="end">3</text>
        <line x1="25" y1="110" x2="35" y2="110" stroke="black" strokeWidth="1" />
        <text x="15" y="115" textAnchor="end">6</text>
        <line x1="25" y1="65" x2="35" y2="65" stroke="black" strokeWidth="1" />
        <text x="15" y="70" textAnchor="end">9</text>
        <line x1="25" y1="20" x2="35" y2="20" stroke="black" strokeWidth="1" />
        <text x="15" y="25" textAnchor="end">12</text>
  
        {/* Graph line */}
        <path d="M 30 200 L 330 20" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      </svg>
    </div>
  );

    