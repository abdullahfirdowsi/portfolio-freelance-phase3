import React from 'react';
import { Check, MessageCircle, Clock, Shield, Zap } from 'lucide-react';

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Mini Projects",
      price: "₹2,000 - ₹5,000",
      description: "Perfect for semester assignments and quick submissions",
      features: [
        "Simple project implementation",
        "Basic documentation",
        "Source code with comments",
        "1 revision included",
        "3-7 days delivery",
        "WhatsApp support"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Major Projects",
      price: "₹6,000 - ₹15,000",
      description: "Comprehensive final year projects with complete documentation",
      features: [
        "Complete project development",
        "Detailed documentation",
        "PPT presentation",
        "Viva preparation support",
        "3 revisions included",
        "10-20 days delivery",
        "24/7 WhatsApp support",
        "Video explanation"
      ],
      popular: true,
      color: "border-primary-500"
    },
    {
      name: "IEEE Papers",
      price: "₹8,000 - ₹12,000",
      description: "Research papers and conference submissions",
      features: [
        "Original research work",
        "IEEE format compliance",
        "Literature review",
        "Implementation & results",
        "2 revisions included",
        "15-25 days delivery",
        "Publication guidance",
        "Plagiarism report"
      ],
      popular: false,
      color: "border-gray-200"
    }
  ];

  const addOns = [
    {
      name: "Project Report",
      price: "₹500 - ₹1,000",
      description: "Detailed project documentation with proper formatting"
    },
    {
      name: "PPT Presentation",
      price: "₹500 - ₹800",
      description: "Professional presentation slides for project defense"
    },
    {
      name: "Viva Preparation",
      price: "₹1,000 - ₹2,000",
      description: "One-on-one session to prepare for project viva"
    },
    {
      name: "Video Explanation",
      price: "₹800 - ₹1,500",
      description: "Detailed video walkthrough of your project"
    },
    {
      name: "Extra Revisions",
      price: "₹300 - ₹500",
      description: "Additional revisions beyond included limit"
    },
    {
      name: "Rush Delivery",
      price: "₹1,000 - ₹3,000",
      description: "50% faster delivery for urgent requirements"
    }
  ];

  const policies = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Delivery Timeline",
      description: "Projects delivered within agreed timeframe. Rush delivery available for urgent needs."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Payment Terms",
      description: "50% advance payment required. Balance on delivery. Secure payment methods accepted."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Revision Policy",
      description: "Free revisions included as per package. Additional revisions charged separately."
    }
  ];

  return (
    <div className="section-padding animate-fade-in">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect package for your project needs. No hidden costs, just quality work.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${tier.color} ${
                tier.popular ? 'transform scale-105' : ''
              } transition-all duration-300 hover:shadow-xl`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-primary-600 mb-4">{tier.price}</div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-secondary-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={`https://wa.me/919943980796?text=Hi%20Abdullah,%20I'm%20interested%20in%20${tier.name}%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Get Started</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Add-on Services</h2>
            <p className="text-gray-600">Enhance your project with these additional services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <div className="text-xl font-bold text-primary-600 mb-3">{addon.price}</div>
                <p className="text-gray-600 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policies Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Policies</h2>
            <p className="text-gray-600">Clear terms for a smooth working relationship</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <div key={index} className="text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {policy.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{policy.title}</h3>
                <p className="text-gray-600">{policy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-16">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• All prices are in Indian Rupees (INR) and may vary based on project complexity</li>
            <li>• 50% advance payment required before starting work</li>
            <li>• Final delivery only after complete payment</li>
            <li>• No refund policy once work is delivered and approved</li>
            <li>• Source code ownership transfers to client after full payment</li>
            <li>• Free minor bug fixes within 7 days of delivery</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-primary-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Get a custom quote based on your specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I%20need%20a%20custom%20quote%20for%20my%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Get Custom Quote</span>
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Send Detailed Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;