import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    to,
    href,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25',
        secondary: 'bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 shadow-sm',
        outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
        ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const classes = twMerge(baseStyles, variants[variant], sizes[size], className);

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {Icon && <Icon className="w-5 h-5" />}
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {Icon && <Icon className="w-5 h-5" />}
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...props}>
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    );
};

export default Button;
