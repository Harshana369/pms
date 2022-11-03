import clsx from 'clsx';
/* eslint-disable camelcase */

export const Columns = [
  {
    field: '_id',
    headerName: 'ID',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 250,
    cellClassName: () => clsx('super-app-theme--cell'),
    editable: true,
    hide: true
  },
  {
    field: 'Site_Status',
    headerName: 'Site Status',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 430,
    cellClassName: () => clsx('super-app-theme--cell'),
    editable: true
  }
];
