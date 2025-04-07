import React from 'react';
import Faq from './Faq';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import Testimonials from './Testimonials';

const PricingSection = () => {
  

  const pricingPlans = [
    {
      name: "Basic",
      price: "$19/mo",
      features: ["10 Projects", "Basic Support", "Access to Templates"],
    },
    {
      name: "Pro",
      price: "$49/mo",
      features: ["50 Projects", "Priority Support", "Custom Templates"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99/mo",
      features: ["Unlimited Projects", "Dedicated Support", "Advanced Analytics"],
    },
  ];

  const handleUpgrade  =() =>{
    console.log("Add login if not login then goto susbsciption section ")
  }

  return (
    <div >
  
 
    <section className="bg-gradient-to-b from-blue-50 to-gray-100 py-36">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Pricing Plans</h2>
        <p className="text-gray-600 text-lg">Choose a plan that fits your needs</p>
      </div>
      <div className="flex justify-center flex-wrap gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white bg-opacity-80 backdrop-blur-md shadow-xl p-8 rounded-3xl w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              plan.highlight ? "border-2 border-blue-500" : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-bl-xl">
                Best Value
              </div>
            )}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
            <p className="text-4xl font-extrabold text-blue-600 mb-4">{plan.price}</p>
            <ul className="text-gray-700 mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-md hover:bg-blue-600 transition-all duration-300">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  

<section className="bg-gray-100 py-20 text-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Already a Rivvra user?</h1>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600" onClick={handleUpgrade}>
          Upgrade to plan
        </button>
      </div>
      <div className="flex justify-center gap-6 mt-8 text-4xl text-gray-700">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcPaypal />
      </div>
    </section>
    <Testimonials/>
    {/* <Faq/> */}
    </div>
  );
};

export default PricingSection;
