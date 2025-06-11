import React, { useState } from "react";
// import LoginGoogle from "./LoginGoogle";
import { Button, Modal } from "antd";
import "./landing.css";
import Form from "./FormComponent";
import FormComponent from "./FormComponent";
import Navbar from "./Navbar";
import PricingPage from "./Pricing";
import ProductCards from "./ProductCards";
import { Link } from "react-router";
import Loader from "./Loader";
import LandingContainer from "./landingContainer";
import LandingTabs from "./LandingTabs";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <header className=" bgColor text-white py-20 text-center">
          <h1 className="text-5xl font-bold">Close More Deals with Ease</h1>
          <p className="mt-4 text-lg">
            CRM software designed to make sales simple and effective.
          </p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200">
            Get Started for Free
          </button>
        </header>
        {/* <Loader/> */}

        {/* Features Section */}
        <section className="py-16 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Why Choose Our CRM?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold">Automated Workflows</h3>
              <p className="mt-2 text-gray-600">
                Save time with smart automation tools.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold">Detailed Insights</h3>
              <p className="mt-2 text-gray-600">
                Gain va;luable data to improve sales performance.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold">Easy Integration</h3>
              <p className="mt-2 text-gray-600">
                Seamlessly connects with your favorite tools.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-200 py-16 text-center">
          <h2 className="text-3xl font-semibold">What Our Users Say</h2>
          <div className="mt-8 max-w-4xl mx-auto">
            <blockquote className="text-xl italic">
              “This CRM transformed our sales process and boosted our revenue.”
            </blockquote>
            <p className="mt-2 font-semibold">- Jane Doe, Sales Manager</p>
          </div>
        </section>
        <section>
          <LandingContainer/>
        </section>
        <section>
          <LandingTabs/>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-semibold">
            Start Closing More Deals Today
          </h2>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
            <>
              <Button type="primary" onClick={showModal}>
                <Link to={"/register"}>Try for free</Link>
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {/* <p></p>
                 <p>Some contents...<Form/></p> */}
                {/* <p> </p> */}
                <FormComponent handleOk={handleOk} />
              </Modal>
            </>
          </button>
        </section>
        <section>
          <ProductCards />
        </section>
      </div>
      <PricingPage />
    </>
  );
};

export default LandingPage;
