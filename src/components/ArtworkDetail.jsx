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
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--color-gold)] rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading artwork details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
        <div className="p-4 bg-red-50 text-[var(--color-red)]">{error}</div>
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
        <div className="grid md:grid-cols-2 gap-16">
          {/* Artwork Image */}
          <div className="bg-gray-50 p-4 flex justify-center">
            {artwork.imageUrl && (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-w-full max-h-[80vh] object-contain"
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
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    Year
                  </p>
                  <p className="font-medium">{artwork.year || "n.d."}</p>
                </div>

                {artwork.medium && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      Medium
                    </p>
                    <p className="font-medium">{artwork.medium}</p>
                  </div>
                )}

                {artwork.category && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      Category
                    </p>
                    <p className="font-medium">{artwork.category}</p>
                  </div>
                )}

                {artwork.mounting && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      Mounting
                    </p>
                    <p className="font-medium">{artwork.mounting}</p>
                  </div>
                )}

                {artwork.heightCm && artwork.widthCm && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      Dimensions
                    </p>
                    <p className="font-medium">
                      {artwork.heightCm} × {artwork.widthCm} cm
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-8 border-t border-b border-gray-200 py-6">
                <button
                  onClick={handleEnquire}
                  className="px-8 py-3 bg-[var(--color-black)] text-white hover:bg-[var(--color-green)] transition-colors"
                >
                  Enquire
                </button>
              </div>
            </div>

            {/* Artwork Description */}
            {(artwork.description || artwork.longDescription) && (
              <div>
                <h2 className="text-xl font-bold mb-4">About this Artwork</h2>
                {artwork.description && (
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    {artwork.description}
                  </p>
                )}
                {artwork.longDescription && (
                  <p className="text-gray-700 leading-relaxed">
                    {artwork.longDescription}
                  </p>
                )}
              </div>
            )}

            {/* Tags */}
            {artwork.additionalTags && artwork.additionalTags.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {artwork.additionalTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm hover:bg-[var(--color-gold)] hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            to="/artworks"
            className="inline-flex items-center text-[var(--color-gold)] hover:underline transition-colors"
          >
            ← Back to Artworks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
