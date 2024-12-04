import { useState } from 'react';

export const useHistory = (initialState) => {
  const [states, setStates] = useState([initialState]);
  const [index, setIndex] = useState(0);

  const push = (newState) => {
    setStates(prev => [...prev.slice(0, index + 1), newState]);
    setIndex(prev => prev + 1);
  };

  const undo = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      return states[index - 1];
    }
    return states[0];
  };

  const redo = () => {
    if (index < states.length - 1) {
      setIndex(prev => prev + 1);
      return states[index + 1];
    }
    return states[index];
  };

  return {
    push,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < states.length - 1
  };
};