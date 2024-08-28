import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type ServicesListTypes = {
  id? : string | number, 
  name: string;
  description: string;
  duration: number;
  price: number;
  photoUrl: number;
}
const ServiceListPage = () => {
  const [serviceList, setServiceList] = useState<ServicesListTypes[]>();

  useEffect(() => {
    const fetchServices = async () => {
      const {
        data: { data },
      } = await axios.get(`${SERVER_URL}/service/get-services`, HEADERDATA);
      setServiceList(data);
      
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Our Services
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {serviceList &&
          serviceList.map((service: any) => (
            <div
              key={service.id}
              className="transform rounded-xl bg-white p-6 shadow-lg transition duration-500 hover:scale-105"
            >
              <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={service.imageUrl || "/placeholder-image.png"}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                {service.name}
              </h2>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <div className="mb-2 text-gray-800">
                <span className="font-bold">Duration:</span> {service.duration}{" "}
                mins
              </div>
              <div className="mb-4 text-xl font-bold text-purple-600">
                ₹{service.price.toFixed(2)}
              </div>
              <Link
                to={`/services/${service.id}`}
                className="mx-auto block rounded-lg bg-purple-600 px-4 py-2 text-center text-white transition hover:bg-purple-700"
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
