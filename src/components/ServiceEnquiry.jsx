// src/components/ServiceEnquiry.jsx
import { useState, useEffect } from 'react';
import { submitServicesEnquiry } from '../services/servicesEnquiryService';
import { getAllServices } from '../services/servicesService';

const ServiceEnquiry = ({ serviceId, onClose }) => {
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    serviceId: serviceId
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const allServices = await getAllServices();
        const data = allServices.find(s => s.id === serviceId);
        
        if (data) {
          setService(data);
          setFormData(prev => ({
            ...prev,
            subject: `Enquiry about "${data.title}" service`
          }));
        } else {
          throw new Error('Service not found');
        }
        
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching service details:`, err);
        setError('Failed to load service details.');
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // Validation
      if (!formData.subject || !formData.message) {
        throw new Error('Please complete all required fields');
      }

      // Submit enquiry
      await submitServicesEnquiry(formData);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting service enquiry:', err);
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div>
        <div>
          <button onClick={onClose}>×</button>
          <h2>Enquiry Sent</h2>
        </div>
        <div>
          <p>Thank you for your interest! Your enquiry has been sent successfully.</p>
          <p>We'll get back to you shortly regarding the "{service.title}" service.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={onClose}>×</button>
        <h2>Enquire About This Service</h2>
      </div>

      {service && (
        <div>
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
            <p>Service Type: {service.type}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please provide details about your requirements, any questions you have, or specific needs for this service."
            required
            rows="5"
          ></textarea>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
};

export default ServiceEnquiry;