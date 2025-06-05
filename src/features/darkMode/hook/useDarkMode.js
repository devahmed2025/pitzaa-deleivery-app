import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode, setDarkMode, toggleDarkMode as toggleDarkModeAction } from '../darkModeSlice';

export const useDarkMode = () => {
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  // Apply dark mode class to root element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        dispatch(setDarkMode(mediaQuery.matches));
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [dispatch]);

  // Rename the local function or use the action explicitly
  const toggle = () => {
    dispatch(toggleDarkModeAction());
  };

  return { isDarkMode, toggleDarkMode: toggle };
};