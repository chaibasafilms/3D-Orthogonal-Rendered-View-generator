
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-12 w-12',
    };
    return (
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-white border-t-transparent`}></div>
    );
};
