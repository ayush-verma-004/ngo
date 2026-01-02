import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/ui/SectionWrapper';
import { motion } from 'framer-motion';
import api from '../services/api';

const About = () => {
    const [aboutText, setAboutText] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await api.get('/content/about_us');
                if (data && data.text) {
                    setAboutText(data.text);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchContent();
    }, []);

    return (
        <div className="pt-20">
            {/* Hero Section with Image */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                    alt="About Us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">About Us</h1>
                </div>
            </div>

            {/* Mission Section */}
            <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                    {aboutText ? (
                        <p className="text-xl text-neutral-600 leading-relaxed text-left whitespace-pre-wrap">
                            {aboutText}
                        </p>
                    ) : (
                        <div className="flex justify-center p-12">
                            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </SectionWrapper>

            {/* Vision & Values */}
            <SectionWrapper bg="gray">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                            alt="Vision"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-6">Our Vision</h2>
                        <p className="text-lg text-neutral-600 mb-6">
                            We envision a world where every individual has access to education, healthcare, and equal opportunities, regardless of their background.
                        </p>
                        <h3 className="text-2xl font-bold font-heading mb-4">Core Values</h3>
                        <ul className="space-y-3">
                            {['Compassion', 'Integrity', 'Transparency', 'Inclusivity', 'Sustainability'].map((value) => (
                                <li key={value} className="flex items-center gap-3 text-neutral-700 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-primary-500" />
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default About;
