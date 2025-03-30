// src/components/ServiceList.jsx
import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../contexts/modalContext";
import { getAllServices } from "../services/servicesService";

const ServicesList = () => {
  const { openServiceEnquiry } = useContext(ModalContext);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getAllServices();
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEnquire = (serviceId) => {
    openServiceEnquiry(serviceId);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading services...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
        <div className="p-4 bg-red-50 text-red-700">{error}</div>
      </div>
    );
  }

  // No services found
  if (services.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Professional Services</h1>
        <p className="text-gray-600 mb-12">
          Explore our range of professional services in Chinese calligraphy and
          art.
        </p>

        <div className="grid gap-16">
          {services.map((service) => (
            <div key={service.id} className="grid md:grid-cols-2 gap-8">
              {service.imageUrl && (
                <div className="overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Type: {service.type}
                </p>
                <p className="text-gray-800 mb-6 flex-grow">
                  {service.description}
                </p>

                <div>
                  <button
                    onClick={() => handleEnquire(service.id)}
                    className="px-6 py-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
                  >
                    Enquire About This Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
