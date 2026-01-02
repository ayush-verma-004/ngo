import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logo from '../../assets/divya.svg';

const NavLink = ({ to, children, mobile = false, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={twMerge(
                "relative transition-colors duration-300 font-medium",
                mobile
                    ? "block py-3 text-lg border-b border-neutral-100 hover:text-primary-500"
                    : "hover:text-primary-600",
                isActive ? "text-primary-600" : "text-neutral-600"
            )}
        >
            {children}
            {!mobile && isActive && (
                <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary-500"
                />
            )}
        </Link>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Team', path: '/team' },
        { name: 'Media', path: '/media' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Divya Jyoti Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center gap-8">
                        {navItems.map((item) => (
                            <NavLink key={item.path} to={item.path}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/admin/login"
                            className="group flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transform hover:-translate-y-0.5"
                        >
                            <Menu className="w-4 h-4 transition-colors" />
                            Admin Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="xl:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden overflow-hidden bg-white border-b border-neutral-200"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    mobile
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            <Link
                                to="/admin/login"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold active:bg-primary-700"
                            >
                                <Menu className="w-4 h-4" />
                                Admin Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
