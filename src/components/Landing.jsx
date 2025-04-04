// src/components/Landing.jsx
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { ModalContext } from "../contexts/modalContext";
import { getFeaturedArtist } from "../services/artistService";
import { getAllEditorials } from "../services/editorialService";
import { getAllArtworks } from "../services/artworkService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Landing = () => {
const { openSignUp } = useContext(ModalContext);
  const [featuredArtist, setFeaturedArtist] = useState(null);
  const [recentEditorials, setRecentEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [artworks, setArtworks] = useState([]);

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
        setRecentEditorials(editorialsData.slice(0, 4));

        // Fetch featured artworks
        const artworksData = await getAllArtworks();
        // Get artworks that are featured or just the first few
        const featuredArtworks =
          artworksData.filter((a) => a.isFeatured) || artworksData;
        setArtworks(featuredArtworks);

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
    }, 10000); // Change slide every 5 seconds

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
      <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 px-6">
        {/* Carousel container */}
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden mb-8">
          {/* Slide 1 - Duo Intro */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
              currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Left side - Red background as image replacement */}
              <div
                className="h-48 md:h-full md:w-1/2 flex-shrink-0"
                style={{ backgroundColor: "var(--color-red)" }}
              ></div>

              {/* Right side - Text content */}
              <div className="flex-grow flex items-center justify-center p-4 md:p-8 bg-white">
                <div className="max-w-xl">
                  <h1 className="text-[var(--color-red)]  text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6 ">
                    Duo: Art × Tech
                  </h1>
                  <p className="text-lg sm:text-xl mb-6 md:mb-8">
                    Re-discover a lost art: Chinese art and calligraphy
                  </p>
                  <button
                    onClick={openSignUp}
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-[var(--color-red)] text-white hover:bg-[var(--color-green)] transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Featured Artist */}
          <div
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
              currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="flex flex-col md:flex-row-reverse h-full">
              {/* Right side - Image (reversed order on desktop) */}
              <div className="h-48 md:h-full md:w-1/2 flex-shrink-0">
                {featuredArtist &&
                  featuredArtist.artworks &&
                  featuredArtist.artworks[0] && (
                    <img
                      src={featuredArtist.artworks[0].imageUrl}
                      alt={`Artwork by ${featuredArtist.name}`}
                      className="w-full h-full object-contain"
                    />
                  )}
              </div>

              {/* Left side - Text (reversed order on desktop) */}
              <div className="flex-grow flex items-center justify-center p-4 md:p-8 bg-white">
                <div className="max-w-xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">
                    Featured Artist
                  </h2>
                  <p className="text-l sm:text-xl mb-6 md:mb-8 text-[var(--color-gold)]">
                    {featuredArtist ? featuredArtist.name : ""}
                  </p>
                  {featuredArtist && (
                    <Link
                      to={`/artists/${featuredArtist.id}`}
                      className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-black text-white hover:bg-[var(--color-gold)] transition-colors font-medium"
                    >
                      View Artist Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Line Below Slides */}
        <div className="relative w-full mx-auto mt-8">
          {/* Left arrow - positioned at far left edge */}
          <button
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-10"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft size={16} className="sm:text-base md:text-lg" />
          </button>

          {/* Navigation lines - separate for each slide, extending nearly full width */}
          <div className="flex w-full px-8 sm:px-12 md:px-16">
            {[0, 1].map((slideIndex) => (
              <div
                key={slideIndex}
                className="h-[0.5px] sm:h-[1px] bg-gray-100 flex-1 mx-1"
                onClick={() => setCurrentSlide(slideIndex)}
              >
                <div
                  className={`h-full bg-gray-400 transition-all duration-500 ease-out ${
                    currentSlide === slideIndex ? "w-full" : "w-0"
                  }`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Right arrow - positioned at far right edge */}
          <button
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-10"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight size={16} className="sm:text-base md:text-lg" />
          </button>
        </div>
      </section>

      {/* Featured Artworks Section */}
      {artworks && artworks.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Artworks</h2>
            <Link
              to="/artworks"
              className="text-[var(--color-gold)] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {artworks.slice(0, 4).map((artwork) => (
              <div key={artwork.id} className="group">
                <Link to={`/artworks/${artwork.id}`} className="block">
                  <div className="aspect-square mb-4 overflow-hidden bg-white p-2">
                    {artwork.imageUrl && (
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="text-lg font-medium group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-600 italic line-clamp-1">
                    {artwork.artist?.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Editorials Section */}
      {recentEditorials.length > 0 && (
        <section className="px-6 pb-16">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Editorials</h2>
            <Link
              to="/editorials"
              className="text-[var(--color-gold)] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
