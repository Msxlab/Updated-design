import React from "react";

export const Header = ({ date, showGrid, setShowGrid, snapToGrid, setSnapToGrid, canUndo, canRedo, onUndo, onRedo }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Countertop Designer</h1>
        <p className="text-sm">{date.toLocaleTimeString()}</p>
      </div>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          onClick={onUndo}
          disabled={!canUndo}
        >
          Undo
        </button>
        <button
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          onClick={onRedo}
          disabled={!canRedo}
        >
          Redo
        </button>
      </div>
    </header>
  );
};
