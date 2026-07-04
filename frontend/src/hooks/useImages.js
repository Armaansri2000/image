import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchImages } from '../services/api';

export function useImages(page, search, heading, limit = 20) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const load = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    const params = { page, limit };
    if (search) params.search = search;
    if (heading) params.heading = heading;

    fetchImages(params, controller.signal)
      .then((res) => {
        setData(res.data.data);
        setTotal(res.data.total);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          setError(err.message || 'Failed to fetch images');
          setLoading(false);
        }
      });
  }, [page, search, heading, limit]);

  useEffect(() => {
    load();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [load]);

  return { data, total, totalPages, loading, error };
}
