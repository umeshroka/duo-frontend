// src/components/Landing.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getFeaturedArtist } from "../services/artistService";
import { getAllEditorials } from "../services/editorialService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Landing = () => {
  const [featuredArtist, setFeaturedArtist] = useState(null);
  const [recentEditorials, setRecentEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch featured artist and their artwork
        const artistData = await getFeaturedArtist();
        setFeaturedArtist(artistData);

        // Fetch recent editorials
        const editorialsData = await getAllEditorials();
        // Take only the most recent 3 editorials
        setRecentEditorials(editorialsData.slice(0, 3));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching landing page data:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (loading) return; // Don't start auto-scroll while loading

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : prev + 1));
    }, 7000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [loading]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : prev - 1));
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--color-gold)] rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
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

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Hero Section with Carousel */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="relative h-[500px] overflow-hidden">
          {/* Slide 1 - Duo Intro */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 flex flex-col md:flex-row ${
              currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Left side image */}
            <div className="md:w-1/2 h-60 md:h-auto flex items-center justify-center p-4">
              <img
                src="https://res.cloudinary.com/dyz/image/upload/v1743433838/R0001966_qvxwqg_e0fa74.jpg"
                alt="Duo - Chinese Calligraphy & Art"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Right side text */}
            <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-[var(--color-red)]">DUO</span> Chinese
                Calligraphy & Art
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Rediscover the timeless beauty of traditional Chinese art
                through our curated collection of masterpieces.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/artworks"
                  className="px-6 py-3 bg-black text-white hover:bg-[var(--color-gold)] transition-colors"
                >
                  Explore Artworks
                </Link>
                <Link
                  to="/masterclasses"
                  className="px-6 py-3 border border-black text-black hover:bg-[var(--color-green)] hover:border-[var(--color-green)] hover:text-white transition-colors"
                >
                  Join Masterclasses
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 - Featured Artist */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 flex flex-col md:flex-row ${
              currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Left side image */}
            <div className="md:w-1/2 h-60 md:h-auto flex items-center justify-center p-4">
              {featuredArtist &&
              featuredArtist.artworks &&
              featuredArtist.artworks[0] ? (
                <img
                  src={featuredArtist.artworks[0].imageUrl}
                  alt={`Artwork by ${featuredArtist.name}`}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-400">
                  No featured artwork available
                </div>
              )}
            </div>

            {/* Right side text */}
            <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
              {featuredArtist ? (
                <>
                  <h2 className="text-2xl font-bold mb-2">Featured Artist</h2>
                  <h3 className="text-3xl font-bold mb-4 text-[var(--color-gold)]">
                    {featuredArtist.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {featuredArtist.nationality}, {featuredArtist.birthYear}
                    {featuredArtist.deathYear
                      ? ` - ${featuredArtist.deathYear}`
                      : " - Present"}
                  </p>
                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {featuredArtist.bio}
                  </p>
                  <div>
                    <Link
                      to={`/artists/${featuredArtist.id}`}
                      className="inline-block px-6 py-3 bg-black text-white hover:bg-[var(--color-gold)] transition-colors"
                    >
                      View Artist Profile
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-gray-600">No featured artist available</p>
              )}
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            <div
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                currentSlide === 0 ? "bg-[var(--color-gold)]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(0)}
              aria-label="Go to slide 1"
            ></div>
            <div
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                currentSlide === 1 ? "bg-[var(--color-gold)]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(1)}
              aria-label="Go to slide 2"
            ></div>
          </div>

          {/* Carousel Control Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <FaArrowLeft className="text-gray-800" />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <FaArrowRight className="text-gray-800" />
          </button>
        </div>
      </section>

      {/* Recent Editorials Section */}
      {recentEditorials.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Editorials</h2>
            <Link
              to="/editorials"
              className="text-[var(--color-gold)] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentEditorials.map((editorial) => (
              <div key={editorial.id} className="group">
                <Link to={`/editorials/${editorial.id}`} className="block">
                  <div className="aspect-video mb-4 overflow-hidden bg-gray-100">
                    {editorial.imageUrl && (
                      <img
                        src={editorial.imageUrl}
                        alt={editorial.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                    {editorial.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{editorial.author}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(editorial.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;
