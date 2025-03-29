const BASE_URL = `${
  import.meta.env.VITE_BACK_END_SERVER_URL
}/artwork-enquiries`;

const submitArtworkEnquiry = async (enquiryData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(enquiryData),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error submitting artwork enquiry:", err);
    throw err;
  }
};

export { submitArtworkEnquiry };
