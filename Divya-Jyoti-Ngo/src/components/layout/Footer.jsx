import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import logo from '../../assets/divya.svg';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & About */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <img
                                src={logo}
                                alt="Divya Jyoti Logo"
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                            <span className="font-heading font-bold text-2xl tracking-tight">
                                Divya Jyoti NGO
                            </span>
                        </Link>
                        <p className="text-neutral-400 leading-relaxed">
                            Empowering communities and spreading divine light through dedicated service, education, and healthcare initiatives.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold text-xl mb-6 text-primary-500">Quick Links</h3>
                        <ul className="space-y-3">
                            {['About Us', 'Our Projects', 'Gallery', 'Our Team', 'Careers'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-heading font-semibold text-xl mb-6 text-primary-500">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-neutral-400">
                                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                                <span>123 Hope Street, Civil Lines,<br />New Delhi, India 110001</span>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-400">
                                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                            </li>
                            <li className="flex items-center gap-3 text-neutral-400">
                                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                                <a href="mailto:info@divyajyoti.org" className="hover:text-white transition-colors">info@divyajyoti.org</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading font-semibold text-xl mb-6 text-primary-500">Newsletter</h3>
                        <p className="text-neutral-400 mb-4">Subscribe to our newsletter for updates and news.</p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                Subscribe
                                <Heart className="w-4 h-4 fill-white/20" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-neutral-500">
                        © {new Date().getFullYear()} Divya Jyoti NGO. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-neutral-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
