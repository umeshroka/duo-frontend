// src/components/EditorialDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { getEditorialById } from '../services/editorialService';

const EditorialDetail = () => {
  const { id } = useParams();
  const [editorial, setEditorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEditorial = async () => {
      try {
        setLoading(true);
        const data = await getEditorialById(id);
        setEditorial(data);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching editorial with ID ${id}:`, err);
        setError('Failed to load editorial. Please try again later.');
        setLoading(false);
      }
    };

    fetchEditorial();
  }, [id]);

  // Loading state
  if (loading) {
    return <div>Loading editorial...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Editorial not found
  if (!editorial) {
    return <div>Editorial not found.</div>;
  }

  return (
    <div>
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
        <h1>{editorial.title}</h1>
        <div>
          <p>By {editorial.author}</p>
          <p>{new Date(editorial.publishedAt).toLocaleDateString()}</p>
        </div>
        
        {editorial.tags && editorial.tags.length > 0 && (
          <div>
            {editorial.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div>
        {/* Render content - in a real app, you might want to use a markdown renderer or HTML sanitizer */}
        <div dangerouslySetInnerHTML={{ __html: editorial.content }}></div>
      </div>
      
      <div>
        <Link to="/editorials">Back to Editorials</Link>
      </div>
    </div>
  );
};

export default EditorialDetail;