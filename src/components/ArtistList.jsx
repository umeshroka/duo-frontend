// src/components/ArtistList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllArtists } from "../services/artistService";

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const data = await getAllArtists();
        setArtists(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching artists:", err);
        setError("Failed to load artists. Please try again later.");
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading artists...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // No artists found
  if (artists.length === 0) {
    return <div>No artists found.</div>;
  }

  return (
    <div>
      <h1>Artists</h1>
      <p>
        Explore our collection of renowned artists in Chinese calligraphy and
        painting.
      </p>

      <div>
        {artists.map((artist) => (
          <div key={artist.id}>
            <Link to={`/artists/${artist.id}`}>
              {/* Show featured artwork if available */}
              {artist.artworks &&
                artist.artworks[0] &&
                artist.artworks[0].imageUrl && (
                  <div>
                    <img
                      src={artist.artworks[0].imageUrl}
                      alt={`Artwork by ${artist.name}`}
                    />
                  </div>
                )}

              <div>
                <h2>{artist.name}</h2>
                <p>
                  {artist.nationality}, {artist.birthYear} -{" "}
                  {artist.deathYear || "Present"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
