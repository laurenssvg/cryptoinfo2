const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <input
      className={`focus:border-light-blue-500 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500 focus:outline-none w-full text-md text-black dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-[#1a1a1a] dark:border-[#363636] border border-gray-200 rounded-lg pl-5 py-3
          `}
      type="text"
      aria-label="Filter projects"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
