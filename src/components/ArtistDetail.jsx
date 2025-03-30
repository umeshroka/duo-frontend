// src/components/ArtistDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { getArtistById } from '../services/artistService';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const data = await getArtistById(id);
        setArtist(data);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching artist with ID ${id}:`, err);
        setError('Failed to load artist details. Please try again later.');
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  // Loading state
  if (loading) {
    return <div>Loading artist details...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Artist not found
  if (!artist) {
    return <div>Artist not found.</div>;
  }

  return (
    <div>
      <div>
        <h1>{artist.name}</h1>
        <p>{artist.nationality}, {artist.birthYear} - {artist.deathYear || 'Present'}</p>
      </div>
      
      {/* Artist Biography */}
      <section>
        <h2>Biography</h2>
        <p>{artist.bio}</p>
        
        <h2>About the Artist</h2>
        <p>{artist.about}</p>
      </section>
      
      {/* Artist's Artworks */}
      {artist.artworks && artist.artworks.length > 0 && (
        <section>
          <h2>Artworks</h2>
          <div>
            {artist.artworks.map((artwork) => (
              <div key={artwork.id}>
                <Link to={`/artworks/${artwork.id}`}>
                  <div>
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title} 
                    />
                  </div>
                  <div>
                    <h3>{artwork.title}</h3>
                    <p>{artwork.year || 'n.d.'}</p>
                    {artwork.medium && <p>{artwork.medium}</p>}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Media Articles */}
      {artist.mediaArticles && artist.mediaArticles.length > 0 && (
        <section>
          <h2>In the Media</h2>
          <div>
            {artist.mediaArticles.map((article) => (
              <div key={article.id}>
                {article.url ? (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h3>{article.title}</h3>
                    <p>{article.source}</p>
                    {article.date && <p>{new Date(article.date).toLocaleDateString()}</p>}
                  </a>
                ) : (
                  <div>
                    <h3>{article.title}</h3>
                    <p>{article.source}</p>
                    {article.date && <p>{new Date(article.date).toLocaleDateString()}</p>}
                    {article.content && <p>{article.content}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div>
        <Link to="/artists">Back to Artists</Link>
      </div>
    </div>
  );
};

export default ArtistDetail;