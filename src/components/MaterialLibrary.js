
// components/MaterialLibrary.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCountertop } from '../store/slices/counterTopSlice';

export const MaterialLibrary = () => {
    const dispatch = useDispatch();
    const { activeId } = useSelector(state => state.counterTop);

    const materials = {
        granite: [
            {
                id: 'black-pearl',
                name: 'Black Pearl',
                color: '#1a1a1a',
                texture: 'granite',
                price: 80
            },
            {
                id: 'steel-grey',
                name: 'Steel Grey',
                color: '#4a4a4a',
                texture: 'granite',
                price: 75
            },
            {
                id: 'blue-pearl',
                name: 'Blue Pearl',
                color: '#2c3e50',
                texture: 'granite',
                price: 90
            }
        ],
        marble: [
            {
                id: 'carrara',
                name: 'Carrara',
                color: '#f5f5f5',
                texture: 'marble',
                price: 120
            },
            {
                id: 'emperador',
                name: 'Emperador',
                color: '#8b4513',
                texture: 'marble',
                price: 150
            },
            {
                id: 'calacatta',
                name: 'Calacatta',
                color: '#ffffff',
                texture: 'marble',
                price: 200
            }
        ],
        quartz: [
            {
                id: 'pure-white',
                name: 'Pure White',
                color: '#ffffff',
                texture: 'quartz',
                price: 100
            },
            {
                id: 'concrete',
                name: 'Concrete',
                color: '#808080',
                texture: 'quartz',
                price: 95
            }
        ]
    };

    const finishTypes = [
        { id: 'polished', name: 'Polished', priceMultiplier: 1.2 },
        { id: 'honed', name: 'Honed', priceMultiplier: 1.1 },
        { id: 'leathered', name: 'Leathered', priceMultiplier: 1.3 },
        { id: 'brushed', name: 'Brushed', priceMultiplier: 1.25 }
    ];

    const edgeProfiles = [
        { id: 'straight', name: 'Straight', priceAdd: 0 },
        { id: 'beveled', name: 'Beveled', priceAdd: 10 },
        { id: 'bullnose', name: 'Bullnose', priceAdd: 15 },
        { id: 'ogee', name: 'Ogee', priceAdd: 20 }
    ];

    const handleMaterialSelect = (material) => {
        if (!activeId) return;
        
        dispatch(updateCountertop({
            id: activeId,
            updates: {
                material: material.id,
                materialColor: material.color,
                materialTexture: material.texture,
                basePrice: material.price
            }
        }));
    };

    const handleFinishSelect = (finish) => {
        if (!activeId) return;
        
        dispatch(updateCountertop({
            id: activeId,
            updates: {
                finish: finish.id,
                priceMultiplier: finish.priceMultiplier
            }
        }));
    };

    const handleEdgeSelect = (edge) => {
        if (!activeId) return;
        
        dispatch(updateCountertop({
            id: activeId,
            updates: {
                edgeProfile: edge.id,
                edgePriceAdd: edge.priceAdd
            }
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Material Library</h2>
            
            {/* Material Type Sections */}
            {Object.entries(materials).map(([type, materialList]) => (
                <div key={type} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 capitalize">{type}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {materialList.map(material => (
                            <button
                                key={material.id}
                                onClick={() => handleMaterialSelect(material)}
                                className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                            >
                                <div 
                                    className="w-full h-24 rounded mb-2"
                                    style={{ backgroundColor: material.color }}
                                />
                                <p className="font-medium">{material.name}</p>
                                <p className="text-sm text-gray-600">${material.price}/sq ft</p>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* Finish Types */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Finish Types</h3>
                <div className="grid grid-cols-2 gap-4">
                    {finishTypes.map(finish => (
                        <button
                            key={finish.id}
                            onClick={() => handleFinishSelect(finish)}
                            className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                        >
                            <p className="font-medium">{finish.name}</p>
                            <p className="text-sm text-gray-600">
                                Price: {(finish.priceMultiplier - 1) * 100}% extra
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Edge Profiles */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Edge Profiles</h3>
                <div className="grid grid-cols-2 gap-4">
                    {edgeProfiles.map(edge => (
                        <button
                            key={edge.id}
                            onClick={() => handleEdgeSelect(edge)}
                            className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
                        >
                            <p className="font-medium">{edge.name}</p>
                            <p className="text-sm text-gray-600">
                                +${edge.priceAdd}/linear ft
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
