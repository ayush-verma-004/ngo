import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Plus, Trash2, X } from 'lucide-react';
import Button from '../../components/ui/Button';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image: null,
        linkedin: '',
        twitter: ''
    });

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const { data } = await api.get('/team');
            setTeam(data);
        } catch (error) {
            toast.error('Failed to fetch team');
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
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('bio', formData.bio);
        data.append('image', formData.image);

        const socialLinks = {
            linkedin: formData.linkedin,
            twitter: formData.twitter
        };
        data.append('socialLinks', JSON.stringify(socialLinks));

        try {
            await api.post('/team', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Team member added');
            closeModal();
            fetchTeam();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await api.delete(`/team/${id}`);
                toast.success('Member removed');
                fetchTeam();
            } catch (error) {
                toast.error('Failed to remove member');
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            role: '',
            bio: '',
            image: null,
            linkedin: '',
            twitter: ''
        });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Team</h1>
                    <p className="text-neutral-500 text-sm">Add and remove team members</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} icon={Plus} className="w-full sm:w-auto">Add Member</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center relative group">
                        <button
                            onClick={() => handleDelete(member._id)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={20} />
                        </button>
                        <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-primary-600 text-sm mb-2">{member.role}</p>
                        <p className="text-neutral-500 text-sm line-clamp-2">{member.bio}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold">Add Team Member</h2>
                            <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Role</label>
                                <input required name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Bio</label>
                                <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Image</label>
                                <input type="file" required accept="image/*" onChange={handleFileChange} className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">LinkedIn URL</label>
                                    <input name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Optional" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Twitter URL</label>
                                    <input name="twitter" value={formData.twitter} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Optional" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                                <Button type="submit">Add Member</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManager;
