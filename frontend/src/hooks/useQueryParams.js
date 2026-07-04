import { useCallback } from 'react';

export function useQueryParams() {
  const getParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      page: parseInt(params.get('page')) || 1,
      search: params.get('search') || '',
      heading: params.get('heading') || ''
    };
  }, []);

  const setParams = useCallback((newParams) => {
    const params = new URLSearchParams();
    if (newParams.page && newParams.page > 1) params.set('page', newParams.page);
    if (newParams.search) params.set('search', newParams.search);
    if (newParams.heading) params.set('heading', newParams.heading);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.pushState({}, '', newUrl);
  }, []);

  return { getParams, setParams };
}
