import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ServicesCard: React.FC<CardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="bg-secondary w-full sm:w-96 max-w-md rounded-2xl overflow-hidden  shadow-xl   p-8 my-6">
      <div className="pb-4">
        <div className="font-semibold text-xl mb-2 text-left text-primary">{title}</div>
        <p className="text-slate-50 font-thin mb-4 text-justify">{description}</p>
      </div>
      <div className="w-full h-64">
        <img className="w-full h-full object-cover rounded-lg" src={imageSrc} alt={title} />
      </div>
    </div>
  );
};

export default ServicesCard;
