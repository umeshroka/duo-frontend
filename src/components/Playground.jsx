// src/components/Playground.jsx
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/modalContext";
import { generateArtwork } from "../services/playgroundService";

const Playground = () => {
  const { user } = useContext(UserContext);
  const { openSignIn } = useContext(ModalContext);

  const [formData, setFormData] = useState({
    artworkType: "CALLIGRAPHY_ONLY",
    subjectPrompt: "",
    calligraphyStyle: "",
    paintingStyle: "",
    dynasty: "",
    technique: "",
  });

  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If user is not logged in, open sign-in modal instead of generating
    if (!user) {
      openSignIn();
      return;
    }

    if (!formData.subjectPrompt) {
      setError("Please enter a subject prompt");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateArtwork(formData);
      setGeneratedImage(result.imageData);
    } catch (err) {
      console.error("Error generating artwork:", err);
      setError(err.message || "Failed to generate artwork. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Art Playground</h1>
        <p className="text-gray-600 mb-8">
          Create your own AI-generated traditional Chinese artwork.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="artworkType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Artwork Type
                </label>
                <select
                  id="artworkType"
                  name="artworkType"
                  value={formData.artworkType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                  required
                >
                  <option value="CALLIGRAPHY_ONLY">Calligraphy Only</option>
                  <option value="PAINTING_WITH_CALLIGRAPHY">
                    Calligraphy + Painting
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subjectPrompt"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject / Text
                </label>
                <input
                  type="text"
                  id="subjectPrompt"
                  name="subjectPrompt"
                  value={formData.subjectPrompt}
                  onChange={handleChange}
                  placeholder={
                    formData.artworkType === "CALLIGRAPHY_ONLY"
                      ? "Enter text for calligraphy"
                      : "Describe what you want in your painting with calligraphy"
                  }
                  className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="calligraphyStyle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Calligraphy Style
                </label>
                <select
                  id="calligraphyStyle"
                  name="calligraphyStyle"
                  value={formData.calligraphyStyle}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                >
                  <option value="">Select a style (optional)</option>
                  <option value="regular">Regular Script (楷书)</option>
                  <option value="running">Running Script (行书)</option>
                  <option value="cursive">Cursive Script (草书)</option>
                  <option value="clerical">Clerical Script (隶书)</option>
                  <option value="seal">Seal Script (篆书)</option>
                </select>
              </div>

              {formData.artworkType === "PAINTING_WITH_CALLIGRAPHY" && (
                <div>
                  <label
                    htmlFor="paintingStyle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Painting Style
                  </label>
                  <select
                    id="paintingStyle"
                    name="paintingStyle"
                    value={formData.paintingStyle}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                  >
                    <option value="">Select a style (optional)</option>
                    <option value="landscape">Landscape (山水画)</option>
                    <option value="bird-and-flower">
                      Bird and Flower (花鸟画)
                    </option>
                    <option value="figure">Figure Painting (人物画)</option>
                    <option value="literati">Literati Painting (文人画)</option>
                  </select>
                </div>
              )}

              <div>
                <label
                  htmlFor="dynasty"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Dynasty Style
                </label>
                <select
                  id="dynasty"
                  name="dynasty"
                  value={formData.dynasty}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                >
                  <option value="">Select a dynasty (optional)</option>
                  <option value="Tang">Tang Dynasty</option>
                  <option value="Song">Song Dynasty</option>
                  <option value="Yuan">Yuan Dynasty</option>
                  <option value="Ming">Ming Dynasty</option>
                  <option value="Qing">Qing Dynasty</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="technique"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Technique
                </label>
                <select
                  id="technique"
                  name="technique"
                  value={formData.technique}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
                >
                  <option value="">Select a technique (optional)</option>
                  <option value="gongbi">Gongbi (工笔)</option>
                  <option value="xieyi">Xieyi (写意)</option>
                  <option value="mogu">Mogu (没骨)</option>
                  <option value="shuimo">Shuimo (水墨)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
              >
                {loading ? "Generating..." : "Generate Artwork"}
              </button>

              {!user && (
                <p className="text-sm text-gray-500 mt-2">
                  You'll need to sign in to generate artwork. You can set up
                  your options first, then sign in when you're ready to
                  generate.
                </p>
              )}
            </form>
          </div>

          <div>
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Generating your artwork...
                  </p>
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
                </div>
              </div>
            ) : generatedImage ? (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Your Generated Artwork
                </h2>
                <div className="border border-gray-200 mb-4">
                  <img
                    src={generatedImage}
                    alt="AI-generated artwork"
                    className="w-full h-auto"
                  />
                </div>

                <button
                  onClick={() => {
                    setFormData({
                      artworkType: "CALLIGRAPHY_ONLY",
                      subjectPrompt: "",
                      calligraphyStyle: "",
                      paintingStyle: "",
                      dynasty: "",
                      technique: "",
                    });
                    setGeneratedImage(null);
                  }}
                  className="px-4 py-2 text-sm border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Create Another
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 bg-gray-50 w-full">
                  <p className="text-gray-500">
                    Your generated artwork will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
