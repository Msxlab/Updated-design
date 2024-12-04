import React from "react";
import { Grid } from "./Grid";
import { Rnd } from "react-rnd";

export const CountertopCanvas = ({
  countertops,
  setCountertops, // Props olarak alınıyor
  selectedIds,
  zoom,
  showGrid,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onUpdateCountertop,
}) => {
  // Yatay ve dikey bölme işlevleri
  const handleSplitHorizontal = (id) => {
    setCountertops((prev) =>
      prev.flatMap((c) =>
        c.id === id
          ? [
              { ...c, id: Date.now(), height: c.height / 2 },
              { ...c, id: Date.now() + 1, y: c.y + c.height / 2, height: c.height / 2 },
            ]
          : c
      )
    );
  };

  const handleSplitVertical = (id) => {
    setCountertops((prev) =>
      prev.flatMap((c) =>
        c.id === id
          ? [
              { ...c, id: Date.now(), width: c.width / 2 },
              { ...c, id: Date.now() + 1, x: c.x + c.width / 2, width: c.width / 2 },
            ]
          : c
      )
    );
  };

  return (
    <div
      className="flex-1 relative bg-gray-50"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* Grid Sistemi */}
      <Grid show={showGrid} />

      {/* Bölme Butonları */}
      <div className="absolute top-2 left-2 space-y-2">
        <button
          onClick={() => handleSplitHorizontal(selectedIds[0])}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Split Horizontal
        </button>
        <button
          onClick={() => handleSplitVertical(selectedIds[0])}
          className="p-2 bg-green-500 text-white rounded"
        >
          Split Vertical
        </button>
      </div>

      {/* Tezgahlar */}
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "0 0",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        {countertops.map((ct) => (
          <Rnd
            key={ct.id}
            size={{ width: ct.width * 5, height: ct.height * 5 }}
            position={{ x: ct.x, y: ct.y }}
            onDragStop={(e, d) => {
              onUpdateCountertop(ct.id, "x", d.x);
              onUpdateCountertop(ct.id, "y", d.y);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              onUpdateCountertop(ct.id, "width", parseInt(ref.style.width) / 5);
              onUpdateCountertop(ct.id, "height", parseInt(ref.style.height) / 5);
              onUpdateCountertop(ct.id, "x", position.x);
              onUpdateCountertop(ct.id, "y", position.y);
            }}
            className={`border ${
              selectedIds.includes(ct.id) ? "border-blue-500" : "border-gray-500"
            }`}
            style={{
              boxShadow: selectedIds.includes(ct.id)
                ? "0 8px 16px rgba(0,0,0,0.2)"
                : "0 4px 8px rgba(0,0,0,0.1)",
              backgroundColor: ct.color,
              borderRadius: `${ct.borderRadius}px`,
            }}
          >
            {/* Tezgah Gövdesi */}
            <div
              style={{
                height: "100%",
                backgroundColor: ct.color,
                transform: `rotate(${ct.rotation}deg)`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
            ></div>

            {/* Ölçü Etiketleri */}
            <div className="absolute -top-5 w-full text-center">
              {ct.width.toFixed(1)}"
            </div>
            <div className="absolute -left-7 top-1/2 -rotate-90 origin-left">
              {ct.height.toFixed(1)}"
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};
