import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional class name for additional styling
  size?: 'small' | 'medium' | 'large' | 'xl' | 'quoteButton' | 'truckButton' | 'contactButton' | 'bookingSuccessful'; // Optional size prop
  bgColor?: string; // Optional background color prop
  hoverBgColor?: string; // Optional hover background color prop
  hoverTextColor?: string; // Optional hover text color prop
  fontStyle?: 'normal' | 'italic' | 'thin'; // Optional font style prop
  hoverBorderColor?: string; // Optional hover border color prop
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
  hoverBorderColor = 'black', // Default hover border color
}) => {
  // Define fixed size classes based on the size prop
  const sizeClasses = {
    small: 'w-32 h-8 text-sm',
    medium: 'w-32 h-12 text-base',
    large: 'w-40 h-12 text-lg',
    xl: 'w-80 h-16 text-xl',
    quoteButton: 'w-64 h-12 text-lg',
    truckButton: 'w-72 h-16 text-lg',
    contactButton: 'w-full h-12 text-lg',
    bookingSuccessful: 'w-60 h-12 text-base',
  };

  // Define border and text color styles based on bgColor
  let borderStyle = '';
  let textColorStyle = '';

  if (bgColor === 'transparent') {
    borderStyle = 'border border-white';
    textColorStyle = ''; // No additional text color style needed for transparent background
  } else if (bgColor === '#ffffff') {
    borderStyle = 'border border-[#7783D2]';
    textColorStyle = 'text-[#7783D2]';
  }

  return (
    <button
      className={`button block text-white rounded transition-colors duration-300 ${sizeClasses[size]} ${borderStyle} ${className}`}
      style={{
        backgroundColor: bgColor,
        '--hover-bg-color': hoverBgColor,
        '--hover-text-color': hoverTextColor,
        '--hover-border-color': hoverBorderColor,
        fontWeight: fontStyle === 'thin' ? 300 : 'inherit', // Set font weight to 300 for 'thin' style
        color: textColorStyle, // Apply the dynamic text color inline
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
