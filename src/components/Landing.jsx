// src/components/Landing.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getFeaturedArtist } from '../services/artistService';
import { getAllEditorials } from '../services/editorialService';

const Landing = () => {
  const [featuredArtist, setFeaturedArtist] = useState(null);
  const [recentEditorials, setRecentEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch featured artist and their artwork
        const artistData = await getFeaturedArtist();
        setFeaturedArtist(artistData);
        
        // Fetch recent editorials
        const editorialsData = await getAllEditorials();
        // Take only the most recent 3 editorials
        setRecentEditorials(editorialsData.slice(0, 3));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching landing page data:', err);
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section>
        <h1>Discover Chinese Calligraphy & Art</h1>
        <p>
          Explore traditional Chinese art through our collection of masterpieces, 
          learn from experts, and experience the beauty of this ancient tradition.
        </p>
        
        <div>
          <Link to="/artworks">Browse Artworks</Link>
          <Link to="/masterclasses">Explore Masterclasses</Link>
        </div>
      </section>
      
      {/* Featured Artist Section */}
      {featuredArtist && (
        <section>
          <h2>Featured Artist</h2>
          
          <div>
            {/* Featured Artwork */}
            <div>
              {featuredArtist.artworks?.[0] && (
                <Link to={`/artworks/${featuredArtist.artworks[0].id}`}>
                  <div>
                    <img 
                      src={featuredArtist.artworks[0].imageUrl} 
                      alt={featuredArtist.artworks[0].title}
                    />
                  </div>
                  <div>
                    <p>{featuredArtist.artworks[0].title}</p>
                    <p>{featuredArtist.name}, {featuredArtist.artworks[0].year || 'n.d.'}</p>
                  </div>
                </Link>
              )}
            </div>
            
            {/* Artist Info */}
            <div>
              <h3>{featuredArtist.name}</h3>
              <p>{featuredArtist.nationality}, {featuredArtist.birthYear} - {featuredArtist.deathYear || 'Present'}</p>
              <p>{featuredArtist.about}</p>
              <Link to={`/artists/${featuredArtist.id}`}>
                View Artist Profile
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {/* Recent Editorials Section */}
      {recentEditorials.length > 0 && (
        <section>
          <h2>Recent Editorials</h2>
          
          <div>
            {recentEditorials.map(editorial => (
              <div key={editorial.id}>
                <Link to={`/editorials/${editorial.id}`}>
                  <div>
                    <img 
                      src={editorial.imageUrl} 
                      alt={editorial.title}
                    />
                  </div>
                  <h3>{editorial.title}</h3>
                  <p>By {editorial.author}</p>
                  <p>{new Date(editorial.publishedAt).toLocaleDateString()}</p>
                </Link>
              </div>
            ))}
          </div>
          
          <Link to="/editorials">View All Editorials</Link>
        </section>
      )}
    </div>
  );
};

export default Landing;