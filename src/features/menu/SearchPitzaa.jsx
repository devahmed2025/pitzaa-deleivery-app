import { useState } from 'react';

function SearchPitzaa({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleOnSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <div className="flex items-center justify-center">
      <form onChange={handleOnSubmit} className="">
        <input
          className="w-28 rounded-xl border border-red-400 px-4 py-2 text-sm text-black transition-all duration-500 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-60 sm:focus:w-96 md:w-80"
          placeholder="search pizza name or ingredients"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchPitzaa;
