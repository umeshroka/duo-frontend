// src/components/SignInForm.jsx
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/modalContext";
import { signIn } from "../services/authService";

const SignInForm = ({ onClose, onSuccess, switchToSignUp }) => {
  const { setUser } = useContext(UserContext);
    const {
      openArtworkEnquiry,
      openMasterclassEnquiry,
      openServiceEnquiry,
      savedArtworkEnquiryData,
      savedMasterclassEnquiryData,
      savedServiceEnquiryData,
    } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        throw new Error("Email and password are required");
      }

      // Attempt sign in
      const userData = await signIn(formData);
      setUser(userData);

       if (savedArtworkEnquiryData) {
         onClose(); // Close sign in form
         openArtworkEnquiry(savedArtworkEnquiryData.artworkId); // Reopen artwork inquiry
         return; // Early return to prevent onSuccess
       } else if (savedMasterclassEnquiryData) {
         onClose();
         openMasterclassEnquiry(savedMasterclassEnquiryData.masterclassId);
         return;
       } else if (savedServiceEnquiryData) {
         onClose();
         openServiceEnquiry(savedServiceEnquiryData.serviceId);
         return;
       }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md w-full bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Sign In</h2>
        <button
          onClick={onClose}
          className="text-black hover:text-[var(--color-green)] transition-colors"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={switchToSignUp}
            className="text-black hover:text-[var(--color-green)] transition-colors focus:outline-none"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
