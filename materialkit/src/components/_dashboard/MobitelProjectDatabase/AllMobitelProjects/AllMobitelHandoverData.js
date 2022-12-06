/* eslint-disable */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Page from '../../../../components/Page';

import { Grid, Container, Stack, Typography, TextField, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

function AllMobitelHandoverData() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [projectNamesArray, setprojectNamesArray] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('All Mobitel Projects');

  const MobitelDeta = useSelector((state) => state.mobitelDatabse);
  const { loading, error, mobitelDatabaseData } = MobitelDeta;
  console.log(mobitelDatabaseData.OnAirDataForFrontEnd);

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };

  // ----------------------------------------------------------------------------------------------------------
  const projectNames = projectNamesArray;
  // ----------------------------------------------------------------------------------------------------------

  useState(() => {
    fetchProjectNames();
  }, [dropdownValue]);

  return (
    <Box height={10000000} width="100%" backgroundColor="#000f1f">
      <Stack alignItems="center" mb={2}>
        <Typography variant="h6" mt={4} gutterBottom>
          Mobitel Projects HandoverData
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="caption1">Select project</Typography>
        <TextField
          style={{ float: 'right' }}
          sx={{ width: 200 }}
          size="small"
          id="outlined-select-currency"
          select
          value={dropdownValue}
          onChange={handleChange}
        >
          {projectNames.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  );
}

export default AllMobitelHandoverData;
