// src/components/ServiceEnquiry.jsx
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/modalContext";
import { submitServicesEnquiry } from "../services/servicesEnquiryService";
import { getAllServices } from "../services/servicesService";

const ServiceEnquiry = ({ serviceId, onClose }) => {
  const { user } = useContext(UserContext);
  const { openSignIn, setSavedServiceEnquiryData, savedServiceEnquiryData } =
    useContext(ModalContext);

  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    serviceId: serviceId,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const allServices = await getAllServices();
        const data = allServices.find((s) => s.id === serviceId);

        if (data) {
          setService(data);

          // Check if we have saved form data
          if (
            savedServiceEnquiryData &&
            savedServiceEnquiryData.serviceId === serviceId
          ) {
            // Restore the saved form data
            setFormData(savedServiceEnquiryData);
            // Clear the saved data
            setSavedServiceEnquiryData(null);
          } else {
            // Set default subject
            setFormData((prev) => ({
              ...prev,
              subject: `Enquiry about "${data.title}" service`,
            }));
          }
        } else {
          throw new Error("Service not found");
        }

        setLoading(false);
      } catch (err) {
        console.error(`Error fetching service details:`, err);
        setError("Failed to load service details.");
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId, savedServiceEnquiryData, setSavedServiceEnquiryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Validation
      if (!formData.subject || !formData.message) {
        throw new Error("Please complete all required fields");
      }

      // Check authentication
      if (!user) {
        // Save form data for after login
        setSavedServiceEnquiryData(formData);
        // Close enquiry form and open sign in
        onClose();
        openSignIn();
        return;
      }

      setSubmitting(true);
      // Submit enquiry
      await submitServicesEnquiry(formData);
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting service enquiry:", err);
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Enquiry Sent</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-[var(--color-green)] transition-colors"
          >
            ×
          </button>
        </div>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-[var(--color-green)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="mb-4">
            Thank you for your interest! Your enquiry has been sent
            successfully.
          </p>
          <p className="mb-8">
            We'll get back to you shortly regarding the "{service.title}"
            service.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Enquire About This Service</h2>
        <button
          onClick={onClose}
          className="text-black hover:text-[var(--color-green)] transition-colors"
        >
          ×
        </button>
      </div>

      {service && (
        <div className="flex mb-6 border-b pb-6">
          {service.imageUrl && (
            <div className="w-24 h-24 flex-shrink-0 mr-4">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="font-bold">{service.title}</h3>
            <p className="text-sm text-gray-600">
              Service Type: {service.type}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm">{error}</div>
        )}

        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please provide details about your requirements, any questions you have, or specific needs for this service."
            className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
            required
            rows="5"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full p-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
        >
          {submitting ? "Sending..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default ServiceEnquiry;
