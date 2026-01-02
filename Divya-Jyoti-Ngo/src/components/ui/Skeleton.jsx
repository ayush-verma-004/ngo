import React from 'react';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, circle = false }) => {
    return (
        <div
            className={twMerge(
                "skeleton",
                circle ? "rounded-full" : "rounded-md",
                className
            )}
        />
    );
};

export default Skeleton;
