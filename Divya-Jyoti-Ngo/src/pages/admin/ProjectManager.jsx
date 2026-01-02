import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Button from '../../components/ui/Button';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        summary: '',
        date: '',
        image: null
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
        } catch (error) {
            toast.error('Failed to fetch projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('summary', formData.summary);
        data.append('date', formData.date);

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (editingProject) {
                await api.put(`/projects/${editingProject._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Project updated successfully');
            } else {
                await api.post('/projects', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Project created successfully');
            }
            closeModal();
            fetchProjects();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                toast.success('Project deleted');
                fetchProjects();
            } catch (error) {
                toast.error('Failed to delete project');
            }
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                category: project.category,
                summary: project.summary,
                date: project.date.split('T')[0], // Format for date input
                image: null // Don't preload image file, only URL exists
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                description: '',
                category: '',
                summary: '',
                date: '',
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Projects</h1>
                    <p className="text-neutral-500 text-sm">Create and edit outreach projects</p>
                </div>
                <Button onClick={() => openModal()} icon={Plus} className="w-full sm:w-auto">Add Project</Button>
            </div>

            <div className="bg-white rounded-xl shadow border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                            {projects.map((project) => (
                                <tr key={project._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={project.image} alt={project.title} className="h-10 w-10 rounded-full object-cover" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">{project.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-neutral-500">{project.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-neutral-500">{new Date(project.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openModal(project)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                                    <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                                    <input required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Summary (Short)</label>
                                <textarea required name="summary" value={formData.summary} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Description (Full)</label>
                                <textarea required name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="5" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
                                    <input type="date" required name="date" value={formData.date} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Image</label>
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                    {editingProject && !formData.image && (
                                        <p className="text-xs text-neutral-400 mt-1">Leave empty to keep current image</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                                <Button type="submit">{editingProject ? 'Update Project' : 'Create Project'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;
