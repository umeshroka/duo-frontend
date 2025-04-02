const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const res = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error updating user profile:", err);
    throw err;
  }
};

const deleteUserAccount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const res = await fetch(`${BASE_URL}/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete account");
    }

    return true;
  } catch (err) {
    console.error("Error deleting user account:", err);
    throw err;
  }
};

export { updateUserProfile, deleteUserAccount };
