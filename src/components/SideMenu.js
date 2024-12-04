import React from "react";

export const SideMenu = () => {
  return (
    <div className="w-64 bg-blue-100 h-full p-4">
      <h3 className="text-xl font-semibold mb-4">Tools</h3>
      <button className="w-full mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Zoom In
      </button>
      <button className="w-full mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Zoom Out
      </button>
      <button className="w-full mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Reset
      </button>
      <button className="w-full mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Pan
      </button>
    
    <button className="w-full mb-2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Edge
    </button>
    <button className="w-full mb-2 p-2 bg-orange-500 text-white rounded hover:bg-orange-600">
        Add Cooktop
    </button>
    <button className="w-full mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Sink
    </button>
    </div>
    
  );
};
