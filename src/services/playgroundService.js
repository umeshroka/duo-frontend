const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/playground`;

const generateArtwork = async (generationParams) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const res = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(generationParams),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error generating AI artwork:", err);
    throw err;
  }
};

export { generateArtwork };
