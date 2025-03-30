
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ModalContext } from '../contexts/modalContext';
import { submitMasterclassEnquiry } from '../services/masterclassEnquiryService';
import { getAllMasterclasses } from '../services/masterclassService';

const MasterclassEnquiry = ({ masterclassId, onClose }) => {
  const { user } = useContext(UserContext);
  const { openSignIn, setSavedMasterclassEnquiryData, savedMasterclassEnquiryData } = useContext(ModalContext);
  
  const [masterclass, setMasterclass] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    masterclassId: masterclassId,
    selectedType: 'Individual' // Default value
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMasterclass = async () => {
      try {
        const allMasterclasses = await getAllMasterclasses();
        const data = allMasterclasses.find(m => m.id === masterclassId);
        
        if (data) {
          setMasterclass(data);
          
          // Check if we have saved form data
          if (savedMasterclassEnquiryData && savedMasterclassEnquiryData.masterclassId === masterclassId) {
            // Restore the saved form data
            setFormData(savedMasterclassEnquiryData);
            // Clear the saved data
            setSavedMasterclassEnquiryData(null);
          } else {
            // Set default subject
            setFormData(prev => ({
              ...prev,
              subject: `Enquiry about "${data.title}" masterclass`
            }));
          }
        } else {
          throw new Error('Masterclass not found');
        }
        
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching masterclass details:`, err);
        setError('Failed to load masterclass details.');
        setLoading(false);
      }
    };

    fetchMasterclass();
  }, [masterclassId, savedMasterclassEnquiryData, setSavedMasterclassEnquiryData]);

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

    try {
      // Validation
      if (!formData.subject || !formData.message || !formData.selectedType) {
        throw new Error('Please complete all required fields');
      }

      // Check authentication
      if (!user) {
        // Save form data for after login
        setSavedMasterclassEnquiryData(formData);
        // Close enquiry form and open sign in
        onClose();
        openSignIn();
        return;
      }

      setSubmitting(true);
      // Submit enquiry
      await submitMasterclassEnquiry(formData);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting masterclass enquiry:', err);
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
          <p>We'll get back to you shortly regarding the "{masterclass.title}" masterclass.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={onClose}>×</button>
        <h2>Enquire About This Masterclass</h2>
      </div>

      {masterclass && (
        <div>
          {masterclass.imageUrl && (
            <div>
              <img 
                src={masterclass.imageUrl} 
                alt={masterclass.title} 
              />
            </div>
          )}
          <div>
            <h3>{masterclass.title}</h3>
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
          <label htmlFor="selectedType">Masterclass Type</label>
          <select
            id="selectedType"
            name="selectedType"
            value={formData.selectedType}
            onChange={handleChange}
            required
          >
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please provide details about your interest in this masterclass, any questions you have, or specific requirements."
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

export default MasterclassEnquiry;