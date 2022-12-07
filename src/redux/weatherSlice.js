// Unused redux
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinnedCords: JSON.parse(localStorage.getItem("pinnedCords")) || [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setPinnedCords: (state, action) => {
      state.pinnedCords = [...state.pinnedCords, action.payload];
      localStorage.setItem("pinnedCords", JSON.stringify(state.pinnedCords))
    },
  },
});

export const { setPinnedCords } = weatherSlice.actions;

export default weatherSlice.reducer;
