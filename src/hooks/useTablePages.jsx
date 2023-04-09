import { useCallback, useState } from 'react';

export const useTablePages = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = useCallback((e, newPage) => {
    setPage(newPage);
  });

  const handleChangeRowsPerPage = useCallback(e => {
    const updatedRowsPerPage = parseInt(e.target.value);
    setRowsPerPage(updatedRowsPerPage);
  });

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  };
};
