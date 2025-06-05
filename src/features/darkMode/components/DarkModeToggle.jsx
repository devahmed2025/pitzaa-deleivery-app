import React from 'react';
import { useDarkMode } from '../hook/useDarkMode';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

/**
 * DarkModeToggle Component
 * 
 * A toggle button that switches between light and dark modes.
 * Uses Heroicons for moon/sun icons with proper accessibility.
 */
export const DarkModeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-10 ${
        isDarkMode
          ? 'text-yellow-300 hover:bg-yellow-300 focus:ring-yellow-300'
          : 'text-gray-700 hover:bg-gray-700 focus:ring-gray-500'
      } ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
};