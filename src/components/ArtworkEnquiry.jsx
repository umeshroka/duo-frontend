// src/components/ArtworkEnquiry.jsx
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/modalContext";
import { submitArtworkEnquiry } from "../services/artworkEnquiryService";
import { getArtworkById } from "../services/artworkService";

const ArtworkEnquiry = ({ artworkId, onClose }) => {
  const { user } = useContext(UserContext);
  const { openSignIn, setSavedArtworkEnquiryData, savedArtworkEnquiryData } = useContext(ModalContext);
  const [artwork, setArtwork] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    artworkId: artworkId,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data = await getArtworkById(artworkId);
        setArtwork(data);
        if (savedArtworkEnquiryData && savedArtworkEnquiryData.artworkId === artworkId) {
            // Restore the saved form data
            setFormData(savedArtworkEnquiryData);
            // Clear the saved data
            setSavedArtworkEnquiryData(null);
          } else {
            // Set default subject
            setFormData(prev => ({
              ...prev,
              subject: `Enquiry about "${data.title}"`
            }));
          }
          
          setLoading(false);
      } catch (err) {
        console.error(`Error fetching artwork details:`, err);
        setError("Failed to load artwork details.");
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId, savedArtworkEnquiryData, setSavedArtworkEnquiryData]);

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
        throw new Error('Please complete all required fields');
      }

      // Check authentication
      if (!user) {
        // Save form data for after login
        setSavedArtworkEnquiryData(formData);
        // Close enquiry form and open sign in
        onClose();
        openSignIn();
        return;
      }

      setSubmitting(true);
      // Submit enquiry
      await submitArtworkEnquiry(formData);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
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
          <p>
            Thank you for your interest! Your enquiry has been sent
            successfully.
          </p>
          <p>We'll get back to you shortly regarding "{artwork.title}".</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={onClose}>×</button>
        <h2>Enquire About This Artwork</h2>
      </div>

      {artwork && (
        <div>
          <div>
            <img src={artwork.imageUrl} alt={artwork.title} />
          </div>
          <div>
            <h3>{artwork.title}</h3>
            <p>{artwork.artist?.name}</p>
            {artwork.price && <p>${artwork.price.toLocaleString()}</p>}
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
            placeholder="Please provide details about your interest in this artwork, any questions you have, or if you'd like to arrange a viewing."
            required
            rows="5"
          ></textarea>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default ArtworkEnquiry;
