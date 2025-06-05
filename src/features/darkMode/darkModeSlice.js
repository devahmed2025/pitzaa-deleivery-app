// features/darkMode/darkModeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for saved preference or use system preference
const getInitialMode = () => {
  if (typeof window !== 'undefined') {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const initialState = {
  isDarkMode: getInitialMode(),
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode));
      }
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(state.isDarkMode));
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state) => state.darkMode.isDarkMode;

export default darkModeSlice.reducer;
