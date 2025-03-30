// src/components/Footer.jsx
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        {/* Logo and description */}
        <div>
          <Link to="/">DUO</Link>
          <p>
            Explore and learn about traditional Chinese calligraphy and paintings. 
            Discover artworks, artists, masterclasses, and professional services.
          </p>
        </div>
        
        {/* Links */}
        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <Link to="/artworks">Artworks</Link>
            </li>
            <li>
              <Link to="/editorials">Editorials</Link>
            </li>
          </ul>
        </div>
        
        {/* Services */}
        <div>
          <h3>Services</h3>
          <ul>
            <li>
              <Link to="/masterclasses">Masterclasses</Link>
            </li>
            <li>
              <Link to="/services">Professional Services</Link>
            </li>
            <li>
              <Link to="/playground">AI Playground</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div>
        <p>&copy; {currentYear} DUO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;