import React from 'react';
import { twMerge } from 'tailwind-merge';

const SectionWrapper = ({ children, className, id, bg = 'white' }) => {
    const bgColors = {
        white: 'bg-white',
        gray: 'bg-neutral-50',
        dark: 'bg-neutral-900',
        primary: 'bg-primary-50',
    };

    return (
        <section id={id} className={twMerge('py-16 md:py-24', bgColors[bg], className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;
