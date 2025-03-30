// src/components/Playground.jsx
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ModalContext } from '../contexts/modalContext';
import { generateArtwork } from '../services/playgroundService';

const Playground = () => {
  const { user } = useContext(UserContext);
  const { openSignIn } = useContext(ModalContext);
  
  const [formData, setFormData] = useState({
    artworkType: 'CALLIGRAPHY_ONLY',
    subjectPrompt: '',
    calligraphyStyle: '',
    paintingStyle: '',
    dynasty: '',
    technique: ''
  });
  
  const [generatedImage, setGeneratedImage] = useState(null);
  const [fullPrompt, setFullPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      setError('Please enter a subject prompt');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateArtwork(formData);
      setGeneratedImage(result.imageData);
      setFullPrompt(result.fullPrompt);
    } catch (err) {
      console.error('Error generating artwork:', err);
      setError(err.message || 'Failed to generate artwork. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Art Playground</h1>
      <p>Create your own AI-generated traditional Chinese artwork.</p>
      
      <div>
        <form onSubmit={handleSubmit}>
          {error && <div>{error}</div>}
          
          <div>
            <label htmlFor="artworkType">Artwork Type</label>
            <select
              id="artworkType"
              name="artworkType"
              value={formData.artworkType}
              onChange={handleChange}
              required
            >
              <option value="CALLIGRAPHY_ONLY">Calligraphy Only</option>
              <option value="PAINTING_WITH_CALLIGRAPHY">Calligraphy + Painting</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="subjectPrompt">Subject / Text</label>
            <input
              type="text"
              id="subjectPrompt"
              name="subjectPrompt"
              value={formData.subjectPrompt}
              onChange={handleChange}
              placeholder={formData.artworkType === 'CALLIGRAPHY_ONLY' ? 
                'Enter text for calligraphy' : 
                'Describe what you want in your painting with calligraphy'}
              required
            />
          </div>
          
          <div>
            <label htmlFor="calligraphyStyle">Calligraphy Style</label>
            <select
              id="calligraphyStyle"
              name="calligraphyStyle"
              value={formData.calligraphyStyle}
              onChange={handleChange}
            >
              <option value="">Select a style (optional)</option>
              <option value="regular">Regular Script (楷书)</option>
              <option value="running">Running Script (行书)</option>
              <option value="cursive">Cursive Script (草书)</option>
              <option value="clerical">Clerical Script (隶书)</option>
              <option value="seal">Seal Script (篆书)</option>
            </select>
          </div>
          
          {formData.artworkType === 'PAINTING_WITH_CALLIGRAPHY' && (
            <div>
              <label htmlFor="paintingStyle">Painting Style</label>
              <select
                id="paintingStyle"
                name="paintingStyle"
                value={formData.paintingStyle}
                onChange={handleChange}
              >
                <option value="">Select a style (optional)</option>
                <option value="landscape">Landscape (山水画)</option>
                <option value="bird-and-flower">Bird and Flower (花鸟画)</option>
                <option value="figure">Figure Painting (人物画)</option>
                <option value="literati">Literati Painting (文人画)</option>
              </select>
            </div>
          )}
          
          <div>
            <label htmlFor="dynasty">Dynasty Style</label>
            <select
              id="dynasty"
              name="dynasty"
              value={formData.dynasty}
              onChange={handleChange}
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
            <label htmlFor="technique">Technique</label>
            <select
              id="technique"
              name="technique"
              value={formData.technique}
              onChange={handleChange}
            >
              <option value="">Select a technique (optional)</option>
              <option value="gongbi">Gongbi (工笔)</option>
              <option value="xieyi">Xieyi (写意)</option>
              <option value="mogu">Mogu (没骨)</option>
              <option value="shuimo">Shuimo (水墨)</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Artwork'}
          </button>
          
          {!user && (
            <p>You'll need to sign in to generate artwork. You can set up your options first, then sign in when you're ready to generate.</p>
          )}
        </form>
      </div>
      
      {loading && (
        <div>
          <p>Generating your artwork. This may take a moment...</p>
        </div>
      )}
      
      {generatedImage && !loading && (
        <div>
          <h2>Your Generated Artwork</h2>
          <div>
            <img 
              src={generatedImage} 
              alt="AI-generated artwork" 
            />
          </div>
          
          <div>
            <h3>Prompt Used</h3>
            <p>{fullPrompt}</p>
          </div>
          
          <button onClick={() => {
            setFormData({
              artworkType: 'CALLIGRAPHY_ONLY',
              subjectPrompt: '',
              calligraphyStyle: '',
              paintingStyle: '',
              dynasty: '',
              technique: ''
            });
            setGeneratedImage(null);
            setFullPrompt('');
          }}>
            Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default Playground;