import React from 'react';

const FAQsPage: React.FC = () => {
  const faqs = [
    {
      question: 'How are shipment quotes generated?',
      answer: 'Quotes are generated by an algorithm that accounts for variations in distance and travel time.',
    },
    {
      question: 'How are rates determined for shipping services?',
      answer: 'Rates are determined based on factors such as shipment distance, size, weight, market demand, fuel costs, and carrier availability.',
    },
    {
      question: 'What should I do if I have an issue after normal business hours?',
      answer: 'Freight Broker is here to help you resolve issues no matter the time of day. Solution oriented, Friendly Agents and dispatches. We provide individualized, personal focused transportation service.',
    },
    {
      question: 'How many loads per day does Freight Broker move?',
      answer: 'We can help match you with over 10,000 loads per day from more than 14,000 shippers in our network. Our wide range of equipment ensures that we are well equipped to handle shipment of all shapes and sizes. Poseidon is your quality direct delivery carrier.',
    },
  ];

  return (
    <div className=" bg-gray-100 flex flex-col items-center mt-24">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-4xl font-medium text-primary mb-10">FAQs</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-medium text-primary mb-2">{faq.question}</h2>
            <p className="text-gray-500 text-sm font-normal mb-10">{faq.answer}</p>
            {index < faqs.length + 1 && <hr className="mt-6 border-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;