import { SERVICES } from '@/utils/ServicesListData';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceListPage = () => {
  const [serviceList, setServiceList] = useState(SERVICES);

  
  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceList && serviceList.map((service: any) => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img
                src={service.imageUrl || '/placeholder-image.png'}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="text-gray-800 mb-2">
              <span className="font-bold">Duration:</span> {service.duration} mins
            </div>
            <div className="text-xl text-purple-600 font-bold mb-4">₹{service.price.toFixed(2)}</div>
            <Link
              to={`/services/${service.id}`}
              className="block mx-auto bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListPage;
