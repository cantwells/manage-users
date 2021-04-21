import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../dal/API";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await API.getUsers();
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    currentPage: 1,
    pageLimit: 5,
    isLoaded: false,
  },
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload.page;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoaded = false;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoaded = true;
    },
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
