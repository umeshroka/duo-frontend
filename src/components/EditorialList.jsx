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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Editorials</h1>
        <p className="text-gray-600 mb-12">
          Explore our collection of articles and stories about Chinese art and
          calligraphy.
        </p>

        <div className="grid gap-12">
          {editorials.map((editorial) => (
            <article
              key={editorial.id}
              className="border-b border-gray-200 pb-12 mb-12 last:border-0 last:mb-0 last:pb-0"
            >
              <Link to={`/editorials/${editorial.id}`} className="group">
                {editorial.imageUrl && (
                  <div className="mb-4 overflow-hidden">
                    <img
                      src={editorial.imageUrl}
                      alt={editorial.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="mb-2">
                  <h2 className="text-xl font-bold group-hover:text-[var(--color-gold)] transition-colors">
                    {editorial.title}
                  </h2>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span>By {editorial.author}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(editorial.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                {editorial.tags && editorial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {editorial.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialList;
