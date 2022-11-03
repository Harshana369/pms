import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Typography, Stack, Link } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// components
import Page from '../../../Page';
import Datagrid from './Datagrid';

// ----------------------------------------------------------------------
// ---------------------------------------------------------------------
export default function AllVendorsDatabases() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('All Site Engineers');
  const [projectNameDropdownValue, setProjectNameDropdownValue] = useState('All Vendor Projects');

  useEffect(() => {
    fetchProjectNames();
    fetchSiteEngineerNames();
  }, []);

  const handleChangeSiteEngineers = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleChangeProjectName = (event) => {
    setProjectNameDropdownValue(event.target.value);
  };

  const fetchProjectNames = async () => {
    const req = await axiosInstance.get('/vendorProjectsOverviewTableProjectsArray').then((res) => {
      setprojectNamesArray(res.data.vendorProjectsNamesArrayForInsights);
    });
  };
  const projectNames = projectNamesArray;

  const fetchSiteEngineerNames = async () => {
    const req = await axiosInstance.get('/siteEngineersNamesList').then((res) => {
      setSiteEngineerNamesList(res.data.siteEngineersNamesArray);
    });
  };

  const siteEngineerNamesObjectsArray = [];
  const AllSiteEngineerNamesArray = [
    {
      value: 'All Site Engineers',
      label: 'All Site Engineers'
    }
  ];

  for (let i = 0; i < siteEngineerNamesList.length; i += 1) {
    siteEngineerNamesObjectsArray[i] = {
      value: siteEngineerNamesList[i],
      label: siteEngineerNamesList[i]
    };
  }
  const siteEngineerNamesObject = AllSiteEngineerNamesArray.concat(siteEngineerNamesObjectsArray);

  return (
    <Page title="Vendor Projects Databases | Project Management Database">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" gutterBottom>
          Vendor Projects Database
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={0}
        >
          <TextField
            style={{ float: 'right' }}
            sx={{ width: 200 }}
            size="small"
            id="outlined-select-currency"
            select
            value={projectNameDropdownValue}
            onChange={handleChangeProjectName}
          >
            {projectNames.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Datagrid
          DropDownValue={dropdownValue}
          ProjectNameDropdownValue={projectNameDropdownValue}
        />
      </Stack>
    </Page>
  );
}
