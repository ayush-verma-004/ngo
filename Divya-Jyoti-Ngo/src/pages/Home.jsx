import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, MapPin, Layers, Coins } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionWrapper from '../components/ui/SectionWrapper';
import Skeleton from '../components/ui/Skeleton';
import { highlights } from '../data/mockData';
import api from '../services/api';
import heroImage from '../img/hero.png';

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Elderly person smiling"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-neutral-900/60" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-200 font-medium text-sm mb-8 backdrop-blur-md">
                        Honoring Experience, Providing Care
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold font-heading mb-8 leading-[1.1] tracking-tight">
                        A Home Filled with <br />
                        <span className="text-primary-500">Love and Dignity</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-neutral-200 mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
                        Join Divya Jyoti Old Age Home in our mission to provide a comfortable, safe, and joyful environment for our seniors.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button to="/donate" size="lg" icon={Heart} className="scale-110">
                            Donate Now
                        </Button>
                        <Button to="/projects" variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm scale-110">
                            Our Projects
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
                    <div className="w-1 h-1.5 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

const Stats = () => {
    const stats = [
        { icon: MapPin, label: 'DISTRICTS WORKED IN', value: '30+' },
        { icon: Layers, label: 'MAJOR PROGRAMS / PROJECT TYPES', value: '50+' },
        { icon: Users, label: 'PROJECT STAFF', value: '219' },
        { icon: Coins, label: 'ANNUAL EXPENDITURE (2024–25)', value: '20 Cr+' },
    ];

    return (
        <div className="bg-primary-600 text-white py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500 rounded-full opacity-40 blur-[100px]" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary-700 rounded-full opacity-40 blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 group-hover:bg-white/20 shadow-xl shadow-primary-700/20">
                                <stat.icon className="w-8 h-8 md:w-10 md:h-10" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold font-heading mb-2">{stat.value}</div>
                            <div className="text-primary-100 text-sm md:text-base font-semibold tracking-wide uppercase opacity-80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProjectSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
    </div>
);

const Home = () => {
    const [recentProjects, setRecentProjects] = useState([]);
    const [initiatives, setInitiatives] = useState(highlights); // Default to mock data
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Projects
                const projectsRes = await api.get('/projects');
                setRecentProjects(projectsRes.data.slice(0, 3));

                // Fetch Initiatives
                const initiativesRes = await api.get('/initiatives');
                if (initiativesRes.data && initiativesRes.data.length > 0) {
                    setInitiatives(initiativesRes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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

            {/* Highlights Section */}
            <SectionWrapper className="section-padding">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">What We Do</span>
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Our Key Initiatives</h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        We focus on holistic care for our elders through various programs targeting healthcare, companionship, and emotional well-being.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {initiatives.map((item) => (
                        <Card key={item.id} className="h-full flex flex-col group hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 border-none shadow-lg">
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                                <p className="text-neutral-600 mb-6 flex-grow leading-relaxed">{item.description}</p>
                                <div className="pt-6 border-t border-neutral-100">
                                    <Button variant="ghost" to="/projects" className="px-0 hover:bg-transparent text-primary-600 hover:text-primary-700 p-0 h-auto font-bold uppercase tracking-wider text-sm flex items-center">
                                        Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>

            {/* Featured Projects Preview */}
            <SectionWrapper bg="gray" className="section-padding">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Our Impact</span>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tight">Recent Projects</h2>
                    </div>
                    <Button to="/projects" variant="outline" className="border-neutral-300 hover:border-primary-500 hover:text-primary-600 px-8">
                        View All Projects
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => <ProjectSkeleton key={i} />)
                    ) : (
                        recentProjects.map((project) => (
                            <Card key={project._id} className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500">
                                <div className="relative h-72 overflow-hidden">
                                    <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest z-10 shadow-sm">
                                        {project.category}
                                    </div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                                        <p className="text-white text-sm leading-relaxed line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {project.summary}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-3 text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">
                                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                        {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading mb-2 group-hover:text-primary-600 transition-colors leading-tight">
                                        {project.title}
                                    </h3>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </SectionWrapper>

            {/* Call to Action */}
            <SectionWrapper bg="dark" className="section-padding text-center overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary-600/5 -skew-y-6 transform origin-top-left" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-7xl font-bold font-heading text-white mb-8 tracking-tight">
                        Ready to Make a <br /><span className="text-primary-500 italic">Difference?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Your support can change lives. Join us in our journey to create a better world for everyone.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button to="/donate" size="lg" className="min-w-[200px] h-14 text-lg">
                            Donate Today
                        </Button>
                        <Button to="/contact" variant="outline" size="lg" className="min-w-[200px] h-14 text-lg border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-white">
                            Get Involved
                        </Button>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Home;
