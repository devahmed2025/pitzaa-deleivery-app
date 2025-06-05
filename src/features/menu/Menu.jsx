import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import SearchPitzaa from './SearchPitzaa';
import { useEffect, useState } from 'react';
import { useDarkMode } from '../darkMode/hook/useDarkMode';
import { DarkModeToggle } from '../darkMode/components/DarkModeToggle';

// Menu component displays the pizza menu with search functionality
function Menu() {
  const menu = useLoaderData(); // Fetch menu data using react-router-dom loader
  const [filteredMenu, setFilteredMenu] = useState(menu); // State for filtered menu based on search
  const [isSearching, setIsSearching] = useState(false); // Track if a search is active
  const { isDarkMode } = useDarkMode(); // Get dark mode state from useDarkMode hook

  // Reset filtered menu when the original menu changes
  useEffect(() => {
    setFilteredMenu(menu);
  }, [menu]);

  // Handle search input to filter pizzas by name or ingredients
  function handleSearch(query) {
    setIsSearching(Boolean(query));
    if (!query) {
      setFilteredMenu(menu);
    } else {
      const filtered = menu.filter((pizza) =>
        `${pizza.name} ${pizza.ingredients.join(' ')}`.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredMenu(filtered);
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50'
      }`}
    >
      {/* Dark Mode Toggle
      <div className="fixed right-4 top-4 z-50">
        <DarkModeToggle />
      </div> */}

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div
            className={`relative overflow-hidden rounded-3xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
                : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500'
            } p-12 shadow-2xl`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10">
              <h1
                className={`mb-4 text-5xl font-bold ${
                  isDarkMode ? 'text-gray-100' : 'text-white'
                } drop-shadow-lg md:text-6xl`}
              >
                🍕 Our Menu
              </h1>
              <p className={`text-xl ${isDarkMode ? 'text-gray-200' : 'text-white'} opacity-90`}>
                Discover our delicious selection of handcrafted pizzas
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <SearchPitzaa onSearch={handleSearch} />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isSearching
              ? `Found ${filteredMenu.length} pizza${filteredMenu.length !== 1 ? 's' : ''}`
              : `${menu.length} delicious pizzas available`}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredMenu.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredMenu.map((pizza) => (
              <MenuItem pizza={pizza} key={pizza.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className={`mb-2 text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              No pizzas found
            </h3>
            <p className={`max-w-md text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              We couldn’t find any pizzas matching your search. Try different keywords or browse our full menu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Loader function to fetch menu data
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
