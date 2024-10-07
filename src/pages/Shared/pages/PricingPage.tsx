import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string[];
  buttonText: string;
  isPopular?: boolean;
  isCurrentPlan?: boolean; // Added to determine if the card is the current plan
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, description, buttonText, isPopular, isCurrentPlan }) => {
  return (
    <div
      className={`p-8 rounded-lg shadow-xl text-center transition-transform border mt-16
        ${isCurrentPlan ? 'border-primary cursor-default' : 'hover:border-primary'}
        ${isPopular ? 'bg-nblue text-white scale-110' : 'bg-white text-gray-900'} 
        hover:scale-105 focus:scale-105`} // Zoom in on hover
      style={{
        transition: 'transform 0.3s ease-in-out', // Smooth zoom
        pointerEvents: isCurrentPlan ? 'none' : 'auto', // Disable clicking for current plan
        // Apply scaling only to the popular card
        transform: isPopular ? 'scale(1.1)' : 'scale(1)' 
      }}
    >
      {isPopular && <p className="text-sm text-white font-medium mb-2">Most Popular</p>}
      <h3 className={`text-2xl font-semibold mb-2 ${isPopular ? 'text-2xl' : ''}`}>{title}</h3>
      <p className={`text-4xl font-semibold my-4 ${isPopular ? 'text-3xl font-semibold' : ''}`}>{price}</p>
      <ul className={`mb-6 text-start font-normal ${isPopular ? 'text-white' : 'text-gray-700'}`}>
        {description.map((item, index) => (
          <li key={index} className="my-2">
            <span className={`inline-flex font-normal items-center justify-center mr-2 rounded-full w-5 h-5 text-xs ${isPopular ? 'text-white bg-gray-400' : 'text-primary bg-grey'}`}>
              &#10003;
            </span>
            {item}
          </li>
        ))}
      </ul>
      <button
        className={`py-2 px-4 rounded-md transition ${
          buttonText === "Your current plan"
        ? 'border border-nblue text-nblue bg-transparent cursor-default'
        : buttonText === "Subscribe Now"
        ? 'bg-white text-rblue hover:bg-blue-400 hover:text-white'
        : 'bg-nblue text-white hover:bg-blue-400'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const PricingPage: React.FC = () => {
  return (
    <div className="px-4 md:pt-24 md:pb-32 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-medium text-center text-rblue mb-2 lg:mt-4 lg:mb-8">Plan and Pricing Comparison</h1>
      {/* <p className="xs:text-xl md:text-3xl lg:text-2xl text-secondary font-normal mb-6">Select from our cost-effective packages</p> */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16   mt-8">
        <PricingCard
          title="Free Trial"
          price="Free"
          description={[
            'One-Stop Transportation Resource',
            'On-demand network of 668,000 trucks',
            'Find safe, legal, reliable carriers',
            'Identify new sources of truckload capacity',
            'Vans, reefers, flatbeds, and specialty trailers',
            '24/7 Support',
            'Includes a 7-day trial period only'
          ]}
          buttonText="Your current plan"
          isCurrentPlan // Mark this card as the current plan
        />
        <PricingCard
          title="Monthly Subscription"
          price="$49/month"
          description={[
            'One-Stop Transportation Resource',
            'On-demand network of 668,000 trucks',
            'Find safe, legal, reliable carriers',
            'Identify new sources of truckload capacity',
            'Vans, reefers, flatbeds, and specialty trailers',
            '24/7 Support'
          ]}
          buttonText="Subscribe Now"
          isPopular
        />
        <PricingCard
          title="Annual Subscription"
          price="$559/year"
          description={[
            'One-Stop Transportation Resource',
            'On-demand network of 668,000 trucks',
            'Find safe, legal, reliable carriers',
            'Identify new sources of truckload capacity',
            'Vans, reefers, flatbeds, and specialty trailers',
            '24/7 Support',
            '5% off on annual plan'
          ]}
          buttonText="Subscribe Annually"
        />
      </div>
    </div>
  );
};

export default PricingPage;
