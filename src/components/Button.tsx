import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional class name for additional styling
  size?: 'small' | 'medium' | 'large' | 'xl'; // Optional size prop
  bgColor?: string; // Optional background color prop
  hoverBgColor?: string; // Optional hover background color prop
  hoverTextColor?: string; // Optional hover text color prop
  fontStyle?: 'normal' | 'italic' | 'thin'; // Optional font style prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  size = 'medium',
  bgColor = '#252F70',
  hoverBgColor = 'white',
  hoverTextColor = '#7783D2',
  fontStyle = 'normal', // Default to normal font weight
}) => {
  // Define fixed size classes based on the size prop
  const sizeClasses = {
    small: 'w-20 h-8 text-sm',
    medium: 'w-32 h-12 text-base',
    large: 'w-40 h-12 text-lg',
    xl: 'w-80 h-16 text-xl',
  };

  // Define additional styles for transparent background with white border
  const borderStyle = bgColor === 'transparent' ? 'border border-white' : '';

  return (
    <button
      className={`block text-white rounded transition-colors duration-300 ${sizeClasses[size]} ${borderStyle} ${className}`}
      style={{
        backgroundColor: bgColor,
        '--hover-bg-color': hoverBgColor,
        '--hover-text-color': hoverTextColor,
        fontWeight: fontStyle === 'thin' ? 400 : 'inherit', // Set font weight to 300 for 'thin' style
      } as React.CSSProperties}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
