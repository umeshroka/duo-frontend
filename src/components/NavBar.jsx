// src/components/NavBar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/modalContext";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const { openSignIn, openSignUp } = useContext(ModalContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="fixed w-full z-50">
      <nav className="py-4 px-6 border-b border-gray-200 bg-white">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-black">
            DUO
          </Link>
          

          {/* Mobile menu button */}
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/artists"
              className="text-sm hover:text-[var(--color-gold)] transition-colors"
            >
              Artists
            </Link>
            <Link
              to="/artworks"
              className="text-sm hover:text-[var(--color-gold)] transition-colors"
            >
              Artworks
            </Link>
            <Link
              to="/masterclasses"
              className="text-sm hover:text-[var(--color-gold)] transition-colors"
            >
              Masterclasses
            </Link>
            <Link
              to="/services"
              className="text-sm hover:text-[var(--color-gold)] transition-colors"
            >
              Services
            </Link>
            <Link
              to="/editorials"
              className="text-sm hover:text-[var(--color-gold)] transition-colors"
            >
              Editorials
            </Link>
            <Link
              to="/playground"
              className="text-sm hover:text-[var(--color-gold)] transition-colors"
            >
              AI Playground
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-black">{user.firstName || user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-sm px-3 py-2 border border-black rounded hover:bg-[var(--color-green)] hover:border-[var(--color-green)] hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={openSignIn}
                  className="text-sm px-3 py-2 border border-black rounded hover:bg-[var(--color-green)] hover:border-[var(--color-green)] hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={openSignUp}
                  className="text-sm px-3 py-2 bg-black text-white rounded hover:bg-[var(--color-green)] transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="flex flex-col py-4 px-6">
            <Link
              to="/artists"
              className="py-2 text-sm hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Artists
            </Link>
            <Link
              to="/artworks"
              className="py-2 text-sm hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Artworks
            </Link>
            <Link
              to="/masterclasses"
              className="py-2 text-sm hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Masterclasses
            </Link>
            <Link
              to="/services"
              className="py-2 text-sm hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/editorials"
              className="py-2 text-sm hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Editorials
            </Link>
            <Link
              to="/playground"
              className="py-2 text-sm hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Playground
            </Link>

            {/* Mobile Auth Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <span className="text-sm text-black">{user.firstName || user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-sm px-3 py-2 border border-black rounded hover:bg-[var(--color-green)] hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      openSignIn();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm px-3 py-2 border border-black rounded hover:bg-[var(--color-green)] hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      openSignUp();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm px-3 py-2 bg-black text-white rounded hover:bg-[var(--color-green)] transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
