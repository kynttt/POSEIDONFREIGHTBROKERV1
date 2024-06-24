import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional class name for additional styling
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      className={`block bg-[#252F70] text-white px-4 py-2 rounded mx-auto hover:bg-white hover:text-[#7783D2] transition-colors duration-300 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
