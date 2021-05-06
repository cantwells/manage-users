import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import {
  API
} from "../dal/API";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await API.getUsers();
  return response.data;
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (obj, thunkAPI) => {
    const {
      name,
      surname,
      desc,
      avatar
    } = obj;
    try {
      const response = await API.addUser(name, surname, desc, avatar);
      if (response.status === 200) {
        thunkAPI.dispatch(fetchUsers());
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await API.deleteUser(id);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const editUser = createAsyncThunk("users/editUser", async (obj) => {
  const {
    id,
    name,
    surname,
    desc,
    avatar
  } = obj;
  try {
    const response = await API.editUser(id, name, surname, desc, avatar);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    currentPage: 1,
    pageLimit: 5,
    isLoaded: false,
    error: ''
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
    [fetchUsers.rejected]: (state, action) => {
      state.error = action.error.message
    },

    [addUser.fulfilled]: (state, action) => {},
    [addUser.rejected]: (state, action) => {
      console.log(action.payload);
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.items = action.payload;
      if (state.items.length % 5 === 0) {
        state.currentPage--;
      }
    },
    [editUser.fulfilled]: (state, action) => {
      state.items = state.items.map((el) => {
        if (el.id === action.payload.id) {
          return action.payload;
        }
        return el;
      });
    },
    [editUser.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const {
  setPage
} = usersSlice.actions;
export default usersSlice.reducer;