import React from 'react';

export const ControlPanel = ({
  activeCountertop,
  onUpdateCountertop,
  onAddCountertop,
  onSplitHorizontal,
  onSplitVertical
}) => {
  if (!activeCountertop) return null;

  return (
    <div className="w-64 p-4 bg-gray-100 flex flex-col gap-4">
      <button 
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onAddCountertop}
      >
        Yeni Tezgah
      </button>

      <div className="flex gap-2">
        <button 
          className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onSplitHorizontal}
        >
          Yatay Böl
        </button>
        <button 
          className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onSplitVertical}
        >
          Dikey Böl
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-bold mb-2">Boyutlar</h4>
        {['width', 'height', 'depth'].map(dim => (
          <div key={dim} className="mb-2">
            <label className="block mb-1">
              {dim === 'width' ? 'Genişlik' : dim === 'height' ? 'Yükseklik' : 'Derinlik'}
            </label>
            <input
              type="range"
              min="2"
              max="100"
              value={activeCountertop[dim]}
              onChange={(e) => onUpdateCountertop(activeCountertop.id, dim, Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center">{activeCountertop[dim].toFixed(1)}"</div>
          </div>
        ))}
      </div>
    </div>
  );
};