import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, Image, Briefcase, FileText, LogOut, Menu, X, Settings } from 'lucide-react';

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login', { replace: true });
    };

    const navItems = [
        { path: '/admin/dashboard', label: 'Projects', icon: LayoutDashboard, permission: 'manage_projects' },
        { path: '/admin/team', label: 'Team', icon: Users, permission: 'manage_team' },
        { path: '/admin/gallery', label: 'Gallery', icon: Image, permission: 'manage_gallery' },
        { path: '/admin/careers', label: 'Careers', icon: Briefcase, permission: 'manage_careers' },
        { path: '/admin/content', label: 'Content', icon: FileText, permission: 'manage_content' },
        { path: '/admin/settings', label: 'Settings', icon: Settings, permission: 'manage_settings' },
    ];

    const filteredNavItems = navItems.filter(item =>
        user?.role === 'super_admin' || user?.permissions?.includes(item.permission)
    );

    // Add Admin Management for Super Admins
    if (user?.role === 'super_admin') {
        filteredNavItems.push({ path: '/admin/admins', label: 'Admins', icon: Users });
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-100 z-50 flex items-center px-4 shadow-sm">
                <button
                    className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <span className="ml-3 font-bold text-primary-600">Admin Panel</span>
            </header>

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative z-40 w-64 h-screen bg-white shadow-xl transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-xl font-bold text-primary-600">Admin Panel</h2>
                </div>
                <nav className="p-4 space-y-2">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-primary-50 text-primary-600 font-medium'
                                : 'text-neutral-600 hover:bg-neutral-50'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-screen mt-16 lg:mt-0">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
