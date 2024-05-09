const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    return (
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="SearchBar"
      />
    );
  };
  
  export default SearchBar;
  