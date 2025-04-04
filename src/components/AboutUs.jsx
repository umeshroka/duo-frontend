// src/components/AboutUs.jsx
import { Link } from "react-router";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">About Duo</h1>

        {/* Vision & Mission */}
        <section id="vision" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            Our Vision & Mission
          </h2>
          <p className="text-gray-700 mb-4">
            Duo was created to bridge the gap between tradition and technology
            in the art world. Our mission is to preserve and promote traditional
            Chinese calligraphy and paintings while making them accessible to a
            global audience through modern technology.
          </p>
          <p className="text-gray-700 mb-8">
            We believe in the power of art to connect cultures and generations,
            serving as a platform where artists, collectors, and enthusiasts can
            come together to appreciate and learn about this important cultural
            heritage.
          </p>

          <div className="bg-gray-50 p-6 mb-4">
            <p className="text-gray-700 italic">
              "We aim to create a digital ecosystem where traditional Chinese
              art forms find new expression through technology and reach
              audiences worldwide."
            </p>
          </div>
        </section>

        {/* Our Plans */}
        <section id="plans" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            Our Plans
          </h2>
          <p className="text-gray-700 mb-4">
            At Duo, we're developing innovative AI technologies that can
            analyze, understand, and even create traditional Chinese artworks.
            Our AI art generation tools are designed to respect and preserve the
            authenticity of traditional styles while making these art forms more
            accessible.
          </p>
          <p className="text-gray-700 mb-4">
            We're building a comprehensive educational platform with
            masterclasses from renowned artists, interactive learning tools, and
            resources for both beginners and advanced practitioners.
          </p>
          <p className="text-gray-700 mb-4">
            Our long-term vision includes creating a global community of artists
            and enthusiasts, organizing exhibitions, and developing tools for
            art authentication and preservation.
          </p>
        </section>

        {/* Partner With Us */}
        <section id="partner" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            Partner With Us
          </h2>
          <p className="text-gray-700 mb-4">
            We invite galleries, museums, and cultural institutions to join us
            in our mission to preserve and promote traditional Chinese art
            forms. Through partnerships, we can create exhibitions, educational
            programs, and digital archives that showcase these important
            cultural treasures.
          </p>
          <p className="text-gray-700 mb-4">
            If you represent an art institution or gallery interested in
            collaboration, please
            <Link
              to="#contact"
              className="text-[var(--color-gold)] hover:underline ml-1"
            >
              contact us
            </Link>{" "}
            to discuss potential partnerships.
          </p>
        </section>

        {/* Collaborate With Us */}
        <section id="collaborate" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            Collaborate With Us
          </h2>
          <p className="text-gray-700 mb-4">
            Are you a machine learning engineer, software developer, or AI
            researcher interested in the intersection of art and technology?
            We're actively looking for talented individuals to help us develop
            our AI models for art analysis and generation.
          </p>
          <p className="text-gray-700 mb-4">
            Our technical team is working on cutting-edge models that understand
            the unique characteristics of traditional Chinese calligraphy and
            painting. If you're passionate about this field,
            <Link
              to="#contact"
              className="text-[var(--color-gold)] hover:underline ml-1"
            >
              we'd love to hear from you
            </Link>
            .
          </p>
        </section>

        {/* Join Our Community */}
        <section id="community" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">
            Join Our Community
          </h2>
          <p className="text-gray-700 mb-4">
            Duo is more than a platform—it's a community of artists, collectors,
            scholars, and enthusiasts united by a passion for traditional
            Chinese art forms. Join us to participate in discussions, attend
            virtual events, and contribute to our open-source initiatives.
          </p>
          <p className="text-gray-700 mb-4">
            Support our mission by signing up, following us on social media, and
            participating in our educational programs. Together, we can ensure
            these precious art forms continue to thrive in the digital age.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-50 p-6">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Whether you're an artist, collector,
            researcher, or simply an enthusiast, please reach out with your
            questions, suggestions, or collaboration ideas.
          </p>
          <div className="space-y-3">
            <p className="flex items-center text-gray-700">
              <FaEnvelope className="w-4 h-4 mr-3 text-gray-700" />
              <span>info@duo.art</span>
            </p>
            <p className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="w-5 h-5 mr-3 text-gray-700" />
              <span>
                317 Outram Rd, #01-59 Concord Shopping Center, Singapore 169075
              </span>
            </p>
            <p className="flex items-center text-gray-700">
              <FaPhone className="w-4 h-4 mr-3 text-gray-700" />
              <span>+65 62350306</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
