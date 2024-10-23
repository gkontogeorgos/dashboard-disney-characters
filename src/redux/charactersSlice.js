import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharacters } from "api/disneyApi";
import { INTITIAL_STATE } from "./state";

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(params);
      return response;
    } catch (error) {
      console.error("Error fetching characters:", error);
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: INTITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = "LOADING";
        state.error = null;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.list = action.payload.data;
        state.totalPages = action.payload.info?.totalPages || 0;
        state.totalCount = action.payload.info?.count || 0;
        state.error = null;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.status = "ERROR";
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setPageSize, setSearchTerm } =
  charactersSlice.actions;

export default charactersSlice.reducer;
