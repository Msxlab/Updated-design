// components/MeasurementTools.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const MeasurementTools = () => {
    const dispatch = useDispatch();
    const [activeTool, setActiveTool] = useState(null);
    const [measurements, setMeasurements] = useState([]);
    const [startPoint, setStartPoint] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const tools = [
        {
            id: 'dimension',
            name: 'Dimension',
            icon: '📏',
            description: 'Add dimension lines'
        },
        {
            id: 'measure',
            name: 'Measure',
            icon: '📍',
            description: 'Measure distance'
        },
        {
            id: 'angle',
            name: 'Angle',
            icon: '📐',
            description: 'Measure angle'
        }
    ];

    const handleMouseDown = (e) => {
        if (!activeTool) return;

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setStartPoint({ x, y });
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing || !startPoint) return;

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Geçici ölçüm çizgisi göster
        drawTemporaryMeasurement(startPoint, { x, y });
    };

    const handleMouseUp = (e) => {
        if (!isDrawing || !startPoint) return;

        const rect = e.target.getBoundingClientRect();
        const endPoint = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        addMeasurement(startPoint, endPoint);
        setIsDrawing(false);
        setStartPoint(null);
    };

    const addMeasurement = (start, end) => {
        const newMeasurement = {
            id: Date.now(),
            type: activeTool,
            start,
            end,
            value: calculateMeasurement(start, end)
        };

        setMeasurements([...measurements, newMeasurement]);
    };

    const calculateMeasurement = (start, end) => {
        switch (activeTool) {
            case 'dimension':
                return {
                    distance: Math.sqrt(
                        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
                    ) / 10, // Piksel to inch conversion
                    label: 'inches'
                };
            case 'angle':
                const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
                return {
                    angle: angle < 0 ? angle + 360 : angle,
                    label: 'degrees'
                };
            default:
                return null;
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Measurement Tools</h3>
            
            <div className="flex gap-2 mb-4">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        className={`p-2 rounded-lg flex items-center gap-2 ${
                            activeTool === tool.id 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => setActiveTool(tool.id)}
                        title={tool.description}
                    >
                        <span>{tool.icon}</span>
                        <span>{tool.name}</span>
                    </button>
                ))}
            </div>

            <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Measurements</h4>
                <ul className="space-y-2">
                    {measurements.map(measurement => (
                        <li 
                            key={measurement.id}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                            <span>
                                {measurement.type === 'dimension' 
                                    ? `Distance: ${measurement.value.distance.toFixed(2)} ${measurement.value.label}`
                                    : `Angle: ${measurement.value.angle.toFixed(1)}°`
                                }
                            </span>
                            <button
                                onClick={() => setMeasurements(
                                    measurements.filter(m => m.id !== measurement.id)
                                )}
                                className="text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
