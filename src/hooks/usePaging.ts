import { useCallback, useState } from 'react';

export interface IPaging {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

interface State<T extends object = any> {
  paging: IPaging;
  filter: T;
}

const usePaging = <T extends object>(limit: number, initFilter: T) => {
  const [state, setState] = useState<State<T>>({
    paging: {
      limit,
      page: 1,
      total: 0,
      totalPages: 0
    },
    filter: initFilter,
  });

  const onTotalItemsChange = useCallback((totalItems: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        total: totalItems,
      },
    }));
  }, []);

  const onTotalPagesChange = useCallback((totalPages: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        totalPages,
      },
    }));
  }, []);

  const onPageChange = (currentPage: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        page: currentPage,
      },
    }));
  };

  const onPageSizeChange = (currentSize: number) => {
    setState((pre) => ({
      ...pre,
      paging: {
        ...pre.paging,
        limit: currentSize,
      },
    }));
  };

  const handleFilterChange = <TKey extends keyof T>(
    key: TKey,
    value: T[TKey]
  ) => {
    setState((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        [key]: value,
      },
    }));
  };

  return {
    paging: state.paging,
    filter: state.filter,
    onPageChange,
    onPageSizeChange,
    onTotalItemsChange,
    handleFilterChange,
    onTotalPagesChange
  };
};

export default usePaging;
