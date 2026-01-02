import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = true, ...props }) => {
    return (
        <div
            className={twMerge(
                'bg-white rounded-2xl border border-neutral-100 overflow-hidden',
                hover && 'transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
