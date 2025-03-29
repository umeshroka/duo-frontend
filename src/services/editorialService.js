const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/editorials`;

const getAllEditorials = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error fetching editorials:", err);
    throw err;
  }
};

const getEditorialById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error(`Error fetching editorial with ID ${id}:`, err);
    throw err;
  }
};

export { getAllEditorials, getEditorialById };
