import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../dal/API";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await API.getUsers();
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: {},
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.items = action.payload;
    },
  },
});

export default usersSlice.reducer;
