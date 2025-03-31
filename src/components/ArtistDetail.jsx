// src/components/ArtistDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getArtistById } from "../services/artistService";

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const data = await getArtistById(id);
        setArtist(data);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching artist with ID ${id}:`, err);
        setError("Failed to load artist details. Please try again later.");
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--color-gold)] rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading artist details...</p>
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

  // Artist not found
  if (!artist) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Artist Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
              <p className="text-lg text-gray-600">
                {artist.nationality}, {artist.birthYear}
                {artist.deathYear ? ` - ${artist.deathYear}` : " - Present"}
              </p>
            </div>
            <Link
              to="/artists"
              className="text-[var(--color-gold)] hover:underline mt-4 md:mt-0"
            >
              ← Back to Artists
            </Link>
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("about")}
                className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "about"
                    ? "border-[var(--color-gold)] text-[var(--color-gold)]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("artworks")}
                className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "artworks"
                    ? "border-[var(--color-gold)] text-[var(--color-gold)]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Artworks
                {artist.artworks && artist.artworks.length > 0 && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                    {artist.artworks.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`mr-8 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "media"
                    ? "border-[var(--color-gold)] text-[var(--color-gold)]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Press & Media
                {artist.mediaArticles && artist.mediaArticles.length > 0 && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                    {artist.mediaArticles.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* About Tab Content */}
        {activeTab === "about" && (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Featured Image - Left Side */}
            <div>
              {artist.artworks && artist.artworks.find((a) => a.isFeatured) ? (
                <div className="bg-gray-50 p-4">
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={artist.artworks.find((a) => a.isFeatured).imageUrl}
                      alt={`Featured artwork by ${artist.name}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ) : artist.artworks && artist.artworks[0] ? (
                <div className="bg-gray-50 p-4">
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={artist.artworks[0].imageUrl}
                      alt={`Artwork by ${artist.name}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4">
                  <div className="aspect-square flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No artwork available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Biography & About - Right Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Biography</h2>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-700">
                    {artist.bio}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">About the Artist</h2>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line text-gray-700">
                    {artist.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Artworks Tab Content */}
        {activeTab === "artworks" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">
              Artworks by {artist.name}
            </h2>

            {!artist.artworks || artist.artworks.length === 0 ? (
              <p className="text-gray-500">No artworks available.</p>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                {artist.artworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="break-inside-avoid mb-8 pb-6 border-b border-gray-200 group"
                  >
                    <Link to={`/artworks/${artwork.id}`}>
                      <div className="mb-4 bg-gray-50 p-2 overflow-hidden">
                        {artwork.imageUrl ? (
                          <img
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-medium group-hover:text-[var(--color-gold)] transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {artwork.year || "n.d."}
                        {artwork.medium && `, ${artwork.medium}`}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Press & Media Tab Content */}
        {activeTab === "media" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Press & Media</h2>

            {artist.mediaArticles && artist.mediaArticles.length > 0 ? (
              <div className="space-y-6">
                {artist.mediaArticles.map((article) => (
                  <div
                    key={article.id}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    {article.url ? (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h3 className="text-xl font-medium mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="font-medium">{article.source}</span>
                          {article.date && (
                            <>
                              <span className="mx-2">•</span>
                              <span>
                                {new Date(article.date).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </a>
                    ) : (
                      <div>
                        <h3 className="text-xl font-medium mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="font-medium">{article.source}</span>
                          {article.date && (
                            <>
                              <span className="mx-2">•</span>
                              <span>
                                {new Date(article.date).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                        {article.content && (
                          <p className="text-gray-700 mt-3">
                            {article.content}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-6">
                  No press or media content available for this artist.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-center text-gray-600 italic">
                    Media content including press articles, videos, interviews,
                    and exhibitions will be displayed here once available.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistDetail;
