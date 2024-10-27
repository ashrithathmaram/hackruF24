"use client";

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  mode: "light",
  user: {
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    contact: {},
  },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setContact: (state, action) => {
      state.contact = action.payload
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = {
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        contact: {},
      };
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
