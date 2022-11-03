import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import {
  LastUpdatesMobitel,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1,
  AppNewUsers,
  AppBugReports,
  AppBugReports1,
  AppItemOrders,
  AppWeeklySales
} from '../components/_dashboard/MobitelProjectsSiteEngineers';

import AppCurrentVisits0 from '../components/_dashboard/MobitelProjectsSiteEngineers/New folder/AppCurrentVisits0';
import AppCurrentVisits1 from '../components/_dashboard/MobitelProjectsSiteEngineers/New folder/AppCurrentVisits1';
import AppCurrentVisits2 from '../components/_dashboard/MobitelProjectsSiteEngineers/New folder/AppCurrentVisits2';
import AppCurrentVisits3 from '../components/_dashboard/MobitelProjectsSiteEngineers/New folder/AppCurrentVisits3';
import AppCurrentVisits4 from '../components/_dashboard/MobitelProjectsSiteEngineers/New folder/AppCurrentVisits4';
import AppCurrentVisits5 from '../components/_dashboard/MobitelProjectsSiteEngineers/New folder/AppCurrentVisits5';
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

export default function MobitelProjectsSiteEngineers() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);
  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [WidthdrawnDataforSquares, setWidthdrawnDataforSquares] = useState([]);

  const [ScopeData, setScopeData] = useState([]);
  const [HandoverData, setHandoverData] = useState([]);
  const [PATPassData, sePATPassData] = useState();
  const [OnAirData, setOnAirData] = useState();
  const [HoldSitesData, setHoldSitesData] = useState();
  const [ChartDatForColumnGraph, setChartDatForColumnGraph] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [ChartDatForColumnGraphMonthlyWise, setChartDatForColumnGraphMonthlyWise] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [XaxisData, setXaxisData] = useState([]);
  const [ProjectCompletion, setProjectCompletion] = useState([0, 0, 0]);
  const [SitesOnAir, setSitesOnAir] = useState([0, 0, 0]);
  const [PatCompletionData, setPatCompletionData] = useState([0, 0, 0, 0, 0]);
  const [SARData, setSARData] = useState([0, 0, 0, 0, 0]);
  const [CommissioningData, setCommissioningData] = useState([0, 0, 0]);
  const [InstallationData, setInstallationData] = useState([0, 0, 0, 0, 0, 0]);
  const [MobilizationData, setMobilizationData] = useState([0, 0, 0]);
  const [XAxisDaysLabel, setxAxisDaysLabel] = useState([]);
  const [WeeklyProgressData, setweeklyProgressData] = useState([]);
  const [CompletedSites, setcompletedSites] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('Suranga Gunawardhana');
  const [projectNameDropdownValue, setProjectNameDropdownValue] = useState('All Mobitel Projects');
  const [MobitelLastUpdates, setMobitelLastUpdates] = useState([]);

  useEffect(() => {
    fetchSiteEngineerNames();
    fetchData();
    fetchProjectNames();
    fetchMobitelProjectsLastUpdates();
  }, [dropdownValue]);

  useEffect(() => {
    fetchSiteEngineerNames();
    fetchData();
    fetchProjectNames();
    fetchMobitelProjectsLastUpdates();
  }, [projectNameDropdownValue]);

  const fetchSiteEngineerNames = async () => {
    const req = await axiosInstance.get('/siteEngineersNamesList').then((res) => {
      setSiteEngineerNamesList(res.data.siteEngineersNamesArray);
    });
  };

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };

  const fetchData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsDatabasesSiteEngineersAnalysis', {
        params: { Site_Engineer: dropdownValue, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setChartDatForColumnGraph(res.data.chartDataForFrontEnd);
        setChartDatForColumnGraphMonthlyWise(res.data.chartDataForTheFrontEndMonthlyWise);
        setXaxisData(res.data.XaxisDataForTheGraphs);
        setWidthdrawnDataforSquares(res.data.WidthdrawnDataforSquares);
        setHandoverData(res.data.HandOverDataToSquares);
        sePATPassData(res.data.PatDataForFrontEnd);
        setHoldSitesData(res.data.HoldSitesDataforSquares);
        setOnAirData(res.data.OnAirDataForFrontEnd);
        setProjectCompletion(res.data.ProjectCompletionForFrontEnd);
        setSitesOnAir(res.data.sitesOnAirDataForFrontEnd);
        setPatCompletionData(res.data.patCompletionDataForFrontEnd);
        setSARData(res.data.sarDataForFrontEnd);
        setCommissioningData(res.data.commissioningDataForFrontEnd);
        setInstallationData(res.data.installationDataForFrontEnd);
        setMobilizationData(res.data.mobilizeDataforFrontEnd);
        setxAxisDaysLabel(res.data.SevenDaysOfWeek);
        setweeklyProgressData(res.data.weeklyProgressDataForFrontEnd);
        setcompletedSites(res.data.WeeklyProgressOnAirSitesData);
      });
  };

  // ----------------------------------------------------------------------------------------------------------
  const projectNames = projectNamesArray;
  // ----------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------

  const siteEngineerNamesArray = [];

  for (let i = 0; i < siteEngineerNamesList.length; i += 1) {
    siteEngineerNamesArray[i] = {
      value: siteEngineerNamesList[i],
      label: siteEngineerNamesList[i]
    };
  }
  const siteEngineerNames = siteEngineerNamesArray;

  const siteEgineersScopeData = WidthdrawnDataforSquares[0] + HandoverData[0];
  // -------------------------------------------------------------------------

  const handleChangeSiteEngineers = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleChangeProjectName = (event) => {
    setProjectNameDropdownValue(event.target.value);
  };

  const fetchMobitelProjectsLastUpdates = () => {
    axiosInstance
      .get('/mobitelProjectsLastUpdates/siteEngineers', {
        params: { Site_Engineer: dropdownValue, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setMobitelLastUpdates(res.data.existingPosts);
      });
  };

  //  ---------------------------------------------------------------------------------------------------------------------------
  //  ---------------------------------------------------------------------------------------------------------------------------

  return (
    <Page title="Mobitel Projects Site Engineers | Projects Management Database System">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Mobitel Projects Site Engineers Analytics
          </Typography>
          <Typography variant="h9" gutterBottom />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="caption1">Select Options</Typography>
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
              value={dropdownValue}
              onChange={handleChangeSiteEngineers}
            >
              {siteEngineerNames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
        <Stack direction="row" alignItems="center" justifyContent="top" mb={0}>
          <Typography variant="h6" gutterBottom />
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWeeklySales scopeData={siteEgineersScopeData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports1 handoverData={HandoverData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppItemOrders patData={PATPassData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppNewUsers onAirData={OnAirData} />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports holdData={HoldSitesData} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              chartData={ChartDatForColumnGraph}
              chartDataMonthly={ChartDatForColumnGraphMonthlyWise}
              xaxisData={XaxisData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits projectCompletion={ProjectCompletion} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits0 sitesOnAir={SitesOnAir} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits1 patCompletionData={PatCompletionData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits2 sarData={SARData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits3 commissioningData={CommissioningData} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppCurrentVisits4 installationData={InstallationData} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits5 mobilizationData={MobilizationData} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits1
              xAxisDaysLabel={XAxisDaysLabel}
              weeklyProgressData={WeeklyProgressData}
              completedSites={CompletedSites}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <LastUpdatesMobitel mobitelLastUpdates={MobitelLastUpdates} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
