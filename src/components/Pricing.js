import React from "react";
import { formApiservice } from "../utils/methods/auth"
import "../App.css"
import Faq from "./Faq";

const PricingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Header Section */}
      <header className="boxPrimary text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Choose Your Plan</h1>
        <p className="mt-4 text-lg">Flexible pricing for businesses of all sizes.</p>
      </header>

      {/* Pricing Plans Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold">Pick the Right Plan for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Basic Plan */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold">Basic</h3>
            <p className="mt-2 text-gray-600">For small teams getting started.</p>
            <p className="text-2xl font-bold mt-4">$15/mo</p>
            <ul className="mt-4 text-gray-600">
              <li>✔ Essential CRM features</li>
              <li>✔ Email tracking</li>
              <li>✔ 24/7 Support</li>
            </ul>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              Get Started
            </button>
          </div>
          
          {/* Professional Plan */}
          <div className="p-6 bg-white shadow rounded-lg border-2 border-blue-600">
            <h3 className="text-xl font-bold text-blue-600">Professional</h3>
            <p className="mt-2 text-gray-600">For growing businesses.</p>
            <p className="text-2xl font-bold mt-4">$39/mo</p>
            <ul className="mt-4 text-gray-600">
              <li>✔ Everything in Basic</li>
              <li>✔ Advanced reporting</li>
              <li>✔ Automation tools</li>
            </ul>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              Get Started
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold">Enterprise</h3>
            <p className="mt-2 text-gray-600">For large-scale operations.</p>
            <p className="text-2xl font-bold mt-4">$79/mo</p>
            <ul className="mt-4 text-gray-600">
              <li>✔ Everything in Professional</li>
              <li>✔ Custom integrations</li>
              <li>✔ Dedicated account manager</li>
            </ul>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
