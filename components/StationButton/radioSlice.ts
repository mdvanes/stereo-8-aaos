import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RadioState {
  isRadioPlaying: boolean;
}

const initialState: RadioState = {
  isRadioPlaying: false,
};

export const radioSlice = createSlice({
  name: "radio",
  initialState,
  reducers: {
    setIsRadioPlaying: (state, action: PayloadAction<boolean>) => {
      state.isRadioPlaying = action.payload;
    },
  },
});

export const { setIsRadioPlaying } = radioSlice.actions;

export default radioSlice.reducer;
