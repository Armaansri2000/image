import React from 'react';

const Search = React.memo(({ value, onChange }) => {
  return (
    <div className="search-wrapper">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search images..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search images by name"
      />
    </div>
  );
});

Search.displayName = 'Search';

export default Search;
