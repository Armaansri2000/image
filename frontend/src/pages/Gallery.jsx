import React, { useState, useCallback, useEffect } from 'react';
import Search from '../components/Search.jsx';
import Filter from '../components/Filter.jsx';
import Pagination from '../components/Pagination.jsx';
import ImageCard from '../components/ImageCard.jsx';
import { useImages } from '../hooks/useImages.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { useQueryParams } from '../hooks/useQueryParams.js';

function getInitialParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    page: parseInt(params.get('page')) || 1,
    search: params.get('search') || '',
    heading: params.get('heading') || ''
  };
}

export default function Gallery() {
  const { setParams } = useQueryParams();
  const initial = getInitialParams();

  const [page, setPage] = useState(initial.page);
  const [searchInput, setSearchInput] = useState(initial.search);
  const [heading, setHeading] = useState(initial.heading);

  const debouncedSearch = useDebounce(searchInput, 500);
  const { data, total, totalPages, loading, error } = useImages(page, debouncedSearch, heading);

  // Sync URL on state change
  useEffect(() => {
    setParams({ page, search: searchInput, heading });
  }, [page, searchInput, heading, setParams]);

  // Reset page on search/filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, heading]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = getInitialParams();
      setPage(params.page);
      setSearchInput(params.search);
      setHeading(params.heading);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchInput(value);
  }, []);

  const handleFilter = useCallback((value) => {
    setHeading(value);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Image Gallery Explorer</h1>
        <p className="app-subtitle">Discover 200,000+ curated images across 10 categories</p>
      </header>

      <div className="controls">
        <Search value={searchInput} onChange={handleSearch} />
        <Filter value={heading} onChange={handleFilter} />
      </div>

      {!loading && !error && total > 0 && (
        <p className="results-info">
          Showing {data.length} of {total.toLocaleString()} results
          {heading && <> in <strong>{heading}</strong></>}
          {debouncedSearch && <> matching "<strong>{debouncedSearch}</strong>"</>}
        </p>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      )}

      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && data.length === 0 && (
        <div className="empty">No images found</div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <div className="grid">
            {data.map((img) => (
              <ImageCard key={img._id} image={img} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
