// contexts/ModalContext.jsx
import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
  // Auth modals
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  
  // Enquiry modals with their associated IDs
  const [showArtworkEnquiry, setShowArtworkEnquiry] = useState(false);
  const [showMasterclassEnquiry, setShowMasterclassEnquiry] = useState(false);
  const [showServiceEnquiry, setShowServiceEnquiry] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  const [savedArtworkEnquiryData, setSavedArtworkEnquiryData] = useState(null);
  const [savedMasterclassEnquiryData, setSavedMasterclassEnquiryData] = useState(null);
  const [savedServiceEnquiryData, setSavedServiceEnquiryData] = useState(null);
  
  // Auth modal functions
  const openSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };
  
  const openSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };
  
  const closeModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowArtworkEnquiry(false);
    setShowMasterclassEnquiry(false);
    setShowServiceEnquiry(false);
    setCurrentItemId(null);
  };
  
  const toggleForms = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };
  
  // Enquiry modal functions
  const openArtworkEnquiry = (artworkId) => {
    setCurrentItemId(artworkId);
    setShowArtworkEnquiry(true);
  };
  
  const openMasterclassEnquiry = (masterclassId) => {
    setCurrentItemId(masterclassId);
    setShowMasterclassEnquiry(true);
  };
  
  const openServiceEnquiry = (serviceId) => {
    setCurrentItemId(serviceId);
    setShowServiceEnquiry(true);
  };
  
  return (
    <ModalContext.Provider value={{ 
      // Auth modal states and functions
      showSignIn, 
      showSignUp, 
      openSignIn, 
      openSignUp, 
      closeModals, 
      toggleForms,
      
      // Enquiry modal states and functions
      showArtworkEnquiry,
      showMasterclassEnquiry,
      showServiceEnquiry,
      currentItemId,
      openArtworkEnquiry,
      openMasterclassEnquiry,
      openServiceEnquiry,

      savedArtworkEnquiryData,
      setSavedArtworkEnquiryData,
      savedMasterclassEnquiryData,
      setSavedMasterclassEnquiryData,
      savedServiceEnquiryData,
      setSavedServiceEnquiryData
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, ModalContext };