
import React, { useState } from "react";

export const StoneSelection = ({ onNext }) => {
    const [stoneType, setStoneType] = useState("");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleNext = () => {
        if (!stoneType || dimensions.width <= 0 || dimensions.height <= 0) {
            alert("Please select a stone type and enter valid dimensions.");
            return;
        }
        onNext(stoneType, dimensions);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Stone Type and Dimensions</h2>
            <div className="mb-4">
                <label className="block mb-2">Stone Type</label>
                <select
                    value={stoneType}
                    onChange={(e) => setStoneType(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option value="">Select Stone</option>
                    <option value="granite">Granite</option>
                    <option value="marble">Marble</option>
                    <option value="quartz">Quartz</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Dimensions (inches)</label>
                <div className="flex space-x-4">
                    <input
                        type="number"
                        placeholder="Width"
                        value={dimensions.width}
                        onChange={(e) =>
                            setDimensions((prev) => ({ ...prev, width: parseInt(e.target.value) }))
                        }
                        className="p-2 border rounded w-full"
                    />
                    <input
                        type="number"
                        placeholder="Height"
                        value={dimensions.height}
                        onChange={(e) =>
                            setDimensions((prev) => ({ ...prev, height: parseInt(e.target.value) }))
                        }
                        className="p-2 border rounded w-full"
                    />
                </div>
            </div>
            <button
                onClick={handleNext}
                className="p-2 bg-blue-500 text-white rounded"
            >
                Next
            </button>
        </div>
    );
};
