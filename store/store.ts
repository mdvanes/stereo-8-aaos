import { configureStore } from "@reduxjs/toolkit";
import { radioSlice } from "../components/StationButton/radioSlice";

export const store = configureStore({
  reducer: {
    radio: radioSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
