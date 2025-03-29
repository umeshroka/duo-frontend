const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/artworks`;

const getAllArtworks = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error fetching artworks:", err);
    throw err;
  }
};

const getArtworkById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error(`Error fetching artwork with ID ${id}:`, err);
    throw err;
  }
};

export { getAllArtworks, getArtworkById };
