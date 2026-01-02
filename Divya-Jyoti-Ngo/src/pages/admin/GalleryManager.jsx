import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Plus, Trash2, X } from 'lucide-react';
import Button from '../../components/ui/Button';

const GalleryManager = () => {
    const [gallery, setGallery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        caption: '',
        category: 'General',
        image: null
    });

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const { data } = await api.get('/gallery');
            setGallery(data);
        } catch (error) {
            toast.error('Failed to fetch gallery');
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
        data.append('caption', formData.caption);
        data.append('category', formData.category);
        data.append('image', formData.image);

        try {
            await api.post('/gallery', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Image added to gallery');
            closeModal();
            fetchGallery();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this image?')) {
            try {
                await api.delete(`/gallery/${id}`);
                toast.success('Image deleted');
                fetchGallery();
            } catch (error) {
                toast.error('Failed to delete image');
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ caption: '', category: 'General', image: null });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Gallery</h1>
                    <p className="text-neutral-500 text-sm">Upload and manage organization photos</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus} className="w-full sm:w-auto">Add Image</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                    <div key={item._id} className="relative group rounded-lg overflow-hidden h-48">
                        <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                            <div className="self-end">
                                <button onClick={() => handleDelete(item._id)} className="text-white hover:text-red-400">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <p className="text-white text-sm font-medium truncate">{item.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">Add Gallery Image</h2>
                            <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Caption</label>
                                <input required name="caption" value={formData.caption} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                                    <option value="General">General</option>
                                    <option value="Event">Event</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Campaign">Campaign</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Image</label>
                                <input type="file" required accept="image/*" onChange={handleFileChange} className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                                <Button type="submit">Upload</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
