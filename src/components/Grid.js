import React from 'react';

const GRID_SIZE = 10;

export const Grid = ({ show }) => !show ? null : (
  <div 
    className="absolute inset-0" 
    style={{
      backgroundImage: `linear-gradient(#ccc 1px, transparent 1px),
                       linear-gradient(90deg, #ccc 1px, transparent 1px)`,
      backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      opacity: 0.2,
      pointerEvents: 'none'
    }} 
  />
);