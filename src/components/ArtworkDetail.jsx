// src/components/ArtworkDetail.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import { ModalContext } from "../contexts/modalContext";
import { getArtworkById } from "../services/artworkService";

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
        setError("Failed to load artwork details. Please try again later.");
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
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading artwork details...</p>
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

  // Artwork not found
  if (!artwork) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">Artwork not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div>
            {artwork.imageUrl && (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-auto"
              />
            )}
          </div>

          {/* Artwork Details */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{artwork.title}</h1>

            {artwork.artist && (
              <Link
                to={`/artists/${artwork.artist.id}`}
                className="text-lg block mb-4 hover:text-[var(--color-gold)] transition-colors"
              >
                {artwork.artist.name}
              </Link>
            )}

            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p>{artwork.year || "n.d."}</p>
                </div>

                {artwork.medium && (
                  <div>
                    <p className="text-sm text-gray-600">Medium</p>
                    <p>{artwork.medium}</p>
                  </div>
                )}

                {artwork.category && (
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p>{artwork.category}</p>
                  </div>
                )}

                {artwork.mounting && (
                  <div>
                    <p className="text-sm text-gray-600">Mounting</p>
                    <p>{artwork.mounting}</p>
                  </div>
                )}

                {artwork.heightCm && artwork.widthCm && (
                  <div>
                    <p className="text-sm text-gray-600">Dimensions</p>
                    <p>
                      {artwork.heightCm} × {artwork.widthCm} cm
                    </p>
                  </div>
                )}
              </div>

              {artwork.price ? (
                <div className="mb-8">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-xl font-bold">
                    ${artwork.price.toLocaleString()}
                  </p>

                  <button
                    onClick={handleEnquire}
                    className="mt-4 px-6 py-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
                  >
                    Enquire
                  </button>
                </div>
              ) : (
                <p className="mb-8 italic">Not for sale</p>
              )}
            </div>

            {/* Artwork Description */}
            {(artwork.description || artwork.longDescription) && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">About this Artwork</h2>
                {artwork.description && (
                  <p className="mb-4">{artwork.description}</p>
                )}
                {artwork.longDescription && <p>{artwork.longDescription}</p>}
              </div>
            )}

            {/* Tags */}
            {artwork.additionalTags && artwork.additionalTags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.additionalTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/artworks"
            className="inline-flex items-center text-black hover:text-[var(--color-gold)] transition-colors"
          >
            ← Back to Artworks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
