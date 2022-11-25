import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myLocation: JSON.parse(localStorage.getItem("myLocation")) || null,
  pinnedCords: JSON.parse(localStorage.getItem("pinnedCords")) || [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.myLocation = action.payload;
      localStorage.setItem("myLocation", JSON.stringify(state.myLocation))
    },
    setPinnedCords: (state, action) => {
      state.pinnedCords = [...state.pinnedCords, action.payload];
      localStorage.setItem("pinnedCords", JSON.stringify(state.pinnedCords))
    },
  },
});

export const { setMyLocation, setPinnedCords } = weatherSlice.actions;

export default weatherSlice.reducer;
