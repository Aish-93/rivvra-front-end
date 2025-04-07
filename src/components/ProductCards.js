import React from "react";
import crm from "../assets/images/crm.jpg";
import sales from "../assets/images/sales.jpg";
import hrms from "../assets/images/hrms.jpg"


const ProductCards =() =>{
    const products = [
        {
          id: 1,
          name: "CRM Software",
          price: "$20",
          description: "A high-quality product for your needs.",
          image: crm,
        },
        {
          id: 2,
          name: "To Do App",
          price: "$30",
          description: "Experience the difference with this item.",
          image: sales,
        },
        {
          id: 3,
          name: "Employee management software",
          price: "$25",
          description: "Perfectly crafted to meet your expectations.",
          image: hrms,
        },
        {
          id: 4,
          name: "Sales software",
          price: "$40",
          description: "Reliable, durable, and cost-effective.",
          image: sales,
        },
        {
          id: 5,
          name: "Payroll management software",
          price: "$50",
          description: "Top choice for professionals.",
          image: crm,
        }
        
      ];

    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10  ">
         {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-96"
        >
          <div className="flex flex-col">
            {/* Image Section (70%) */}
            <div className="min-h-7/12">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Description Section (30%) */}
            <div className=" p-4 flex flex-col justify-between min-h-5/12">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              </div>
              <div className="text-lg font-bold text-blue-500">{product.price}</div>
            </div>
          </div>
        </div>
      ))}
        </div>
        </>
    )
};

export default  ProductCards;