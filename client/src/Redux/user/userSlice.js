import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  alertColor: null,
  showAlert: false,
  alertMsg: null,
  error: null, // Add an error field for failure cases
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true; // Set loading state when sign-in starts
      state.showAlert = false; // Clear alerts when starting
      state.alertMsg = null; // Reset alert message
      state.alertColor = null; // Reset alert color
      state.error = null; // Clear previous error
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.showAlert = true;
      state.alertMsg = "Sign In Successfully";
      state.alertColor = "primary";
      state.error = null; // Clear error in success
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.showAlert = true; // Show alert on failure
      state.alertMsg = "Wrong Credentials";
      state.alertColor = "warning";
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
