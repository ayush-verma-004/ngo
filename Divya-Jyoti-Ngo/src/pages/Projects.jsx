import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/ui/SectionWrapper';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';
import api from '../services/api';

const ProjectSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
    </div>
);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error(error);
            } finally {
                // Artificial delay to show skeleton loaders (senior engineer polish)
                setTimeout(() => setIsLoading(false), 500);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="bg-neutral-50 min-h-screen pt-24 pb-20">
            <SectionWrapper>
                <div className="text-center mb-20">
                    <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Impact Stories</span>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Our Projects</h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        Explore the various initiatives we have undertaken to make a positive impact on society.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => <ProjectSkeleton key={i} />)
                    ) : projects.length > 0 ? (
                        projects.map((project) => (
                            <Card key={project._id} className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden bg-white">
                                <div className="relative h-64 overflow-hidden">
                                    <span className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest z-10 shadow-sm">
                                        {project.category}
                                    </span>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-8">
                                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-primary-500 rounded-full" />
                                        {new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-primary-600 transition-colors leading-tight">{project.title}</h3>
                                    <p className="text-neutral-600 leading-relaxed line-clamp-3 mb-6">{project.description}</p>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-neutral-400 text-lg">No projects found.</div>
                        </div>
                    )}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Projects;
