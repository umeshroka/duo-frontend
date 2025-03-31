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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Artworks</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Explore our collection of traditional Chinese calligraphy and
          paintings.
        </p>

        {/* Masonry-style layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-12 space-y-12">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="break-inside-avoid mb-12 pb-8 border-b border-gray-200"
            >
              <Link to={`/artworks/${artwork.id}`} className="block group">
                <div className="mb-4 overflow-hidden bg-gray-50 p-2">
                  {artwork.imageUrl && (
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h2 className="text-lg font-medium group-hover:text-[var(--color-gold)] transition-colors mb-1">
                  {artwork.title}
                </h2>
                <p className="text-sm text-gray-600 italic mb-1">
                  {artwork.artist?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {artwork.year || "n.d."}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkList;
