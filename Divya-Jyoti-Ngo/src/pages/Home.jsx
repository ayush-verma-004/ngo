import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, MapPin, Layers, Coins } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionWrapper from '../components/ui/SectionWrapper';
import Skeleton from '../components/ui/Skeleton';
import { highlights } from '../data/mockData';
import api from '../services/api';
import heroImage from '../img/hero.jpg';

/* ---------------- HERO ---------------- */

const Hero = () => (
    <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img
                src={heroImage}
                alt="Elderly person smiling"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-neutral-900/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    A Home Filled with
                    <br />
                    <span className="text-primary-500">Love and Dignity</span>
                </h1>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Join Divya Jyoti Old Age Home in our mission to provide
                    a safe and joyful environment for our seniors.
                </p>

                <div className="flex gap-6 justify-center">
                    <Button to="/donate" size="lg" icon={Heart}>
                        Donate Now
                    </Button>
                    <Button to="/projects" variant="secondary" size="lg">
                        Our Projects
                    </Button>
                </div>
            </motion.div>
        </div>
    </section>
);

/* ---------------- STATS ---------------- */

const Stats = () => {
    const stats = [
        { icon: MapPin, label: 'DISTRICTS WORKED IN', value: '30+' },
        { icon: Layers, label: 'MAJOR PROGRAMS', value: '50+' },
        { icon: Users, label: 'PROJECT STAFF', value: '219' },
        { icon: Coins, label: 'ANNUAL EXPENDITURE', value: '20 Cr+' },
    ];

    return (
        <div className="bg-primary-600 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <stat.icon className="w-10 h-10 mx-auto mb-4" />
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ---------------- HOME ---------------- */

const Home = () => {
    const [recentProjects, setRecentProjects] = useState([]);
    const [initiatives, setInitiatives] = useState(
        Array.isArray(highlights) ? highlights : []
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsRes = await api.get('/projects');
                if (Array.isArray(projectsRes?.data)) {
                    setRecentProjects(projectsRes.data.slice(0, 3));
                } else {
                    setRecentProjects([]);
                }

                const initiativesRes = await api.get('/initiatives');
                if (Array.isArray(initiativesRes?.data)) {
                    setInitiatives(initiativesRes.data);
                }

            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-neutral-50 min-h-screen">
            <Hero />
            <Stats />

            {/* INITIATIVES */}
            <SectionWrapper className="py-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Our Key Initiatives
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Array.isArray(initiatives) &&
                        initiatives.map((item, index) => (
                            <Card key={item?.id || index}>
                                {item?.image && (
                                    <img
                                        src={item.image}
                                        alt={item?.title || "initiative"}
                                        className="h-56 w-full object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">
                                        {item?.title || "Untitled"}
                                    </h3>
                                    <p className="text-neutral-600">
                                        {item?.description || "No description available"}
                                    </p>
                                </div>
                            </Card>
                        ))}
                </div>
            </SectionWrapper>

            {/* PROJECTS */}
            <SectionWrapper bg="gray" className="py-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Recent Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-64 w-full" />
                        ))
                    ) : (
                        Array.isArray(recentProjects) &&
                        recentProjects.map((project, index) => (
                            <Card key={project?._id || index}>
                                {project?.image && (
                                    <img
                                        src={project.image}
                                        alt={project?.title || "project"}
                                        className="h-64 w-full object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    <div className="text-sm text-neutral-500 mb-2">
                                        {project?.date
                                            ? new Date(project.date).toLocaleDateString(
                                                  'en-US',
                                                  { month: 'long', year: 'numeric' }
                                              )
                                            : "No Date"}
                                    </div>

                                    <h3 className="text-xl font-bold">
                                        {project?.title || "Untitled Project"}
                                    </h3>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper bg="dark" className="py-20 text-center">
                <h2 className="text-4xl text-white font-bold mb-6">
                    Ready to Make a Difference?
                </h2>
                <Button to="/donate" size="lg">
                    Donate Today
                </Button>
            </SectionWrapper>
        </div>
    );
};

export default Home;
