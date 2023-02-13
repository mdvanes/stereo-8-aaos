import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  metaUpdateInterval: ReturnType<typeof setInterval> | undefined;
}

const initialState: CounterState = {
  metaUpdateInterval: undefined,
};

export const radioSlice = createSlice({
  name: "radio",
  initialState,
  reducers: {
    // setMetaUpdateInterval: (
    //   state,
    //   action: PayloadAction<ReturnType<typeof setInterval>>
    // ) => {
    //   state.metaUpdateInterval = action.payload;
    // },
    // clearMetaUpdateInterval: (
    //   state,
     
    // ) => {
    //   if (state.metaUpdateInterval) {
    //     clearInterval(state.metaUpdateInterval);
    //   }
    // },
  },
});

export const { 
  // setMetaUpdateInterval, clearMetaUpdateInterval 
} =
  radioSlice.actions;

export default radioSlice.reducer;
