import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
        state.user = action.payload
    },
    signOut: (state, action) => {
        state.user = null
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.user;

export default userSlice.reducer;
