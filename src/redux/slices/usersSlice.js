import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../dal/API";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await API.getUsers();
  return response.data;
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (obj, thunkAPI) => {
    console.log(obj);
    const { name, surname, desc, avatar } = obj;
    try {
      const response = await API.addUser(name, surname, desc, avatar);
      if (response.status === 200) {
        thunkAPI.dispatch(fetchUsers());
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

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
    [addUser.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [addUser.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
