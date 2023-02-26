import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RadioState {
  isRadioPlaying: boolean;
  lastChannelName: string | undefined;
}

const initialState: RadioState = {
  isRadioPlaying: false,
  lastChannelName: undefined,
};

export const radioSlice = createSlice({
  name: "radio",
  initialState,
  reducers: {
    setIsRadioPlaying: (state, action: PayloadAction<boolean>) => {
      state.isRadioPlaying = action.payload;
    },
    setLastChannelName: (state, action: PayloadAction<string | undefined>) => {
      state.lastChannelName = action.payload;
    },
  },
});

export const { setIsRadioPlaying, setLastChannelName } = radioSlice.actions;

export default radioSlice.reducer;
