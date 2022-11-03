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
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true,
    hide: true
  },
  {
    field: 'ProjectName',
    headerName: 'Project Name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 160,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'Vendor',
    headerName: 'Vendor Name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 170,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'StartDate',
    headerName: 'Start Date',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 170,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    type: 'singleSelect',
    valueOptions: ['Site Engineer'],
    editable: true
  },
  {
    field: 'EndDate',
    headerName: 'Ending Date',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 155,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    type: 'singleSelect',
    valueOptions: ['Admin', 'Moderator', 'Editor'],
    editable: true
  },
  {
    field: 'Budget',
    headerName: 'Budget (USD M)',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 195,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'ProjectScope',
    headerName: 'Project Scope',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'HandoverScope',
    headerName: 'HO Scope',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'PATPass',
    headerName: 'PAT Scope',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'Completed',
    headerName: 'Completed Scope',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'HandoverScope - Completed',
    headerName: 'Remaining Scope',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  },
  {
    field: 'contactNumber',
    headerName: 'Progress',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'left',
    align: 'left',
    width: 140,
    cellClassName: (params) => clsx('super-app-theme--cell'),
    editable: true
  }
];
