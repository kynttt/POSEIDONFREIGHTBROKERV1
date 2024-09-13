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
      className={`bg-white p-6 rounded-lg shadow-2xl text-center border transition-transform
        ${isCurrentPlan ? 'border-primary cursor-default' : 'border-gray-300 hover:border-primary border-2'}
        ${isPopular ? '' : ''}
        hover:scale-105 focus:scale-105`} // Zoom in on hover
      style={{
        transition: 'transform 0.3s ease-in-out', // Smooth zoom
        pointerEvents: isCurrentPlan ? 'none' : 'auto', // Disable clicking for current plan
      }}
    >
      {isPopular && <p className="text-sm text-primary font-semibold mb-2">Most Popular</p>}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-4xl font-bold my-4">{price}</p>
      <ul className="text-gray-700 mb-6 text-start font-normal">
        {description.map((item, index) => (
          <li key={index} className="my-2">
            <span className="inline-flex items-center justify-center mr-2 text-primary bg-grey rounded-full w-5 h-5 text-xs">
  &#10003;
</span>

            {item}
          </li>
        ))}
      </ul>
      <button
        className={`py-2 px-4 rounded-md transition ${buttonText === "Your current plan" ? 'border-2 border-primary text-primary bg-transparent cursor-default' : 'bg-primary text-white hover:bg-secondary'}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

const PricingPage: React.FC = () => {
  return (
    <div className="bg-gray-50  px-4 md:pt-24 md:pb-32 flex flex-col justify-center items-center">

      <h1 className="xs:text-2xl md:text-4xl lg:text-5xl text-primary font-bold mb-2 lg:mt-4">Plan and Pricing Comparison</h1>
      <p className="xs:text-xl md:text-3xl lg:text-2xl text-secondary font-normal mb-6">Select from our cost-effective packages</p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
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
