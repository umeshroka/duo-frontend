// src/components/NavBar.jsx
import { useState, useContext } from 'react';
import { Link } from 'react-router'; 
import { UserContext } from '../contexts/UserContext';
import { ModalContext } from '../contexts/modalContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const { openSignIn } = useContext(ModalContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav>
      <div>
        {/* Logo */}
        <Link to="/">DUO</Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
        
        {/* Desktop navigation links */}
        <div>
          <Link to="/artists">Artists</Link>
          <Link to="/artworks">Artworks</Link>
          <Link to="/masterclasses">Masterclasses</Link>
          <Link to="/services">Services</Link>
          <Link to="/editorials">Editorials</Link>
          <Link to="/playground">AI Playground</Link>
          
          {/* Auth Section */}
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <button onClick={openSignIn}>Sign In</button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div>
          <Link to="/artists" onClick={() => setMobileMenuOpen(false)}>Artists</Link>
          <Link to="/artworks" onClick={() => setMobileMenuOpen(false)}>Artworks</Link>
          <Link to="/masterclasses" onClick={() => setMobileMenuOpen(false)}>Masterclasses</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/editorials" onClick={() => setMobileMenuOpen(false)}>Editorials</Link>
          <Link to="/playground" onClick={() => setMobileMenuOpen(false)}>AI Playground</Link>
          
          {/* Auth Section */}
          <div>
            {user ? (
              <div>
                <div>{user.email}</div>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  openSignIn();
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;