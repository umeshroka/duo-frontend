// src/components/MasterclassList.jsx
import { useState, useEffect, useContext } from "react";

import { ModalContext } from "../contexts/modalContext";
import { getAllMasterclasses } from "../services/masterclassService";

const MasterclassList = () => {

  const { openMasterclassEnquiry } = useContext(ModalContext);

  const [masterclasses, setMasterclasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterclasses = async () => {
      try {
        setLoading(true);
        const data = await getAllMasterclasses();
        setMasterclasses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching masterclasses:", err);
        setError("Failed to load masterclasses. Please try again later.");
        setLoading(false);
      }
    };

    fetchMasterclasses();
  }, []);

  const handleEnquire = (masterclassId) => {
    openMasterclassEnquiry(masterclassId);
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading masterclasses...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
        <div className="p-4 bg-red-50 text-red-700">{error}</div>
      </div>
    );
  }

  // No masterclasses found
  if (masterclasses.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-gray-600">
          No masterclasses available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Masterclasses</h1>
        <p className="text-gray-600 mb-12">
          Learn from experts through our specialized masterclasses in
          traditional Chinese calligraphy and painting.
        </p>

        <div className="grid gap-16">
          {masterclasses.map((masterclass) => (
            <div key={masterclass.id} className="bg-gray-50 overflow-hidden">
              <div className="grid md:grid-cols-2">
                {masterclass.imageUrl ? (
                  <div className="h-full">
                    <img
                      src={masterclass.imageUrl}
                      alt={masterclass.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-100 flex items-center justify-center h-64 md:h-full">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}

                <div className="p-8 flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">
                    {masterclass.title}
                  </h2>
                  <p className="text-gray-800 mb-6 flex-grow">
                    {masterclass.description}
                  </p>

                  <div>
                    <button
                      onClick={() => handleEnquire(masterclass.id)}
                      className="px-6 py-2 bg-black text-white hover:bg-[var(--color-green)] transition-colors"
                    >
                      Enquire About This Masterclass
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterclassList;
