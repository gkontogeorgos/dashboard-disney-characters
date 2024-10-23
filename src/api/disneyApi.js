import axios from "axios";

const API_BASE_URL = "https://api.disneyapi.dev";

export const fetchCharacters = async ({ page, pageSize, searchTerm }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`, {
      params: {
        page,
        pageSize,
        name: searchTerm ? searchTerm : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};
