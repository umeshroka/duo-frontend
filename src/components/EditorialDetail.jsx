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

  // Function to add paragraph breaks to the content
  const formatContent = (content) => {
    if (!content) return [];

    // Split the content into paragraphs based on sentences
    // Try to keep 2-3 sentences per paragraph for readability
    const sentences = content.split(/(?<=[.!?])\s+/);
    const paragraphs = [];
    let currentParagraph = "";
    let sentenceCount = 0;

    sentences.forEach((sentence) => {
      currentParagraph += sentence + " ";
      sentenceCount++;

      // Create a new paragraph after every 2-3 sentences
      // Vary the count slightly to make it look more natural
      if (sentenceCount >= (paragraphs.length % 2 === 0 ? 2 : 3)) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
        sentenceCount = 0;
      }
    });

    // Add any remaining content as the last paragraph
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  };

  const contentParagraphs = formatContent(editorial.content);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Article header - left side on desktop */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">{editorial.title}</h1>

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
          </div>

          {/* Featured image - right side on desktop */}
          {editorial.imageUrl && (
            <div className="md:w-1/2">
              <div className="bg-white p-2">
                <img
                  src={editorial.imageUrl}
                  alt={editorial.title}
                  className="w-full h-auto object-contain max-h-[300px] mx-auto"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-gray-800 leading-relaxed space-y-6">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
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
