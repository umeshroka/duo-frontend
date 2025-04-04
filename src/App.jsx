import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router";
import { ModalContext } from "./contexts/modalContext";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import ArtistList from "./components/ArtistList";
import ArtistDetail from "./components/ArtistDetail";
import ArtworkList from "./components/ArtworkList";
import ArtworkDetail from "./components/ArtworkDetail";
import MasterclassList from "./components/MasterclassList";
import ServicesList from "./components/ServiceList";
import EditorialList from "./components/EditorialList";
import EditorialDetail from "./components/EditorialDetail";
import Playground from "./components/Playground";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";


import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import ArtworkEnquiry from "./components/ArtworkEnquiry";
import MasterclassEnquiry from "./components/MasterclassEnquiry";
import ServiceEnquiry from "./components/ServiceEnquiry";

const App = () => {
  const {
    showSignIn,
    showSignUp,
    showArtworkEnquiry,
    showMasterclassEnquiry,
    showServiceEnquiry,
    currentItemId,
    closeModals,
    toggleForms,
  } = useContext(ModalContext);

  return (
    <div className="app">
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/artists" element={<ArtistList />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/artworks" element={<ArtworkList />} />
          <Route path="/artworks/:id" element={<ArtworkDetail />} />
          <Route path="/masterclasses" element={<MasterclassList />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/editorials" element={<EditorialList />} />
          <Route path="/editorials/:id" element={<EditorialDetail />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      <Footer />

      {showSignIn && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SignInForm
              onClose={closeModals}
              onSuccess={closeModals}
              switchToSignUp={toggleForms}
            />
          </div>
        </div>
      )}

      {showSignUp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SignUpForm
              onClose={closeModals}
              onSuccess={closeModals}
              switchToSignIn={toggleForms}
            />
          </div>
        </div>
      )}

      {showArtworkEnquiry && (
        <div className="modal-overlay">
          <div className="modal-content enquiry-form">
            <ArtworkEnquiry artworkId={currentItemId} onClose={closeModals} />
          </div>
        </div>
      )}

      {showMasterclassEnquiry && (
        <div className="modal-overlay">
          <div className="modal-content enquiry-form">
            <MasterclassEnquiry
              masterclassId={currentItemId}
              onClose={closeModals}
            />
          </div>
        </div>
      )}

      {showServiceEnquiry && (
        <div className="modal-overlay">
          <div className="modal-content enquiry-form">
            <ServiceEnquiry serviceId={currentItemId} onClose={closeModals} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
