import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { User, Plus, Trash2, Shield, Check, X } from 'lucide-react';

const AdminManagement = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);

    const [newAdmin, setNewAdmin] = useState({
        username: '',
        password: '',
        role: 'admin',
        permissions: []
    });

    const AVAILABLE_PERMISSIONS = [
        { id: 'manage_projects', label: 'Projects' },
        { id: 'manage_team', label: 'Team' },
        { id: 'manage_gallery', label: 'Gallery' },
        { id: 'manage_careers', label: 'Careers' },
        { id: 'manage_content', label: 'Content' },
        { id: 'manage_settings', label: 'Settings' }
    ];

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const { data } = await api.get('/auth');
            setAdmins(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', newAdmin);
            toast.success('Admin account created');
            setIsAdding(false);
            setNewAdmin({ username: '', password: '', role: 'admin', permissions: [] });
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create admin');
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) return;
        try {
            await api.delete(`/auth/${id}`);
            toast.success('Admin removed');
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Deletion failed');
        }
    };

    const handleUpdateAdmin = async (e) => {
        e.preventDefault();
        try {
            const updateData = {
                username: editingAdmin.username,
                permissions: editingAdmin.permissions
            };
            if (editingAdmin.password) {
                updateData.password = editingAdmin.password;
            }

            await api.put(`/auth/${editingAdmin._id}`, updateData);
            toast.success('Admin updated successfully');
            setEditingAdmin(null);
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    const togglePermission = (e, adminId, permissionId) => {
        const adminToUpdate = admins.find(a => a._id === adminId);
        if (!adminToUpdate) return;

        let updatedPermissions;
        if (adminToUpdate.permissions.includes(permissionId)) {
            updatedPermissions = adminToUpdate.permissions.filter(p => p !== permissionId);
        } else {
            updatedPermissions = [...adminToUpdate.permissions, permissionId];
        }

        updateAdminPermissions(adminId, updatedPermissions);
    };

    const updateAdminPermissions = async (adminId, permissions) => {
        try {
            await api.put(`/auth/${adminId}`, { permissions });
            toast.success('Permissions updated');
            fetchAdmins();
        } catch (error) {
            toast.error('Failed to update permissions');
        }
    };

    const toggleNewAdminPermission = (permissionId) => {
        setNewAdmin(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permissionId)
                ? prev.permissions.filter(p => p !== permissionId)
                : [...prev.permissions, permissionId]
        }));
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-800">Admin Management</h1>
                    <p className="text-neutral-500 text-sm">Create and manage access for other administrators</p>
                </div>
                <button
                    onClick={() => {
                        setIsAdding(!isAdding);
                        setEditingAdmin(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium w-full sm:w-auto justify-center ${isAdding ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                >
                    {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Admin</>}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 animate-slideDown">
                    <h2 className="font-semibold mb-6">Create New Administrator</h2>
                    <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={newAdmin.username}
                                    onChange={e => setNewAdmin({ ...newAdmin, username: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newAdmin.password}
                                    onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-neutral-700">Permissions</label>
                            <div className="grid grid-cols-2 gap-2">
                                {AVAILABLE_PERMISSIONS.map(p => (
                                    <label key={p.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-50 cursor-pointer border border-neutral-100">
                                        <input
                                            type="checkbox"
                                            checked={newAdmin.permissions.includes(p.id)}
                                            onChange={() => toggleNewAdminPermission(p.id)}
                                            className="w-4 h-4 text-primary-600 rounded border-neutral-300"
                                        />
                                        <span className="text-sm text-neutral-600">{p.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <button type="submit" className="w-full md:w-auto px-8 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 transition-colors font-medium">
                                Create Admin
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {editingAdmin && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100 animate-slideDown ring-1 ring-primary-50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-primary-800 flex items-center gap-2">
                            <Shield size={20} />
                            Edit Admin: {admins.find(a => a._id === editingAdmin._id)?.username}
                        </h2>
                        <button onClick={() => setEditingAdmin(null)} className="text-neutral-400 hover:text-neutral-600">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleUpdateAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={editingAdmin.username}
                                    onChange={e => setEditingAdmin({ ...editingAdmin, username: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    value={editingAdmin.password || ''}
                                    onChange={e => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-neutral-700">Permissions</label>
                            <div className="grid grid-cols-2 gap-2">
                                {AVAILABLE_PERMISSIONS.map(p => (
                                    <label key={p.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-50 cursor-pointer border border-neutral-100">
                                        <input
                                            type="checkbox"
                                            checked={editingAdmin.permissions.includes(p.id)}
                                            onChange={() => {
                                                const updated = editingAdmin.permissions.includes(p.id)
                                                    ? editingAdmin.permissions.filter(perm => perm !== p.id)
                                                    : [...editingAdmin.permissions, p.id];
                                                setEditingAdmin({ ...editingAdmin, permissions: updated });
                                            }}
                                            className="w-4 h-4 text-primary-600 rounded border-neutral-300"
                                        />
                                        <span className="text-sm text-neutral-600">{p.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 flex gap-3">
                            <button type="submit" className="px-8 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                                Save Changes
                            </button>
                            <button type="button" onClick={() => setEditingAdmin(null)} className="px-8 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors font-medium">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-neutral-50 border-b border-neutral-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600">Admin</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600">Role</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-600">Permissions</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {loading ? (
                                <tr><td colSpan="4" className="p-8 text-center text-neutral-400">Loading admins...</td></tr>
                            ) : admins.map(adm => (
                                <tr key={adm._id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                                                {adm.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-neutral-800 flex items-center gap-2">
                                                    {adm.username}
                                                    {adm._id === user?._id && <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-bold uppercase">You</span>}
                                                </div>
                                                <div className="text-xs text-neutral-400 font-mono">{adm._id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${adm.role === 'super_admin' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            <Shield size={12} />
                                            {adm.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {adm.role === 'super_admin' ? (
                                            <span className="text-xs text-neutral-400 italic">Full Access</span>
                                        ) : (
                                            <div className="flex flex-wrap gap-1">
                                                {AVAILABLE_PERMISSIONS.map(p => (
                                                    <button
                                                        key={p.id}
                                                        onClick={(e) => togglePermission(e, adm._id, p.id)}
                                                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${adm.permissions.includes(p.id)
                                                            ? 'bg-green-50 text-green-600 border border-green-100'
                                                            : 'bg-neutral-50 text-neutral-300 border border-neutral-100 hover:text-neutral-500'
                                                            }`}
                                                    >
                                                        {p.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingAdmin({ ...adm, password: '' });
                                                    setIsAdding(false);
                                                }}
                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors border border-primary-100"
                                            >
                                                <Shield size={18} />
                                            </button>
                                            {adm._id !== user?._id && (
                                                <button
                                                    onClick={() => handleDeleteAdmin(adm._id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;
