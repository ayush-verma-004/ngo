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
            {/* Vision Section */}
            {/* Vision Section */}
            <SectionWrapper>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-neutral-900">OUR VISION</h2>
                    <div className="bg-primary-50 p-6 md:p-12 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-primary-100 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary-100 rounded-full translate-x-1/2 translate-y-1/2" />
                        <p className="text-base md:text-xl text-neutral-700 leading-relaxed relative z-10">
                            "Our vision is to improve the health and socio-economic status of rural communities and support their overall development. We aim to strengthen village institutions through focused training in sanitation, hygiene, and water management. We work to implement innovative livelihood initiatives, women empowerment programs, childcare activities, and environmental awareness campaigns across M.P. and U.P. We also strive to build strong networks with national and international organizations while supporting effective project management for government and non-government institutions."
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Values Section */}
            <SectionWrapper bg="gray">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center text-neutral-900">OUR VALUES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            'Community Development',
                            'Health & Hygiene Improvement',
                            'Women Empowerment',
                            'Sustainable Livelihood',
                            'Capacity Building',
                            'Environmental Responsibility',
                            'Social Inclusion',
                            'Collaboration & Networking',
                            'Transparency & Service'
                        ].map((value, index) => (
                            <motion.div
                                key={value}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100 flex items-center gap-4"
                            >
                                <div className="w-3 h-12 bg-primary-500 rounded-full shrink-0" />
                                <h3 className="text-lg font-semibold text-neutral-800">{value}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default About;
