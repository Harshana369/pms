import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useResizeColumns
} from 'react-table';
import Scrollbar from '../../Scrollbar';
import { COLUMNS } from './columns';
import './table.css';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';
/* eslint no-nested-ternary: "off" */

export default function BasicTable() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [posts, setPosts] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
      minWidth: 150,
      width: 250,
      maxWidth: 400
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 2 }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useResizeColumns
  );

  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/mobitelProjectsDatabasesSiteData`);
      setPosts(res.data.posts);
    };
    fetchData();
  }, []);

  console.log(data);

  const handleOnBlur = () => {
    if (0 === 1) {
      console.log('ok');
    } else {
      console.log('ok');
    }
  };

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Scrollbar>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      // { style: { minWidth: column.minWidth, width: column.width } },
                      column.getSortByToggleProps()
                    )}
                  >
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽 ' : ' 🔼 ') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          {/* <tfoot>Buttons</tfoot> */}
        </table>
      </Scrollbar>
      <div style={{ float: 'right' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onBlur={handleOnBlur}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
