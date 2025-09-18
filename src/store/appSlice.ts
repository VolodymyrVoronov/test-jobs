import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  tags: string[];
}

const initialState: AppState = {
  tags: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string>) => {
      const tag = action.payload;

      if (state.tags.includes(tag)) {
        state.tags = state.tags.filter((t) => t !== tag);
      } else {
        state.tags = [...state.tags, tag];
      }
    },
    resetTags: (state) => {
      state.tags = [];
    },
  },
});

export const { setTags, resetTags } = appSlice.actions;
export default appSlice.reducer;
