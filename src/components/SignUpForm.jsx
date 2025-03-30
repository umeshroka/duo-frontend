// src/components/SignUpForm.jsx
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ModalContext } from "../contexts/modalContext";
import { signUp } from "../services/authService";

const SignUpForm = ({ onClose, onSuccess, switchToSignIn }) => {
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
    firstName: "",
    lastName: "",
    phoneNumber: "",
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

      // Attempt sign up
      const userData = await signUp(formData);
      setUser(userData);

        if (savedArtworkEnquiryData) {
          onClose(); // Close sign up form
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
      console.error("Sign up error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md w-full bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Create Account</h2>
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

        <div className="mb-4">
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

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 focus:border-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={switchToSignIn}
            className="text-black hover:text-[var(--color-green)] transition-colors focus:outline-none"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
