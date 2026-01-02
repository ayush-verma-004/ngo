import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionWrapper from '../components/ui/SectionWrapper';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        alert('Thank you for contacting us! We will get back to you shortly.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <>
            <div className="bg-neutral-900 py-20 text-center text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Contact Us</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        We'd love to hear from you. Reach out to us for any queries or support.
                    </p>
                </div>
            </div>

            <SectionWrapper>
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold font-heading mb-6">Get in Touch</h2>
                            <p className="text-neutral-600 mb-8">
                                Have a question or want to volunteer? Fill out the form or contact us directly.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                                    <p className="text-neutral-600">123 Hope Street, Civil Lines,<br />New Delhi, India 110001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Phone Details</h3>
                                    <p className="text-neutral-600">+91 98765 43210</p>
                                    <p className="text-neutral-500 text-sm">Mon-Fri 9am-6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                    <p className="text-neutral-600">info@divyajyoti.org</p>
                                    <p className="text-neutral-600">support@divyajyoti.org</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-8 shadow-lg shadow-neutral-100">
                        <h2 className="text-2xl font-bold font-heading mb-6">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                                        placeholder="+91 99999 99999"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none"
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>

                            <Button type="submit" size="lg" className="w-full md:w-auto">
                                Send Message <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>
            </SectionWrapper>
        </>
    );
};

export default Contact;
