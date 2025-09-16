import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { applyTheme } from "@/helpers";
import { type Theme } from "@/types";

const initializeTheme = (): Theme => {
  const theme = (localStorage.getItem("theme") as Theme) || "system";
  applyTheme(theme);
  return theme;
};

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: initializeTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      applyTheme(action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
