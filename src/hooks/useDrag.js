import { useState } from 'react';

const GRID_SIZE = 10;

export const useDrag = (zoom = 1, enableSnap = true) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const snapToGrid = (value) => enableSnap ? Math.round(value / GRID_SIZE) * GRID_SIZE : value;

  const startDrag = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const onDrag = (e) => {
    if (!isDragging) return null;

    const deltaX = snapToGrid((e.clientX - startPos.x) / zoom);
    const deltaY = snapToGrid((e.clientY - startPos.y) / zoom);

    setStartPos({
      x: e.clientX,
      y: e.clientY
    });

    return { x: deltaX, y: deltaY };
  };

  const stopDrag = () => setIsDragging(false);

  return {
    isDragging,
    startDrag,
    onDrag,
    stopDrag
  };
};