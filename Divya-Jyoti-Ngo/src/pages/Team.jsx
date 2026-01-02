import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/ui/SectionWrapper';
import api from '../services/api';
import { Linkedin, Twitter } from 'lucide-react';

const Team = () => {
    const [team, setTeam] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const { data } = await api.get('/team');
                setTeam(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (isLoading) return <div className="min-h-screen pt-20 text-center">Loading Team...</div>;

    return (
        <div className="pt-20">
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-heading mb-4">Meet Our Team</h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        The dedicated individuals behind our mission.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <div key={member._id} className="text-center group">
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-100">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h3 className="text-xl font-bold font-heading">{member.name}</h3>
                            <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                            <p className="text-neutral-500 text-sm mb-4">{member.bio}</p>

                            <div className="flex justify-center gap-4">
                                {member.socialLinks?.linkedin && (
                                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer text-neutral-400 hover:text-primary-600">
                                        <Linkedin size={18} />
                                    </a>
                                )}
                                {member.socialLinks?.twitter && (
                                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer text-neutral-400 hover:text-primary-600">
                                        <Twitter size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Team;
