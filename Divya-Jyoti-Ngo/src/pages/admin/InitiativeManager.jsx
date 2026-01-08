import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Button from '../../components/ui/Button';

const InitiativeManager = () => {
    const [initiatives, setInitiatives] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInitiative, setEditingInitiative] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        imageUrlInput: '' // To allow pasting URL directly
    });

    useEffect(() => {
        fetchInitiatives();
    }, []);

    const fetchInitiatives = async () => {
        try {
            const { data } = await api.get('/initiatives');
            setInitiatives(data);
        } catch (error) {
            toast.error('Failed to fetch initiatives');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0], imageUrlInput: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);

        if (formData.image) {
            data.append('image', formData.image);
        } else if (formData.imageUrlInput) {
            data.append('image', formData.imageUrlInput);
        }

        try {
            if (editingInitiative) {
                await api.put(`/initiatives/${editingInitiative._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Initiative updated successfully');
            } else {
                await api.post('/initiatives', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Initiative created successfully');
            }
            closeModal();
            fetchInitiatives();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this initiative?')) {
            try {
                await api.delete(`/initiatives/${id}`);
                toast.success('Initiative deleted');
                fetchInitiatives();
            } catch (error) {
                toast.error('Failed to delete initiative');
            }
        }
    };

    const openModal = (initiative = null) => {
        if (initiative) {
            setEditingInitiative(initiative);
            setFormData({
                title: initiative.title,
                description: initiative.description,
                image: null,
                imageUrlInput: initiative.image // Pre-fill with existing URL
            });
        } else {
            setEditingInitiative(null);
            setFormData({
                title: '',
                description: '',
                image: null,
                imageUrlInput: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingInitiative(null);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Initiatives</h1>
                    <p className="text-neutral-500 text-sm">Create and edit key initiatives</p>
                </div>
                <Button onClick={() => openModal()} icon={Plus} className="w-full sm:w-auto">Add Initiative</Button>
            </div>

            <div className="bg-white rounded-xl shadow border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                            {initiatives.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={item.image} alt={item.title} className="h-10 w-10 rounded-full object-cover" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">{item.title}</td>
                                    <td className="px-6 py-4 text-neutral-500 max-w-xs truncate">{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
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
                            <h2 className="text-xl font-bold">{editingInitiative ? 'Edit Initiative' : 'Add New Initiative'}</h2>
                            <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="4" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Image Upload</label>
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Or Image URL</label>
                                    <input name="imageUrlInput" value={formData.imageUrlInput || ''} onChange={handleInputChange} placeholder="https://..." className="w-full px-3 py-2 border rounded-lg text-sm" />
                                </div>
                            </div>
                            {editingInitiative && !formData.image && formData.imageUrlInput && (
                                <p className="text-xs text-neutral-400 mt-1">Current/Provided Image URL will be used</p>
                            )}

                            <div className="flex justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                                <Button type="submit">{editingInitiative ? 'Update Initiative' : 'Create Initiative'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InitiativeManager;
