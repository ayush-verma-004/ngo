import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';

const ContentManager = () => {
    const [aboutText, setAboutText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const { data } = await api.get('/content/about_us');
            if (data && data.text) {
                setAboutText(data.text);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await api.post('/content/about_us', {
                data: { text: aboutText }
            });
            toast.success('Content updated successfully');
        } catch (error) {
            toast.error('Failed to update content');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-heading">Manage Content</h1>
                    <p className="text-neutral-500 text-sm">Update website static content</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="text-xl font-bold mb-4">About Us Section</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Main Description Text</label>
                    <textarea
                        value={aboutText}
                        onChange={(e) => setAboutText(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg h-40"
                        placeholder="Enter the main 'About Us' description..."
                    />
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>

            <div className="bg-neutral-50 p-6 rounded-xl border border-dashed border-neutral-300 text-center text-neutral-500">
                More content sections (Hero, Contact Info, etc.) can be added here in the future.
            </div>
        </div>
    );
};

export default ContentManager;
