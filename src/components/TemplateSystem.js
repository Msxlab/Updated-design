// components/TemplateSystem.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const TemplateSystem = () => {
    const dispatch = useDispatch();
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [showSaveDialog, setShowSaveDialog] = useState(false);

    const countertops = useSelector(state => state.counterTop.countertops);

    // Hazır şablonlar
    const defaultTemplates = [
        {
            id: 'L-shaped',
            name: 'L Şeklinde Tezgah',
            description: 'Mutfak köşesi için L şeklinde tezgah tasarımı',
            thumbnail: '🔲',
            countertops: [
                {
                    width: 72,
                    height: 24,
                    depth: 1.5,
                    x: 0,
                    y: 0,
                    rotation: 0
                },
                {
                    width: 24,
                    height: 72,
                    depth: 1.5,
                    x: 72,
                    y: 24,
                    rotation: 90
                }
            ]
        },
        {
            id: 'U-shaped',
            name: 'U Şeklinde Tezgah',
            description: 'Büyük mutfaklar için U şeklinde tezgah tasarımı',
            thumbnail: '🔲',
            countertops: [
                {
                    width: 72,
                    height: 24,
                    depth: 1.5,
                    x: 0,
                    y: 0,
                    rotation: 0
                },
                {
                    width: 72,
                    height: 24,
                    depth: 1.5,
                    x: 72,
                    y: 72,
                    rotation: 90
                },
                {
                    width: 72,
                    height: 24,
                    depth: 1.5,
                    x: 144,
                    y: 0,
                    rotation: 0
                }
            ]
        }
    ];

    useEffect(() => {
        // Yerel depolamadan şablonları yükle
        const savedTemplates = localStorage.getItem('countertopTemplates');
        if (savedTemplates) {
            setTemplates([...defaultTemplates, ...JSON.parse(savedTemplates)]);
        } else {
            setTemplates(defaultTemplates);
        }
    }, []);

    const saveTemplate = () => {
        if (!newTemplateName) return;

        const newTemplate = {
            id: Date.now().toString(),
            name: newTemplateName,
            description: 'Custom template',
            thumbnail: '🔲',
            countertops: countertops,
            createdAt: new Date().toISOString()
        };

        const updatedTemplates = [...templates, newTemplate];
        setTemplates(updatedTemplates);
        localStorage.setItem('countertopTemplates', JSON.stringify(updatedTemplates));
        setShowSaveDialog(false);
        setNewTemplateName('');
    };

    const loadTemplate = (template) => {
        dispatch({
            type: 'counterTop/loadTemplate',
            payload: template.countertops
        });
        setSelectedTemplate(template.id);
    };

    const deleteTemplate = (templateId) => {
        const updatedTemplates = templates.filter(t => t.id !== templateId);
        setTemplates(updatedTemplates);
        localStorage.setItem('countertopTemplates', JSON.stringify(updatedTemplates));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Şablonlar</h2>
                <button
                    onClick={() => setShowSaveDialog(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Şablon Olarak Kaydet
                </button>
            </div>

            {showSaveDialog && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <input
                        type="text"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="Şablon adı"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={saveTemplate}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Kaydet
                        </button>
                        <button
                            onClick={() => setShowSaveDialog(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            İptal
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                    <div
                        key={template.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors
                                 ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{template.name}</h3>
                            {template.id !== 'L-shaped' && template.id !== 'U-shaped' && (
                                <button
                                    onClick={() => deleteTemplate(template.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            {template.description}
                        </p>
                        <div className="text-center text-4xl mb-2">
                            {template.thumbnail}
                        </div>
                        <button
                            onClick={() => loadTemplate(template)}
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Kullan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
