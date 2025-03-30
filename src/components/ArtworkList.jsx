// src/components/ArtworkList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllArtworks } from "../services/artworkService";

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
        console.error("Error fetching artworks:", err);
        setError("Failed to load artworks. Please try again later.");
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading artworks...</p>
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

  // No artworks found
  if (artworks.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">No artworks found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Artworks</h1>
        <p className="text-gray-600 mb-12">
          Explore our collection of traditional Chinese calligraphy and
          paintings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              to={`/artworks/${artwork.id}`}
              className="group"
            >
              <div className="mb-4 overflow-hidden">
                {artwork.imageUrl && (
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <h2 className="text-lg font-bold group-hover:text-[var(--color-gold)] transition-colors">
                {artwork.title}
              </h2>
              <p className="text-sm text-gray-600">{artwork.artist?.name}</p>
              <p className="text-sm text-gray-600">{artwork.year || "n.d."}</p>
              {artwork.price && (
                <p className="text-sm mt-1">
                  ${artwork.price.toLocaleString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkList;
