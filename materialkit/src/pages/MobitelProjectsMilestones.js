import { useState, useEffect } from 'react';
import axios from 'axios';
// material

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import AppWebsiteVisits2 from '../components/_dashboard/MobitelProjectsMilestones/AppWebsiteVisits2';
import LabTabs from '../components/_dashboard/MobitelProjectsMilestones/LabTabs';
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

export default function MobitelProjectsMilestones() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [projectNamesArray, setprojectNamesArray] = useState([]);

  const [AllmilestoneData, setAllmilsetonesData] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('All Mobitel Projects');
  const [TSSRmilsetonesData, setTSSRmilsetonesData] = useState([]);
  const [POmilsetonesData, setPOmilsetonesData] = useState([]);
  const [LogisticsmilsetonesData, setLogisticsmilsetonesData] = useState([]);
  const [DependancymilsetonesData, setDependancymilsetonesData] = useState([]);
  const [ImplemenationmilsetonesData, setImplemenationmilsetonesData] = useState([]);
  const [CapitalizationmilsetonesData, setCapitalizationmilsetonesData] = useState([]);

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };

  const projectNames = projectNamesArray;
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------

  const fetchData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsDatabases', {
        params: { Project: dropdownValue }
      })
      .then((res) => {
        setAllmilsetonesData(res.data.mobitelProjectsAllMilestoneData);
        setTSSRmilsetonesData(res.data.mobitelProjectsTSSRMilestoneData);
        setPOmilsetonesData(res.data.mobitelProjectsPOMilestoneData);
        setLogisticsmilsetonesData(res.data.mobitelProjectsLogisticsMilestoneData);
        setDependancymilsetonesData(res.data.mobitelProjectsDependancyMilestoneData);
        setImplemenationmilsetonesData(res.data.mobitelProjectsImplemenationMilestoneData);
        setCapitalizationmilsetonesData(res.data.mobitelProjectsCapitalizationMilestoneData);
      });
  };

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
  };

  useEffect(() => {
    fetchProjectNames();
    fetchData();
  }, [dropdownValue]);

  return (
    <Page title="Mobitel Projects Milestones | Projects Management System">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Mobitel Projects Milestones Completion
          </Typography>
          <Typography variant="h9" gutterBottom />
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
        <Stack direction="row" alignItems="center" justifyContent="top" mb={0}>
          <Typography variant="h6" gutterBottom />
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={13}>
            <LabTabs
              TSSRmilestonesData={TSSRmilsetonesData}
              POmilsetonesData={POmilsetonesData}
              LogisticsmilsetonesData={LogisticsmilsetonesData}
              DependancymilsetonesData={DependancymilsetonesData}
              ImplemenationmilsetonesData={ImplemenationmilsetonesData}
              CapitalizationmilsetonesData={CapitalizationmilsetonesData}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits2 AllmilestoneData={AllmilestoneData} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
