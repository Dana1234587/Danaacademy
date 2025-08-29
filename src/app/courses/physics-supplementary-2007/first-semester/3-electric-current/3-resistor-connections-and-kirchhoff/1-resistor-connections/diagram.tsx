
import React from 'react';

export const ResistorsInSeries = () => (
  <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
    <svg width="250" height="100" viewBox="0 0 250 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="50" x2="50" y2="50" stroke="black" strokeWidth="2" />
      <rect x="50" y="40" width="40" height="20" fill="none" stroke="black" strokeWidth="2" />
      <text x="70" y="35" textAnchor="middle" fontSize="12">R1</text>
      <line x1="90" y1="50" x2="110" y2="50" stroke="black" strokeWidth="2" />
      <rect x="110" y="40" width="40" height="20" fill="none" stroke="black" strokeWidth="2" />
      <text x="130" y="35" textAnchor="middle" fontSize="12">R2</text>
      <line x1="150" y1="50" x2="170" y2="50" stroke="black" strokeWidth="2" />
      <rect x="170" y="40" width="40" height="20" fill="none" stroke="black" strokeWidth="2" />
      <text x="190" y="35" textAnchor="middle" fontSize="12">R3</text>
      <line x1="210" y1="50" x2="240" y2="50" stroke="black" strokeWidth="2" />
    </svg>
  </div>
);

export const ResistorsInParallel = () => (
    <div className="my-4 p-4 bg-muted rounded-lg flex justify-center items-center">
      <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="75" x2="50" y2="75" stroke="black" strokeWidth="2" />
        <line x1="150" y1="75" x2="190" y2="75" stroke="black" strokeWidth="2" />
        <line x1="50" y1="75" x2="50" y2="20" stroke="black" strokeWidth="2" />
        <line x1="50" y1="20" x2="70" y2="20" stroke="black" strokeWidth="2" />
        <rect x="70" y="10" width="60" height="20" fill="none" stroke="black" strokeWidth="2" />
        <text x="100" y="5" textAnchor="middle" fontSize="12">R1</text>
        <line x1="130" y1="20" x2="150" y2="20" stroke="black" strokeWidth="2" />
        <line x1="150" y1="20" x2="150" y2="75" stroke="black" strokeWidth="2" />
        <line x1="50" y1="75" x2="70" y2="75" stroke="black" strokeWidth="2" />
        <rect x="70" y="65" width="60" height="20" fill="none" stroke="black" strokeWidth="2" />
        <text x="100" y="60" textAnchor="middle" fontSize="12">R2</text>
        <line x1="130" y1="75" x2="150" y2="75" stroke="black" strokeWidth="2" />
        <line x1="50" y1="75" x2="50" y2="130" stroke="black" strokeWidth="2" />
        <line x1="50" y1="130" x2="70" y2="130" stroke="black" strokeWidth="2" />
        <rect x="70" y="120" width="60" height="20" fill="none" stroke="black" strokeWidth="2" />
        <text x="100" y="115" textAnchor="middle" fontSize="12">R3</text>
        <line x1="130" y1="130" x2="150" y2="130" stroke="black" strokeWidth="2" />
        <line x1="150" y1="130" x2="150" y2="75" stroke="black" strokeWidth="2" />
      </svg>
    </div>
  );
