import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTruck, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const OfferCard: React.FC<{ icon: any, title: string, description: string, price: string, period: string, buttonText: string }> = ({ icon, title, description, price, period, buttonText }) => (
  <div className="p-6 md:p-8 lg:p-10 border rounded-lg shadow-md grid gap-6">
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={icon} className="w-8 h-8 text-primary" />
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-muted font-normal">{description}</p>
    </div>
    <div className="grid gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted">/{period}</span>
      </div>
      <button className="w-full bg-primary text-white py-2 px-4 rounded">{buttonText}</button>
    </div>
  </div>
);

const FreightOffers: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
        <OfferCard
          icon={faBox}
          title="Freight Trial"
          description="Explore our freight brokerage tools and features with a 14-day free trial."
          price="$0"
          period="7 days"
          buttonText="Start Free Trial"
        />
        <OfferCard
          icon={faTruck}
          title="Monthly Plan"
          description="Access all freight brokerage tools and features with our monthly plan."
          price="$99"
          period="month"
          buttonText="Subscribe"
        />
        <OfferCard
          icon={faCalendarAlt}
          title="Annual Plan"
          description="Save 20% with our annual plan and enjoy all our freight brokerage features."
          price="$799"
          period="year"
          buttonText="Subscribe"
        />
      </div>
    </section>
  );
}

export default FreightOffers;
