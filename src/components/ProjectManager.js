// components/ProjectManager.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { projectService } from '../services/projectService';
import { loadProject, updateProject } from '../store/slices/counterTopSlice';

export const ProjectManager = () => {
    const dispatch = useDispatch();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setIsLoading(true);
        try {
            const userProjects = await projectService.getUserProjects();
            setProjects(userProjects);
        } catch (error) {
            console.error('Error loading projects:', error);
            alert('Failed to load projects');
        }
        setIsLoading(false);
    };

    const handleSaveProject = async () => {
        setIsSaving(true);
        try {
            const state = dispatch((state) => state.counterTop);
            const projectId = await projectService.saveProject({
                name: 'New Project', // Kullanıcıdan isim alınabilir
                countertops: state.countertops,
                customerInfo: state.customerInfo,
                measurements: state.measurements
            });
            alert('Project saved successfully!');
            loadProjects(); // Listeyi yenile
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
        setIsSaving(false);
    };

    const handleLoadProject = async (projectId) => {
        setIsLoading(true);
        try {
            const project = await projectService.loadProject(projectId);
            dispatch(loadProject(project));
            setSelectedProject(projectId);
        } catch (error) {
            console.error('Error loading project:', error);
            alert('Failed to load project');
        }
        setIsLoading(false);
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <button
                    onClick={handleSaveProject}
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                             disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'Saving...' : 'Save Project'}
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            {isLoading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map(project => (
                        <div
                            key={project.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors
                                     ${selectedProject === project.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}`}
                            onClick={() => handleLoadProject(project.id)}
                        >
                            {project.thumbnail && (
                                <img
                                    src={project.thumbnail}
                                    alt={project.name}
                                    className="w-full h-32 object-cover rounded mb-2"
                                />
                            )}
                            <h3 className="font-medium">{project.name}</h3>
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Customer: {project.customerInfo?.name || 'No customer'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
