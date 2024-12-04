
import React, { useState } from "react";

export const InteractiveElements = ({ elements, onAddElement, onUpdateElement }) => {
    const [selectedElement, setSelectedElement] = useState(null);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Interactive Elements</h2>

            <button
                onClick={() => onAddElement("edge")}
                className="p-2 bg-blue-500 text-white rounded mr-2"
            >
                Add Edge
            </button>
            <button
                onClick={() => onAddElement("cooktop")}
                className="p-2 bg-green-500 text-white rounded mr-2"
            >
                Add Cooktop
            </button>
            <button
                onClick={() => onAddElement("sink")}
                className="p-2 bg-yellow-500 text-white rounded"
            >
                Add Sink
            </button>

            <ul className="mt-4">
                {elements.map((element, index) => (
                    <li
                        key={index}
                        className={`p-2 rounded shadow mb-2 flex justify-between ${
                            selectedElement === index ? "bg-blue-100" : "bg-white"
                        }`}
                        onClick={() => setSelectedElement(index)}
                    >
                        <span>{element.type} - {element.name || "Unnamed"}</span>
                        <div>
                            <button
                                className="p-2 bg-yellow-500 text-white rounded mr-2"
                                onClick={() => onUpdateElement(index, { name: `Updated ${element.type}` })}
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
