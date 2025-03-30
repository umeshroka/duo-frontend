// src/components/NavBar.jsx
import { useContext } from 'react';
import { Link } from 'react-router'; 
import { UserContext } from '../contexts/UserContext';
import { ModalContext } from '../contexts/modalContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const { openSignIn, openSignUp } = useContext(ModalContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      <div>
        {/* Logo */}
        <Link to="/">DUO</Link>
        
        {/* Navigation links */}
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
            <div>
              <button onClick={openSignIn}>Sign In</button>
              <button onClick={openSignUp}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;