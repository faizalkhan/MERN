import React from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input
      className="form-control"
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
