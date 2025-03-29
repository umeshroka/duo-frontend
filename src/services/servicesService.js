const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/services`;

const getAllServices = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error fetching services:", err);
    throw err;
  }
};

export { getAllServices };
