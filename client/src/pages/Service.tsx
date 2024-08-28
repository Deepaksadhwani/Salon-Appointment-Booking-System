import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import axios from "axios";
import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Service = () => {
  const { serviceId }: any = useParams();
  const [serviceData, setServiceData] = useState<any>(null);
  const [SERVICES, setServices] = useState<any>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const {
        data: { data },
      } = await axios.get(`${SERVER_URL}/service/get-services`, HEADERDATA);
      setServices(data)
    };
    fetchServices();

    if(SERVICES) {
      const selectedService = SERVICES.find(
        (service:any) => service.id === parseInt(serviceId),
      );
      setServiceData(selectedService);
    }
   
  }, [serviceId,SERVICES]);

  if (!serviceData) {
    return (
      <div className="mt-20 text-center text-xl font-bold">
        Service not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-red-100 py-12">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl md:flex">
          <img
            className="h-96 w-full object-cover md:w-1/2"
            src={serviceData.imageUrl}
            alt={serviceData.name}
          />
          <div className="p-8 md:w-1/2">
            <h1 className="mb-4 text-5xl font-extrabold text-gray-800">
              {serviceData.name}
            </h1>
            <p className="mb-6 text-gray-600">{serviceData.description}</p>
            <p className="mb-2 text-lg font-medium text-gray-700">
              Duration:{" "}
              <span className="font-semibold">
                {serviceData.duration} minutes
              </span>
            </p>
            <p className="mb-8 text-3xl font-bold text-indigo-600">
              ${serviceData.price.toFixed(2)}
            </p>
            <button className="w-full transform rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-2xl md:w-auto">
              Book Now
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-gray-700">
                "Amazing service! I felt completely rejuvenated after my
                full-body massage. Highly recommend!"
              </p>
              <p className="mt-2 text-sm text-gray-500">Damini Sharma</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-gray-700">
                "The facial treatment was incredible. My skin feels so soft and
                glowing!"
              </p>
              <p className="mt-2 text-sm text-gray-500">Vaishnavi Gupta</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-indigo-50 p-4">
              <h3 className="text-lg font-semibold text-indigo-600">
                What should I bring to my appointment?
              </h3>
              <p className="text-gray-700">
                Just bring yourself! We provide everything you need for the
                service.
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <h3 className="text-lg font-semibold text-indigo-600">
                Can I cancel or reschedule my booking?
              </h3>
              <p className="text-gray-700">
                Yes, you can cancel or reschedule up to 24 hours before your
                appointment.
              </p>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Related Services
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((service:any) => service.id !== parseInt(serviceId))
              .slice(0, 3)
              .map((relatedService:any) => (
                <div
                  key={relatedService.id}
                  className="overflow-hidden rounded-lg bg-white shadow-lg"
                >
                  <img
                    className="h-48 w-full object-cover"
                    src={relatedService.imageUrl}
                    alt={relatedService.name}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {relatedService.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {relatedService.description.slice(0, 60)}...
                    </p>
                    <p className="mt-4 text-lg font-bold text-indigo-600">
                      ${relatedService.price.toFixed(2)}
                    </p>
                    <Link to={`/services/${relatedService.id}`}>
                      <button className="mt-4 w-full transform rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white shadow-md transition hover:scale-105 hover:bg-indigo-700">
                        View Service
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
