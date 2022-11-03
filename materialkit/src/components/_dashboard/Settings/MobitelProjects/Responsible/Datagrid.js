import React, { useMemo, Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  GridToolbar,
  gridSortedRowIdsSelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
  GridColDef,
  GridOverlay,
  GridCellEditCommitParams,
  GridValueFormatterParams,
  useGridApiRef
} from '@mui/x-data-grid';
import { createSvgIcon } from '@mui/material/utils';
import { Box, Card, Container, Typography, Stack } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SaveIcon from '@mui/icons-material/Save';
import { Columns } from './Columns';
/* eslint-disable camelcase */

const getRowsFromCurrentPage = ({ apiRef }) => gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

const getFilteredRows = ({ apiRef }) => gridVisibleSortedRowIdsSelector(apiRef);

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt'
);

const useDummyMutation = () =>
  React.useCallback(
    (post) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve(post);
        }, 500)
      ),
    []
  );

export default function Datagrid() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const apiRef = useGridApiRef();

  const [pageSize, setPageSize] = React.useState(20);
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [snackbar, setSnackbar] = React.useState(null);
  const [state, setState] = React.useState([]);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/Responsible`);
    setState(res.data.existingPosts);
  };

  const getRowsFromCurrentPage = ({ apiRef }) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({ apiRef }) => gridVisibleSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt'
  );

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

    const buttonBaseProps = {
      color: 'primary',
      size: 'small',
      startIcon: <ExportIcon />
    };

    return (
      <GridToolbarContainer>
        <IconButton
          color="secondary"
          style={{ float: 'right' }}
          onClick={() => {
            const selectedIDs = selectionModel;
            const confirmBox = window.confirm('Do you want to delete this?');
            if (confirmBox === true) {
              deleteUser(selectedIDs);
              alert('Responsible Deleted successfully!');
              fetchData();
              // navigate('dashboard/settings/MobitelProjects/SiteEngineers', { replace: true });
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="secondary"
          style={{ float: 'right' }}
          onClick={() => {
            fetchData();
          }}
        >
          <RefreshIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

  const deleteUser = async (selectedIDs) => {
    await axiosInstance.delete(`/Responsible/delete/${selectedIDs}`).catch((err) => {
      console.log(err.message);
    });
  };

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);

      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const Responsible = editRowData.Responsible.value;

        const newPost = { Responsible };
        const confirmBox = window.confirm('Do you want to save this name ?');
        if (confirmBox === true) {
          axiosInstance.put(`/Responsible/Edit/${editRowData._id.value}`, newPost);
          setSnackbar({ children: 'Successfully saved', severity: 'success' });
        }
        fetchData();
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
    },
    [editRowData]
  );

  return (
    <Box
      sx={{
        height: 440,
        width: '100%',
        '& .super-app-theme--header': {
          backGridolor: 'rgba(0,0,0,0)',
          color: 'rgb(198,198,198)',
          fontWeight: '600'
        },
        '& .super-app-theme--cell': {
          backGridolor: 'rgba(0,0,0,0)',
          color: 'rgb(128,128,128)',
          fontWeight: '200'
        }
      }}
    >
      <DataGrid
        apiRef={apiRef}
        rows={state}
        columns={Columns}
        components={{ Toolbar: CustomToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        pagination
        density="compact"
        disableSelectionOnClick
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        checkboxSelection
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        sx={{
          boxShadow: 0,
          border: 0.1,
          borderColor: 'secondary.main',
          '& .MuidataGrid-cell:hover': {
            color: 'secondary.main'
          }
        }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={5000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
