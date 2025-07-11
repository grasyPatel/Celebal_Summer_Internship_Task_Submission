import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";

const FeatureSection = () => {
  const features = [
    {
      icon: <FaShippingFast className="w-8 h-8 text-green-600" />,
      title: "Free International Shipping",
      description: "Enjoy free shipping worldwide on all orders—no minimum required.",
    },
    {
      icon: <BsArrowRepeat className="w-8 h-8 text-green-600" />,
      title: "45 Days Return",
      description: "Not satisfied? Return your items within 45 days for a full refund.",
    },
    {
      icon: <MdSecurity className="w-8 h-8 text-green-600" />,
      title: "Secure Checkout",
      description: "Your payment is safe with industry-leading encryption.",
    },
  ];

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="space-y-4 px-4">
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
