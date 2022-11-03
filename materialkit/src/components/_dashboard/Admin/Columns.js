import clsx from 'clsx';
/* eslint-disable camelcase */

export const Columns = [
  {
    field: '_id',
    headerName: 'User ID',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 250,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true,
    hide: true
  },
  {
    field: 'username',
    headerName: 'First Name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 160,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 170,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'designation',
    headerName: 'Designation',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 170,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    type: 'singleSelect',
    valueOptions: ['Engineer', 'Site Engineer', 'Vendor'],
    editable: true
  },
  {
    field: 'adminLevel',
    headerName: 'Privilage Level',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 155,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    type: 'singleSelect',
    valueOptions: ['Admin', 'Moderator', 'Editor', 'Vendor - Huawei', 'Vendor - ZTE'],
    editable: true
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 195,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  }
];
