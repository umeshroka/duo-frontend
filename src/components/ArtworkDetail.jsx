// src/components/ArtworkDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { ModalContext } from '../contexts/modalContext';
import { getArtworkById } from '../services/artworkService';

const ArtworkDetail = () => {
  const { id } = useParams();
  const { openArtworkEnquiry } = useContext(ModalContext);
  
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const data = await getArtworkById(id);
        setArtwork(data);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching artwork with ID ${id}:`, err);
        setError('Failed to load artwork details. Please try again later.');
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleEnquire = () => {
      openArtworkEnquiry(id);
  };

  // Loading state
  if (loading) {
    return <div>Loading artwork details...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Artwork not found
  if (!artwork) {
    return <div>Artwork not found.</div>;
  }

  return (
    <div>
      <div>
        {/* Artwork Image */}
        <div>
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
          />
        </div>
        
        {/* Artwork Details */}
        <div>
          <h1>{artwork.title}</h1>
          <p>{artwork.year || 'n.d.'}</p>
          
          {artwork.artist && (
            <p>
              <Link to={`/artists/${artwork.artist.id}`}>
                {artwork.artist.name}
              </Link>
            </p>
          )}
          
          {artwork.medium && <p>Medium: {artwork.medium}</p>}
          {artwork.category && <p>Category: {artwork.category}</p>}
          {artwork.mounting && <p>Mounting: {artwork.mounting}</p>}
          
          {artwork.heightCm && artwork.widthCm && (
            <p>Dimensions: {artwork.heightCm} × {artwork.widthCm} cm</p>
          )}
          
          {artwork.price ? (
            <div>
              <p>Price: ${artwork.price.toLocaleString()}</p>
              <button onClick={handleEnquire}>
                Enquire
              </button>
            </div>
          ) : (
            <p>Not for sale</p>
          )}
        </div>
      </div>
      
      {/* Artwork Description */}
      {(artwork.description || artwork.longDescription) && (
        <div>
          <h2>About this Artwork</h2>
          {artwork.description && <p>{artwork.description}</p>}
          {artwork.longDescription && <p>{artwork.longDescription}</p>}
        </div>
      )}
      
      {/* Tags */}
      {artwork.additionalTags && artwork.additionalTags.length > 0 && (
        <div>
          <h3>Tags</h3>
          <div>
            {artwork.additionalTags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <Link to="/artworks">Back to Artworks</Link>
      </div>
    </div>
  );
};

export default ArtworkDetail;