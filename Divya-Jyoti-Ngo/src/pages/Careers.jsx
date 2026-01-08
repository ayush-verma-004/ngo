import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/ui/SectionWrapper';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button'; // Assuming Button is available
import { MapPin, Clock, Calendar } from 'lucide-react';


const Careers = () => {
    const [careers, setCareers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const { data } = await api.get('/careers');
                setCareers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCareers();
    }, []);

    if (isLoading) return <div className="min-h-screen pt-20 text-center">Loading Careers...</div>;

    return (
        <div className="pt-20">
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-heading mb-4">Join Our Mission</h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Explore opportunities to work with us and contribute to a better world.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {careers.length === 0 ? (
                        <div className="text-center text-neutral-500 py-10 bg-neutral-50 rounded-lg">
                            No current openings. Please check back later or send your resume to careers@divyajyoti.org
                        </div>
                    ) : (
                        careers.map((job) => (
                            <Card key={job._id} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-primary-200 transition-colors border border-transparent">
                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-bold font-heading text-neutral-900">{job.title}</h3>
                                        <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                            {job.type}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-sm mb-4">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={16} /> {job.location}
                                        </span>
                                        {job.openingDate && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={16} /> Posted: {new Date(job.openingDate).toLocaleDateString()}
                                            </span>
                                        )}
                                        {job.closingDate && (
                                            <span className="flex items-center gap-1 text-red-500">
                                                <Calendar size={16} /> Apply by: {new Date(job.closingDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-neutral-600 leading-relaxed mb-4">
                                        {job.description}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    <Button to="/contact" variant="outline">Apply Now</Button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Careers;
