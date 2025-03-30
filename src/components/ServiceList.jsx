// src/components/ServicesList.jsx
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ModalContext } from '../contexts/modalContext';
import { getAllServices } from '../services/servicesService';

const ServicesList = () => {
  const { user } = useContext(UserContext);
  const { openServiceEnquiry, openSignIn } = useContext(ModalContext);
  
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
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEnquire = (serviceId) => {
    if (user) {
      openServiceEnquiry(serviceId);
    } else {
      openSignIn();
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading services...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // No services found
  if (services.length === 0) {
    return <div>No services available at the moment.</div>;
  }

  return (
    <div>
      <h1>Professional Services</h1>
      <p>Explore our range of professional services in Chinese calligraphy and art.</p>
      
      <div>
        {services.map((service) => (
          <div key={service.id}>
            {service.imageUrl && (
              <div>
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                />
              </div>
            )}
            
            <div>
              <h3>{service.title}</h3>
              <p>Type: {service.type}</p>
              <p>{service.description}</p>
              
              <div>
                <button 
                  onClick={() => handleEnquire(service.id)}
                >
                  Enquire About This Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;