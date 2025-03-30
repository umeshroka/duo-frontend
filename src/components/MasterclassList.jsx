// src/components/MasterclassList.jsx
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ModalContext } from '../contexts/modalContext';
import { getAllMasterclasses } from '../services/masterclassService';

const MasterclassList = () => {
  const { user } = useContext(UserContext);
  const { openMasterclassEnquiry, openSignIn } = useContext(ModalContext);
  
  const [masterclasses, setMasterclasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterclasses = async () => {
      try {
        setLoading(true);
        const data = await getAllMasterclasses();
        setMasterclasses(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching masterclasses:', err);
        setError('Failed to load masterclasses. Please try again later.');
        setLoading(false);
      }
    };

    fetchMasterclasses();
  }, []);

  const handleEnquire = (masterclassId) => {
    if (user) {
      openMasterclassEnquiry(masterclassId);
    } else {
      openSignIn();
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading masterclasses...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // No masterclasses found
  if (masterclasses.length === 0) {
    return <div>No masterclasses available at the moment.</div>;
  }

  return (
    <div>
      <h1>Masterclasses</h1>
      <p>Learn from experts through our specialized masterclasses in traditional Chinese calligraphy and painting.</p>
      
      <div>
        {masterclasses.map((masterclass) => (
          <div key={masterclass.id}>
            {masterclass.imageUrl && (
              <div>
                <img 
                  src={masterclass.imageUrl} 
                  alt={masterclass.title} 
                />
              </div>
            )}
            
            <div>
              <h2>{masterclass.title}</h2>
              <p>{masterclass.description}</p>
              
              <div>
                <button 
                  onClick={() => handleEnquire(masterclass.id)}
                >
                  Enquire About This Masterclass
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterclassList;