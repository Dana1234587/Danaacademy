
import React from 'react';

export const WheatstoneBridge = ({ r1="R1", r2="R2", r3="R3", r4="R4", r5="R5" }: {r1?: string, r2?: string, r3?: string, r4?: string, r5?: string}) => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="100" x2="50" y2="100" stroke="black" strokeWidth="2" />
      <circle cx="50" cy="100" r="3" fill="black" />
      <text x="45" y="120" fontSize="12">a</text>

      <line x1="50" y1="100" x2="100" y2="40" stroke="black" strokeWidth="2" />
      <rect x="105" y="30" width="40" height="20" transform="rotate(-53 125 40)" fill="none" stroke="black" strokeWidth="2" />
      <text x="100" y="25" textAnchor="middle" fontSize="12">{r1}</text>
      
      <line x1="150" y1="20" x2="200" y2="40" stroke="black" strokeWidth="2" />
      <rect x="155" y="30" width="40" height="20" transform="rotate(53 175 40)" fill="none" stroke="black" strokeWidth="2" />
      <text x="200" y="25" textAnchor="middle" fontSize="12">{r2}</text>
      
      <line x1="50" y1="100" x2="100" y2="160" stroke="black" strokeWidth="2" />
      <rect x="105" y="150" width="40" height="20" transform="rotate(53 125 160)" fill="none" stroke="black" strokeWidth="2" />
      <text x="100" y="185" textAnchor="middle" fontSize="12">{r3}</text>

      <line x1="150" y1="180" x2="200" y2="160" stroke="black" strokeWidth="2" />
      <rect x="155" y="150" width="40" height="20" transform="rotate(-53 175 160)" fill="none" stroke="black" strokeWidth="2" />
      <text x="200" y="185" textAnchor="middle" fontSize="12">{r4}</text>

      <line x1="150" y1="20" x2="150" y2="80" stroke="black" strokeWidth="2" />
      <rect x="140" y="80" width="20" height="40" fill="none" stroke="black" strokeWidth="2" />
      <text x="125" y="105" textAnchor="middle" fontSize="12">{r5}</text>
      <line x1="150" y1="120" x2="150" y2="180" stroke="black" strokeWidth="2" />
      
      <circle cx="150" cy="20" r="3" fill="black" />
      <text x="150" y="15" textAnchor="middle" fontSize="12">c</text>
      <circle cx="150" cy="180" r="3" fill="black" />
      <text x="150" y="195" textAnchor="middle" fontSize="12">d</text>
      
      <line x1="250" y1="100" x2="290" y2="100" stroke="black" strokeWidth="2" />
      <circle cx="250" cy="100" r="3" fill="black" />
      <text x="255" y="120" fontSize="12">b</text>

      <line x1="200" y1="40" x2="250" y2="100" stroke="black" strokeWidth="2" />
      <line x1="200" y1="160" x2="250" y2="100" stroke="black" strokeWidth="2" />
    </svg>
  </div>
);
