import React from 'react';

const categories = [
  'Nature', 'Technology', 'Animals', 'Cars', 'Travel',
  'Food', 'Sports', 'Fashion', 'Architecture', 'Space'
];

const Filter = React.memo(({ value, onChange }) => {
  return (
    <select
      className="filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
});

Filter.displayName = 'Filter';

export default Filter;
