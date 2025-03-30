// src/components/EditorialList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getAllEditorials } from '../services/editorialService';

const EditorialList = () => {
  const [editorials, setEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        setLoading(true);
        const data = await getAllEditorials();
        setEditorials(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching editorials:', err);
        setError('Failed to load editorials. Please try again later.');
        setLoading(false);
      }
    };

    fetchEditorials();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading editorials...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // No editorials found
  if (editorials.length === 0) {
    return <div>No editorials available at the moment.</div>;
  }

  return (
    <div>
      <h1>Editorials</h1>
      <p>Explore our collection of articles and stories about Chinese art and calligraphy.</p>
      
      <div>
        {editorials.map((editorial) => (
          <div key={editorial.id}>
            <Link to={`/editorials/${editorial.id}`}>
              {/* Only render the image if imageUrl exists */}
              {editorial.imageUrl && (
                <div>
                  <img 
                    src={editorial.imageUrl} 
                    alt={editorial.title} 
                  />
                </div>
              )}
              <div>
                <h2>{editorial.title}</h2>
                <p>By {editorial.author}</p>
                <p>{new Date(editorial.publishedAt).toLocaleDateString()}</p>
                {editorial.tags && editorial.tags.length > 0 && (
                  <div>
                    {editorial.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorialList;