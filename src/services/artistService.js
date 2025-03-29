const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/artists`;

const getAllArtists = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error fetching artists:", err);
    throw err;
  }
};

const getFeaturedArtist = async () => {
  try {
    const res = await fetch(`${BASE_URL}/featured`);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error fetching featured artist:", err);
    throw err;
  }
};

const getArtistById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error(`Error fetching artist with ID ${id}:`, err);
    throw err;
  }
};

export { getAllArtists, getFeaturedArtist, getArtistById };
