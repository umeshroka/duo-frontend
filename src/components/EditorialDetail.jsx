// src/components/EditorialDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getEditorialById } from "../services/editorialService";

const EditorialDetail = () => {
  const { id } = useParams();
  const [editorial, setEditorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEditorial = async () => {
      try {
        setLoading(true);
        const data = await getEditorialById(id);
        setEditorial(data);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching editorial with ID ${id}:`, err);
        setError("Failed to load editorial. Please try again later.");
        setLoading(false);
      }
    };

    fetchEditorial();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading editorial...</p>
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

  // Editorial not found
  if (!editorial) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">Editorial not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-2xl mx-auto">
        {editorial.imageUrl && (
          <div className="mb-8">
            <img
              src={editorial.imageUrl}
              alt={editorial.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4">{editorial.title}</h1>

        <div className="flex items-center text-sm text-gray-600 mb-6">
          <span>By {editorial.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(editorial.publishedAt).toLocaleDateString()}</span>
        </div>

        {editorial.tags && editorial.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
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

        <div className="prose prose-lg max-w-none">
          {/* Render content with proper styling */}
          <div dangerouslySetInnerHTML={{ __html: editorial.content }}></div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            to="/editorials"
            className="inline-block text-black hover:text-[var(--color-gold)] transition-colors"
          >
            ← Back to Editorials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditorialDetail;
