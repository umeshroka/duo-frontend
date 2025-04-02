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
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading artists...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
        <div className="p-4 bg-red-50 text-red-700">{error}</div>
      </div>
    );
  }

  // No artists found
  if (artists.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">No artists found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Artists</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Explore our collection of renowned artists in Chinese calligraphy and
          painting.
        </p>

        <div className="space-y-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="border border-gray-100 hover:border-gray-300 rounded-lg overflow-hidden transition-all duration-300"
            >
              <Link
                to={`/artists/${artist.id}`}
                className="flex flex-col md:flex-row"
              >
                {/* Image on the left */}
                <div className="md:w-1/3">
                  {artist.artworks &&
                  artist.artworks[0] &&
                  artist.artworks[0].imageUrl ? (
                    <div className="w-full h-60 md:h-48 flex items-center justify-center p-4">
                      <img
                        src={artist.artworks[0].imageUrl}
                        alt={`Artwork by ${artist.name}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-60 md:h-48 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>

                {/* Text on the right */}
                <div className="md:w-2/3 p-6 flex flex-col justify-center">
                  <h2 className="text-xl font-medium text-black hover:text-[var(--color-gold)] transition-colors">
                    {artist.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    {artist.nationality}, {artist.birthYear}
                    {artist.deathYear ? ` - ${artist.deathYear}` : " - Present"}
                  </p>
                  {artist.bio && (
                    <p className="text-gray-700 line-clamp-2">
                      {artist.bio.substring(0, 150)}
                      {artist.bio.length > 150 ? "..." : ""}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
