// src/components/Footer.jsx
import { Link } from "react-router";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaInstagram, FaWeixin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 sm:py-10 mt-12 sm:mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo section */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="block text-xl sm:text-2xl font-bold text-[var(--color-red)] mb-2 sm:mb-3">
                DUO
              </span>
              <img
                src="https://res.cloudinary.com/dyz/image/upload/v1743389492/Logo_Logo_qogfbx.png"
                alt="Duo Logo"
                className="h-16 sm:h-20"
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-600">Re-discover a lost art</p>
          </div>

          {/* About Us Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-gray-600 hover:text-[var(--color-gold)]">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-gray-600 hover:text-[var(--color-gold)]">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-gray-600 hover:text-[var(--color-gold)]">
                  Collaborate With Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-gray-600 hover:text-[var(--color-gold)]">
                  Join Our Community
                </Link>
              </li>
            </ul>
          </div>
            
          {/* Contact Information */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">CONTACT US</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 sm:mr-3 text-gray-600" />
                <p className="text-xs sm:text-sm text-gray-600">
                  317 Outram Rd
                  <br />
                  #01-59 Concord Shopping Center
                  <br />
                  Singapore 169075
                </p>
              </div>
              <div className="flex items-center">
                <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-gray-600" />
                <p className="text-xs sm:text-sm text-gray-600">+65 62350306</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-gray-600" />
                <p className="text-xs sm:text-sm text-gray-600">info@duo.art</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-[var(--color-gold)]"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[var(--color-gold)]"
                aria-label="WeChat"
              >
                <FaWeixin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://github.com/umeshroka/duo-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[var(--color-gold)]"
                aria-label="GitHub Repository"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;