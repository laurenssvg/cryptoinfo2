const SearchBar = ({ searchQuery, setSearchQuery, filteredCoins }) => {
  return (
    <input
      className={`focus:border-light-blue-500 focus:ring-1 focus:ring-gray-300 focus:outline-none w-full text-md text-black placeholder-gray-500 border border-gray-200 rounded-lg pl-5 py-3
          `}
      type="text"
      aria-label="Filter projects"
      placeholder={`Search ${filteredCoins ? "my " : ""}coins..`}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
