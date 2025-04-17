import React from "react";

function Search({ searchQuery, setSearchQuery }) {
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;

