// src/components/ArtworkList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getAllArtworks } from '../services/artworkService';

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const data = await getAllArtworks();
        setArtworks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artworks:', err);
        setError('Failed to load artworks. Please try again later.');
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading artworks...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // No artworks found
  if (artworks.length === 0) {
    return <div>No artworks found.</div>;
  }

  return (
    <div>
      <h1>Artworks</h1>
      <p>Explore our collection of traditional Chinese calligraphy and paintings.</p>
      
      <div>
        {artworks.map((artwork) => (
          <div key={artwork.id}>
            <Link to={`/artworks/${artwork.id}`}>
              {/* Only render the image if imageUrl exists */}
              {artwork.imageUrl && (
                <div>
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                  />
                </div>
              )}
              <div>
                <h2>{artwork.title}</h2>
                <p>{artwork.artist?.name}</p>
                <p>{artwork.year || 'n.d.'}</p>
                {artwork.price && <p>Price: ${artwork.price.toLocaleString()}</p>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkList;