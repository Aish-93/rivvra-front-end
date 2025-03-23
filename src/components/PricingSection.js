import React from 'react';

const PricingSection = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '$19/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      name: 'Standard',
      price: '$49/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      name: 'Premium',
      price: '$99/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
  ];

  return (
    <section className="bg-gray-100 py-36 ">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
        <p className="text-gray-600">Choose a plan that fits your needs</p>
      </div>
      <div className="flex justify-center gap-8">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="bg-white shadow-lg p-8 rounded-2xl w-80 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            <ul className="text-gray-600 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2">✔️ {feature}</li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
