import React from 'react';

const Button = ({onClick,className,children,type="button"}) => {
    return (
        <button onClick={onClick} 
        type={type}
        className={`w-full px-6 py-3 mt-auto font-medium text-white rounded-lg bg-primary ${className}`}>{children}</button>
    );
};

export default Button;