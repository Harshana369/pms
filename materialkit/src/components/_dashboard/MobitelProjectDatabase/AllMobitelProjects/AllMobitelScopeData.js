import React, { useState } from 'react';

import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import axios from 'axios';

const columns = [
  { field: 'ProjectName', headerName: 'ProjectName', width: 220, editable: true },
  { field: 'Vendor', headerName: 'Vendor', width: 100, editable: true },
  { field: 'StartDate', headerName: 'StartDate', width: 100, editable: true },
  { field: 'EndDate', headerName: 'EndDate', width: 100, editable: true },
  { field: 'ProjectScope', headerName: 'ProjectScope', width: 140, editable: true },
  { field: 'HandoverScope', headerName: 'HandoverScope', width: 140, editable: true }
];

export default function AllMobitelScopeData() {
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [dropdownValue, setDropdownValue] = useState('All Mobitel Projects');
  const [DetailsDataInScope, setDetailsDataInScope] = React.useState({});

  const handleChange = (event) => {
    //   console.log(event.target.name);
    //   console.log(event.target.checked);

    setColumnVisibilityModel({
      ...columnVisibilityModel,
      [event.target.name]: event.target.checked
    });
  };

  const CustomToolbar = () => {
    const [buttonPopup, setButtomPopup] = React.useState(false);
    return (
      <GridToolbarContainer>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
          </Stack>
        </Stack>
      </GridToolbarContainer>
    );
  };

  //   const getStudents = async () => {
  //     await axios.get('http://localhost:8060/column/').then((res) => {
  //       setColumnVisibilityModel(res.data);
  //     });
  //   };

  //   const updateColumn = async () => {
  //     await axios.put('http://localhost:8060/column/Edit', columnVisibilityModel).then((res) => {});
  //   };

  const fetchScopeData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable', {
        params: { ProjectName: dropdownValue }
      })
      .then((res) => {
        setDetailsDataInScope(res.data.scopeDetailsDataToTheFrontEnd);
      });
  };

  React.useEffect(() => {
    // getStudents();
    fetchScopeData();
  }, []);

  React.useEffect(() => {
    // updateColumn();
  }, [columnVisibilityModel]);

  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={DetailsDataInScope}
        getRowId={(DetailsDataInScope) => DetailsDataInScope._id}
        columns={columns}
        components={{
          Toolbar: CustomToolbar
          //   SwitchesGroup: CustomSwitchesGroup,
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      />
    </div>
  );
}
