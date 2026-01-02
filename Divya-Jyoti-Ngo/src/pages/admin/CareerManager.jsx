import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Plus, Trash2, X, Briefcase } from 'lucide-react';
import Button from '../../components/ui/Button';

const CareerManager = () => {
    const [careers, setCareers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        type: 'Full-time'
    });

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const { data } = await api.get('/careers');
            setCareers(data);
        } catch (error) {
            toast.error('Failed to fetch careers');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/careers', formData);
            toast.success('Job posting created');
            closeModal();
            fetchCareers();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this job posting?')) {
            try {
                await api.delete(`/careers/${id}`);
                toast.success('Job removed');
                fetchCareers();
            } catch (error) {
                toast.error('Failed to remove job');
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', location: '', type: 'Full-time' });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Careers</h1>
                    <p className="text-neutral-500 text-sm">Post and manage job opportunities</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus} className="w-full sm:w-auto">Post Job</Button>
            </div>

            <div className="space-y-4">
                {careers.map((job) => (
                    <div key={job._id} className="bg-white p-6 rounded-xl shadow flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold">{job.title}</h3>
                                <span className="px-2 py-1 text-xs rounded bg-primary-50 text-primary-600 font-medium">{job.type}</span>
                            </div>
                            <p className="text-neutral-500 mb-2">{job.location}</p>
                            <p className="text-neutral-600 text-sm line-clamp-2 max-w-2xl">{job.description}</p>
                        </div>
                        <button onClick={() => handleDelete(job._id)} className="text-neutral-400 hover:text-red-500">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">Post New Job</h2>
                            <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Job Title</label>
                                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Volunteer">Volunteer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                                    <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="5" />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                                <Button type="submit">Post Job</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerManager;
