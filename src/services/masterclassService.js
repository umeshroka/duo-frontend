const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/masterclasses`;

const getAllMasterclasses = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error fetching masterclasses:", err);
    throw err;
  }
};

export { getAllMasterclasses };
