import React from "react";

const Search = ({ handleSearch, handleSearchChange, searchQuery }) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        id="search"
        name="search"
        onChange={handleSearchChange}
        value={searchQuery}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
