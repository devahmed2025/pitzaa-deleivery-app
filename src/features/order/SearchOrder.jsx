import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../darkMode/hook/useDarkMode'; // Import dark mode hook

// SearchOrder allows users to search for an order by order number
function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode(); // Get dark mode state

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleOnSubmit}>
        <input
          className={`w-28 rounded-xl border px-4 py-2 text-sm transition-all duration-500 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-opacity-50 sm:w-60 sm:focus:w-96 md:w-80 ${
            isDarkMode
              ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500'
              : 'border-neutral-800 bg-gray-100 text-black focus:ring-yellow-500'
          }`}
          placeholder="search order number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchOrder;