import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ServicesCard: React.FC<CardProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="w-full sm:w-96 max-w-md rounded-xl overflow-hidden border-zinc-400 shadow-xl border bg-white p-8 my-6">
      <div className="pb-4">
        <div className="font-normal text-xl mb-2 text-left text-primary">{title}</div>
        <p className="text-gray-500 font-normal text-left mb-4">{description}</p>
      </div>
      <div className="w-full h-64">
        <img className="w-full h-full object-cover" src={imageSrc} alt={title} />
      </div>
    </div>
  );
};

export default ServicesCard;
