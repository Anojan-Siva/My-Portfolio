import React, { useState, useEffect } from 'react';
import './InteractiveBackground.css';

export default function InteractiveBackground() {
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      // Match the 60px grid size
      const squareSize = 60;
      const cols = Math.ceil(window.innerWidth / squareSize);
      const rows = Math.ceil(window.innerHeight / squareSize);
      setDimensions({ cols, rows });
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  const totalSquares = dimensions.cols * dimensions.rows;

  return (
    <div className="interactive-bg" aria-hidden="true">
      {Array.from({ length: totalSquares }).map((_, i) => (
        <div key={i} className="interactive-square"></div>
      ))}
    </div>
  );
}
