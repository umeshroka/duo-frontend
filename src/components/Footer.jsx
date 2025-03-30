// src/components/Footer.jsx
import { Link } from "react-router";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaTwitter, FaWeixin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 mt-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo placeholder */}
          <div>
            <Link to="/" className="text-xl font-bold text-black">
              DUO
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Re-discover a lost art
            </p>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-sm font-semibold mb-4">CONTACT US</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 mt-0.5 mr-3 text-gray-600" />
                <p className="text-sm text-gray-600">
                  317 Outram Rd
                  <br />
                  #01-59 Concord Shopping Center
                  <br />
                  Singapore 169075
                </p>
              </div>
              <div className="flex items-center">
                <FaPhone className="w-4 h-4 mr-3 text-gray-600" />
                <p className="text-sm text-gray-600">+65 62350306</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-4 h-4 mr-3 text-gray-600" />
                <p className="text-sm text-gray-600">info@duo.art</p>
              </div>
            </div>
          </div>

          {/* Social media links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-[var(--color-gold)]"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[var(--color-gold)]"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[var(--color-gold)]"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[var(--color-gold)]"
              >
                <FaWeixin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
