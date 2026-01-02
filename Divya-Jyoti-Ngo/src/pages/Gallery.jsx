import React, { useState, useEffect } from 'react';
import SectionWrapper from '../components/ui/SectionWrapper';
import api from '../services/api';

const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await api.get('/gallery');
                setGallery(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const categories = ['All', ...new Set(gallery.map(item => item.category))];
    const filteredGallery = filter === 'All' ? gallery : gallery.filter(item => item.category === filter);

    if (isLoading) return <div className="min-h-screen pt-20 text-center">Loading Gallery...</div>;

    return (
        <div className="pt-20">
            <SectionWrapper>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-heading mb-4">Our Gallery</h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Glimpses of our work and impact on the ground.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredGallery.map((item) => (
                        <div key={item._id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                            <img src={item.image} alt={item.caption} className="w-full" />
                            <div className="p-4 bg-white">
                                <p className="text-neutral-800 font-medium">{item.caption}</p>
                                <span className="text-xs text-primary-600 font-bold uppercase tracking-wider">{item.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Gallery;
