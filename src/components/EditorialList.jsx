// src/components/EditorialList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllEditorials } from "../services/editorialService";

const EditorialList = () => {
  const [editorials, setEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        setLoading(true);
        const data = await getAllEditorials();
        setEditorials(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching editorials:", err);
        setError("Failed to load editorials. Please try again later.");
        setLoading(false);
      }
    };

    fetchEditorials();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading editorials...</p>
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

  // No editorials found
  if (editorials.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">No editorials available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Editorials</h1>
        <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Explore our collection of articles and stories about Chinese art and
          calligraphy.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorials.map((editorial) => (
            <article
              key={editorial.id}
              className="border border-gray-100 hover:border-gray-300 rounded-lg overflow-hidden transition-all duration-300"
            >
              <Link
                to={`/editorials/${editorial.id}`}
                className="block group h-full flex flex-col"
              >
                {editorial.imageUrl && (
                  <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={editorial.imageUrl}
                      alt={editorial.title}
                      className="max-w-full max-h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                    {editorial.title}
                  </h2>
                  <div className="flex items-center text-xs text-gray-600 mb-3">
                    <span>By {editorial.author}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(editorial.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  {editorial.tags && editorial.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {editorial.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {editorial.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600">
                          +{editorial.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialList;
