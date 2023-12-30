import { IUser } from "./../../../../mockdata";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { user: IUser } = {
  user: {
    email: null,
    id: null,
    role: null,
    username: null,
    password: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {
        email: null,
        id: null,
        role: null,
        username: null,
        password: null,
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
