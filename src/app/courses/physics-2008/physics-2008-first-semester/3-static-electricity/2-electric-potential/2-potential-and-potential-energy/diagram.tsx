
'use client';
import React from 'react';

export const UniformFieldDiagram = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="150" viewBox="0 0 250 150">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      {/* Electric Field Lines */}
      {[...Array(5)].map((_, i) => (
        <line 
          key={i} 
          x1="20" y1={30 + i * 20} 
          x2="230" y2={30 + i * 20} 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
      ))}
      <text x="235" y="25" fontSize="14" fill="hsl(var(--primary))">E</text>

      {/* Negative Charge */}
      <circle cx="80" cy="75" r="8" fill="hsl(var(--destructive))" />
      <text x="77" y="80" fill="white" fontSize="12">-</text>

       {/* Velocity Vector */}
      <line x1="85" y1="75" x2="140" y2="75" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <text x="110" y="70" fontSize="12" fill="black">v</text>
    </svg>
  </div>
);

export const NegativeChargeAgainstField = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="150" viewBox="0 0 250 150">
      <defs>
        <marker id="arrowhead-black-against" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
        <marker id="arrowhead-primary-against" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      {/* Electric Field Lines */}
      {[...Array(5)].map((_, i) => (
        <line 
          key={i} 
          x1="20" y1={30 + i * 20} 
          x2="230" y2={30 + i * 20} 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-primary-against)"
        />
      ))}
      <text x="235" y="25" fontSize="14" fill="hsl(var(--primary))">E</text>

      {/* Negative Charge */}
      <circle cx="125" cy="75" r="8" fill="hsl(var(--destructive))" />
      <text x="122" y="80" fill="white" fontSize="12">-</text>

       {/* Velocity Vector (moving left) */}
      <line x1="120" y1="75" x2="65" y2="75" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead-black-against)" />
      <text x="85" y="70" fontSize="12" fill="black">v</text>
      
       {/* Force Vector (moving left) */}
      <line x1="125" y1="95" x2="70" y2="95" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arrowhead-black-against)" />
      <text x="90" y="110" fontSize="12" fill="hsl(var(--destructive))" fontWeight="bold">F_e</text>
    </svg>
  </div>
);

export const NegativeChargeWithField = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="150" viewBox="0 0 250 150">
      <defs>
        <marker id="arrowhead-black-with" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
        <marker id="arrowhead-primary-with" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      {/* Electric Field Lines */}
      {[...Array(5)].map((_, i) => (
        <line 
          key={i} 
          x1="20" y1={30 + i * 20} 
          x2="230" y2={30 + i * 20} 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5"
          markerEnd="url(#arrowhead-primary-with)"
        />
      ))}
      <text x="235" y="25" fontSize="14" fill="hsl(var(--primary))">E</text>

      {/* Negative Charge */}
      <circle cx="80" cy="75" r="8" fill="hsl(var(--destructive))" />
      <text x="77" y="80" fill="white" fontSize="12">-</text>

       {/* Velocity Vector (moving right) */}
      <line x1="85" y1="75" x2="140" y2="75" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead-black-with)" />
      <text x="110" y="70" fontSize="12" fill="black">v</text>
      
       {/* External Force Vector (moving right) */}
      <line x1="85" y1="95" x2="140" y2="95" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead-black-with)" />
      <text x="110" y="110" fontSize="12" fill="hsl(var(--primary))" fontWeight="bold">F_ext</text>
    </svg>
  </div>
);
