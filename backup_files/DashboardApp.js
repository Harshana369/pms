import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
// components
import Page from '../components/Page';
import AppBugReports1 from '../components/_dashboard/app/AppBugReports1';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------
export default function DashboardApp() {
  const navigate = useNavigate();

  const [ScopeDataMobitel, setScopeDataMobitel] = useState([]); //
  const [HandoverDataMobitel, setHandoverDataMobitel] = useState([]); //
  const [PATPassDataMobitel, sePATPassDataMobitel] = useState(); //
  const [OnAirDataMobitel, setOnAirDataMobitel] = useState(); //
  const [HoldSitesDataMobitel, setHoldSitesDataMobitel] = useState(); //
  const [ChartDatForColumnGraphMobitel, setChartDatForColumnGraphMobitel] = useState([]); //
  const [XaxisDataMobitel, setXaxisDataMobitel] = useState([]); //
  const [ProjectCompletionMobitel, setProjectCompletionMobitel] = useState([]); //
  const [SitesOnAirMobitel, setSitesOnAirMobitel] = useState([]);
  const [PatCompletionDataMobitel, setPatCompletionDataMobitel] = useState([]);
  const [SARDataMobitel, setSARDataMobitel] = useState([]);
  const [CommissioningDataMobitel, setCommissioningDataMobitel] = useState([]);
  const [InstallationDataMobitel, setInstallationDataMobitel] = useState([]);
  const [MobilizationDataMobitel, setMobilizationDataMobitel] = useState([]);
  const [XAxisDaysLabelMobitel, setxAxisDaysLabelMobitel] = useState([]); //
  const [WeeklyProgressDataMobitel, setweeklyProgressDataMobitel] = useState([]); //
  const [CompletedSitesMobitel, setcompletedSitesMobitel] = useState([]); //
  const [dropdownValueMobitel, setDropdownValueMobitel] = useState();

  const [ScopeDataVendor, setScopeDataVendor] = useState([]);
  const [HandoverDataVendor, setHandoverDataVendor] = useState([]);
  const [PATPassDataVendor, sePATPassDataVendor] = useState();
  const [OnAirDataVendor, setOnAirDataVendor] = useState();
  const [HoldSitesDataVendor, setHoldSitesDataVendor] = useState();
  const [ChartDatForColumnGraphVendor, setChartDatForColumnGraphVendor] = useState([]);
  const [XaxisDataVendor, setXaxisDataVendor] = useState([]);
  const [ProjectCompletionVendor, setProjectCompletionVendor] = useState([]);
  const [SitesOnAirVendor, setSitesOnAirVendor] = useState([]);
  const [PatCompletionDataVendor, setPatCompletionDataVendor] = useState([]);
  const [SARDataVendor, setSARDataVendor] = useState([]);
  const [CommissioningDataVendor, setCommissioningDataVendor] = useState([]);
  const [InstallationDataVendor, setInstallationDataVendor] = useState([]);
  const [MobilizationDataVendor, setMobilizationDataVendor] = useState([]);
  const [XAxisDaysLabelVendor, setxAxisDaysLabelVendor] = useState([]);
  const [WeeklyProgressDataVendor, setweeklyProgressDataVendor] = useState([]);
  const [CompletedSitesVendor, setcompletedSitesVendor] = useState([]);
  const [dropdownValueVendor, setDropdownValueVendor] = useState();

  const fetchMobitelData = async () => {
    const req = await axios
      .get('http://localhost:8072/mobitelProjectsDatabases', {
        params: { Project: 'All Mobitel Projects' }
      })
      .then((res) => {
        setHandoverDataMobitel(res.data.HandOverDataToSquares);
        sePATPassDataMobitel(res.data.PatDataForFrontEnd);
        setHoldSitesDataMobitel(res.data.HoldSitesDataforSquares);
        setOnAirDataMobitel(res.data.OnAirDataForFrontEnd);
        setChartDatForColumnGraphMobitel(res.data.chartDataForFrontEnd);
        setXaxisDataMobitel(res.data.XaxisDataForTheGraphs);
        setProjectCompletionMobitel(res.data.ProjectCompletionForFrontEnd);
        setSitesOnAirMobitel(res.data.sitesOnAirDataForFrontEnd);
        setPatCompletionDataMobitel(res.data.patCompletionDataForFrontEnd);
        setSARDataMobitel(res.data.sarDataForFrontEnd);
        setCommissioningDataMobitel(res.data.commissioningDataForFrontEnd);
        setInstallationDataMobitel(res.data.installationDataForFrontEnd);
        setMobilizationDataMobitel(res.data.mobilizeDataforFrontEnd);
        setxAxisDaysLabelMobitel(res.data.SevenDaysOfWeek);
        setweeklyProgressDataMobitel(res.data.weeklyProgressDataForFrontEnd);
        setcompletedSitesMobitel(res.data.WeeklyProgressOnAirSitesData);
        // console.log(res.data.HoldSitesDataforSquares);
      });
  };

  const fetchMobitelScopeData = async () => {
    const req = await axios
      .get('http://localhost:8072/mobitelProjectsOverviewTable', {
        params: { ProjectName: 'All Mobitel Projects' }
      })
      .then((res) => {
        setScopeDataMobitel(res.data.scopeDataToTheFrontEnd);
      });
  };

  const fetchVendorData = async () => {
    const req = await axios
      .get('http://localhost:8072/vendorProjectsDatabases', {
        params: { Project: 'All Vendor Projects' }
      })
      .then((res) => {
        setHandoverDataVendor(res.data.HandOverDataToSquares);
        sePATPassDataVendor(res.data.PatDataForFrontEnd);
        setHoldSitesDataVendor(res.data.HoldSitesDataforSquares);
        setOnAirDataVendor(res.data.OnAirDataForFrontEnd);
        setChartDatForColumnGraphVendor(res.data.chartDataForFrontEnd);
        setXaxisDataVendor(res.data.XaxisDataForTheGraphs);
        setProjectCompletionVendor(res.data.ProjectCompletionForFrontEnd);
        setSitesOnAirVendor(res.data.sitesOnAirDataForFrontEnd);
        setPatCompletionDataVendor(res.data.patCompletionDataForFrontEnd);
        setSARDataVendor(res.data.sarDataForFrontEnd);
        setCommissioningDataVendor(res.data.commissioningDataForFrontEnd);
        setInstallationDataVendor(res.data.installationDataForFrontEnd);
        setMobilizationDataVendor(res.data.mobilizeDataforFrontEnd);
        setxAxisDaysLabelVendor(res.data.SevenDaysOfWeek);
        setweeklyProgressDataVendor(res.data.weeklyProgressDataForFrontEnd);
        setcompletedSitesVendor(res.data.WeeklyProgressOnAirSitesData);
        // console.log(res.data.HoldSitesDataforSquares);
      });
  };

  const fetchVendorScopeData = async () => {
    const req = await axios
      .get('http://localhost:8072/vendorProjectsOverviewTable', {
        params: { ProjectName: 'All Vendor Projects' }
      })
      .then((res) => {
        setScopeDataVendor(res.data.scopeDataToTheFrontEnd);
      });
  };

  useEffect(() => {
    fetchMobitelData();
    fetchVendorData();
    fetchMobitelScopeData();
    fetchVendorScopeData();
  }, []);

  return (
    <Page title="Projects Management System | Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            All Projects Overview
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} />
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports1 />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <br />
            <AppWebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <br />
            <AppCurrentVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits1 />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
