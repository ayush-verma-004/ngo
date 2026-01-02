import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { User, Lock, Plus, Trash2, Shield } from 'lucide-react';

const AdminSettings = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);

    // Profile update state
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        password: '',
        confirmPassword: ''
    });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (profileData.password && profileData.password !== profileData.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        setLoading(true);
        try {
            const { data } = await api.put('/auth/profile', {
                username: profileData.username,
                password: profileData.password || undefined
            });
            updateUser(data);
            toast.success('Profile updated successfully');
            setProfileData({ ...profileData, password: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-800">Settings</h1>
                    <p className="text-neutral-500 text-sm">Manage your personal profile settings</p>
                </div>
            </div>

            <div className="max-w-2xl">
                {/* Profile Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <User size={20} className="text-primary-600" />
                        My Profile
                    </h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={profileData.username}
                                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">New Password (leave blank to keep current)</label>
                            <input
                                type="password"
                                value={profileData.password}
                                onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={profileData.confirmPassword}
                                onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-primary-600 text-white py-2 rounded-lg transition-colors font-medium ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
