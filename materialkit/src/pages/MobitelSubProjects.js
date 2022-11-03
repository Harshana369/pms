import react, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// material
import { Grid, Button, Card, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import {
  LastUpdatesMobitel,
  LastUpdatesVendor,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1,
  AppNewUsers,
  AppBugReports,
  AppBugReports1,
  AppItemOrders,
  AppWeeklySales
} from '../components/_dashboard/MobitelSubProjects';

import AppCurrentVisits0 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits0';
import AppCurrentVisits1 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits1';
import AppCurrentVisits2 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits2';
import AppCurrentVisits3 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits3';
import AppCurrentVisits4 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits4';
import AppCurrentVisits5 from '../components/_dashboard/MobitelSubProjects/New folder/AppCurrentVisits5';
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-object-spread */
// -------------------------------------------------------------------------------------------------------

// Styles for Special_Tag input-----------------------
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(tag, SpecialTag, theme) {
  return {
    fontWeight:
      SpecialTag.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    fontColor: 'gray'
  };
}

const SpecialTags = ['GS Site', 'VIP', 'New Site'];

export default function MobitelSubProjects() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [specialTag, setSpecialTag] = useState([]);
  const [Special_Tag, setSpecial_Tag] = useState(['VIP Site']);
  // const [projectNamesArray, setMobitelProjectNamesArray] = useState([]);
  // const [projectNamesArray, setVendorProjectNamesArray] = useState([]);
  const [WidthdrawnDataforSquares, setWidthdrawnDataforSquares] = useState([]);

  const [ScopeDataMobitel, setScopeDataMobitel] = useState([]);
  const [HandoverDataMobitel, setHandoverDataMobitel] = useState([]);
  const [PATPassDataMobitel, setPATPassDataMobitel] = useState();
  const [OnAirDataMobitel, setOnAirDataMobitel] = useState();
  const [HoldSitesDataMobitel, setHoldSitesDataMobitel] = useState();
  const [ChartDataForColumnGraphMobitel, setChartDatForColumnGraphMobitel] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [XaxisData, setXaxisData] = useState([]);
  const [ProjectCompletionMobitel, setProjectCompletionMobitel] = useState([0, 0, 0]);
  const [SitesOnAirMobitel, setSitesOnAirMobitel] = useState([0, 0, 0]);
  const [PatCompletionDataMobitel, setPatCompletionDataMobitel] = useState([0, 0, 0, 0, 0]);
  const [SARDataMobitel, setSARDataMobitel] = useState([0, 0, 0, 0, 0]);
  const [CommissioningDataMobitel, setCommissioningDataMobitel] = useState([0, 0, 0]);
  const [InstallationDataMobitel, setInstallationDataMobitel] = useState([0, 0, 0, 0, 0, 0]);
  const [MobilizationDataMobitel, setMobilizationDataMobitel] = useState([0, 0, 0]);
  const [XAxisDaysLabel, setxAxisDaysLabel] = useState([]);
  const [WeeklyProgressDataMobitel, setweeklyProgressDataMobitel] = useState([
    { name: 'Completed', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] },
    { name: 'Targeted', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] }
  ]);
  const [CompletedSitesMobitel, setcompletedSitesMobitel] = useState([]);

  const [ScopeDataVendor, setScopeDataVendor] = useState([]);
  const [HandoverDataVendor, setHandoverDataVendor] = useState([]);
  const [PATPassDataVendor, setPATPassDataVendor] = useState();
  const [OnAirDataVendor, setOnAirDataVendor] = useState();
  const [HoldSitesDataVendor, setHoldSitesDataVendor] = useState();
  const [ChartDataForColumnGraphVendor, setChartDatForColumnGraphVendor] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [ProjectCompletionVendor, setProjectCompletionVendor] = useState([0, 0, 0]);
  const [SitesOnAirVendor, setSitesOnAirVendor] = useState([0, 0, 0]);
  const [PatCompletionDataVendor, setPatCompletionDataVendor] = useState([0, 0, 0, 0, 0]);
  const [SARDataVendor, setSARDataVendor] = useState([0, 0, 0, 0, 0]);
  const [CommissioningDataVendor, setCommissioningDataVendor] = useState([0, 0, 0]);
  const [InstallationDataVendor, setInstallationDataVendor] = useState([0, 0, 0, 0, 0, 0]);
  const [MobilizationDataVendor, setMobilizationDataVendor] = useState([0, 0, 0]);
  const [WeeklyProgressDataVendor, setweeklyProgressDataVendor] = useState([
    { name: 'Completed', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] },
    { name: 'Targeted', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] }
  ]);
  const [CompletedSitesVendor, setcompletedSitesVendor] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('All Sub Projects');
  const [projectNameDropdownValue, setProjectNameDropdownValue] = useState('All Projects');
  const [projectNamesDrowpDownValue, setProjectNamesDrowpDownValue] = useState('');
  const [MobitelLastUpdates, setMobitelLastUpdates] = useState([]);
  const [VendorLastUpdates, setVendorLastUpdates] = useState([]);
  const [VendorUpdatesIsShown, setVendorUpdatesIsShown] = useState(false);
  const [MobitelUpdatesIsShown, setMobitelUpdatesIsShown] = useState(true);

  const SpecialTagSelectDown = Special_Tag;
  // --------------------------------------------------------------------------------------
  const fetchSpecialTag = async () => {
    const req = await axiosInstance.get('/specialTag').then((res) => {
      setSpecialTag(res.data.specialTagArray);
    });
  };

  // const AllSubProjects = ['All Sub Projects'];
  // const specialTags = AllSubProjects.concat(specialTag);
  // -------------------------------------------------------------------------------
  // const fetchMobitelProjectNames = async () => {
  //   const req = await axiosInstance
  //     .get('/mobitelProjectsOverviewTable/ProjectsArray')
  //     .then((res) => {
  //       setMobitelProjectNamesArray(res.data.mobitelProjectsNamesArray);
  //     });
  // };
  // const projectNamesMobitel = projectNamesArray;
  // console.log(projectNames);

  // const fetchVendorProjectNames = async () => {
  //   const req = await axiosInstance.get('/vendorProjectsOverviewTableProjectsArray').then((res) => {
  //     setVendorProjectNamesArray(res.data.vendorProjectsNamesArrayForInsights);
  //   });
  // };
  // const projectNamesVendor = projectNamesArray;
  // -------------------------------------------------------------------------------

  const projects = [
    { value: 'All Projects', label: 'All Projects' },
    { value: 'Vendor Projects', label: 'Vendor Projects' },
    { value: 'Mobitel Projects', label: 'Mobitel Projects' }
  ];
  // -------------------------------------------------------------------------------
  const fetchMobitelData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsSubProjects', {
        params: { Special_Tag: SpecialTagSelectDown, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setChartDatForColumnGraphMobitel(res.data.chartDataForFrontEnd);
        setXaxisData(res.data.XaxisDataForTheGraphs);
        setWidthdrawnDataforSquares(res.data.WidthdrawnDataforSquares);
        setHandoverDataMobitel(res.data.HandOverDataToSquares);
        setPATPassDataMobitel(res.data.PatDataForFrontEnd);
        setHoldSitesDataMobitel(res.data.HoldSitesDataforSquares);
        setOnAirDataMobitel(res.data.OnAirDataForFrontEnd);
        setProjectCompletionMobitel(res.data.ProjectCompletionForFrontEnd);
        setSitesOnAirMobitel(res.data.sitesOnAirDataForFrontEnd);
        setPatCompletionDataMobitel(res.data.patCompletionDataForFrontEnd);
        setSARDataMobitel(res.data.sarDataForFrontEnd);
        setCommissioningDataMobitel(res.data.commissioningDataForFrontEnd);
        setInstallationDataMobitel(res.data.installationDataForFrontEnd);
        setMobilizationDataMobitel(res.data.mobilizeDataforFrontEnd);
        setxAxisDaysLabel(res.data.SevenDaysOfWeek);
        setweeklyProgressDataMobitel(res.data.weeklyProgressDataForFrontEnd);
        setcompletedSitesMobitel(res.data.WeeklyProgressOnAirSitesData);
      });
  };

  const fetchVendorData = async () => {
    const req = await axiosInstance
      .get('/vendorProjectsSubProjects', {
        params: { Special_Tag: SpecialTagSelectDown, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setChartDatForColumnGraphVendor(res.data.chartDataForFrontEnd);
        setWidthdrawnDataforSquares(res.data.WidthdrawnDataforSquares);
        setHandoverDataVendor(res.data.HandOverDataToSquares);
        setPATPassDataVendor(res.data.PatDataForFrontEnd);
        setHoldSitesDataVendor(res.data.HoldSitesDataforSquares);
        setOnAirDataVendor(res.data.OnAirDataForFrontEnd);
        setProjectCompletionVendor(res.data.ProjectCompletionForFrontEnd);
        setSitesOnAirVendor(res.data.sitesOnAirDataForFrontEnd);
        setPatCompletionDataVendor(res.data.patCompletionDataForFrontEnd);
        setSARDataVendor(res.data.sarDataForFrontEnd);
        setCommissioningDataVendor(res.data.commissioningDataForFrontEnd);
        setInstallationDataVendor(res.data.installationDataForFrontEnd);
        setMobilizationDataVendor(res.data.mobilizeDataforFrontEnd);
        setxAxisDaysLabel(res.data.SevenDaysOfWeek);
        setweeklyProgressDataVendor(res.data.weeklyProgressDataForFrontEnd);
        setcompletedSitesVendor(res.data.WeeklyProgressOnAirSitesData);
      });
  };

  const fetchScopeData = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsScopeData', {
        params: { Special_Tag: dropdownValue, ProjectName: projectNameDropdownValue }
      })
      .then((res) => {
        setScopeDataMobitel(res.data.scopeDataToTheFrontEnd);
      });
  };

  useEffect(() => {
    fetchMobitelData();
    fetchVendorData();
    fetchScopeData();
    fetchSpecialTag();
    // fetchMobitelProjectNames();
  }, []);

  useEffect(() => {
    fetchMobitelData();
    fetchVendorData();
    fetchScopeData();
    fetchSpecialTag();
    // fetchMobitelProjectNames();
  }, [projectNameDropdownValue]);

  // ----------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------
  // const handleChangeSpecialTag = (event) => {
  //   setDropdownValue(event.target.value);
  // };

  const handleChangeProject = (event) => {
    setProjectNameDropdownValue(event.target.value);
  };

  const handleChangeProjectName = (event) => {
    setProjectNamesDrowpDownValue(event.target.value);
  };

  const handleChangeSpecialTag = (event) => {
    const {
      target: { value }
    } = event;
    setSpecial_Tag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  // --------------------------------------------------------------------------------------

  const HoldSitesData = HoldSitesDataMobitel + HoldSitesDataVendor;
  const ScopeData =
    parseInt(HandoverDataMobitel, 10) + parseInt(HandoverDataVendor, 10) + HoldSitesData;
  const HandoverData = parseInt(HandoverDataMobitel, 10) + parseInt(HandoverDataVendor, 10);
  const PATPassData = parseInt(PATPassDataMobitel, 10) + parseInt(PATPassDataVendor, 10);
  const OnAirData = OnAirDataMobitel + OnAirDataVendor;

  // --------- ChartDataForColumnGraph -------------
  const onAir1 = ChartDataForColumnGraphMobitel[0];
  const onAir2 = ChartDataForColumnGraphVendor[0];
  const onAir = onAir1.map((a, i) => a + onAir2[i]);
  // ----------------------------------------------
  const PAT1 = ChartDataForColumnGraphMobitel[1];
  const PAT2 = ChartDataForColumnGraphVendor[1];
  const PAT = PAT1.map((a, i) => a + PAT2[i]);
  // --------------------------------------------
  const SAR1 = ChartDataForColumnGraphMobitel[2];
  const SAR2 = ChartDataForColumnGraphVendor[2];
  const SAR = SAR1.map((a, i) => a + SAR2[i]);
  // --------------------------------------------
  const Com1 = ChartDataForColumnGraphMobitel[3];
  const Com2 = ChartDataForColumnGraphVendor[3];
  const Com = Com1.map((a, i) => a + Com2[i]);
  // --------------------------------------------
  const Ins1 = ChartDataForColumnGraphMobitel[4];
  const Ins2 = ChartDataForColumnGraphVendor[4];
  const Ins = Ins1.map((a, i) => a + Ins2[i]);
  // --------------------------------------------
  const Mob1 = ChartDataForColumnGraphMobitel[5];
  const Mob2 = ChartDataForColumnGraphVendor[5];
  const Mob = Mob1.map((a, i) => a + Mob2[i]);
  // ----------------------------------------------

  const ChartDatForColumnGraph = [];
  ChartDatForColumnGraph.push(
    { name: 'On Air', type: 'column', data: onAir },
    { name: 'PAT', type: 'column', data: PAT },
    { name: 'SAR', type: 'column', data: SAR },
    { name: 'Commisioned', type: 'column', data: Com },
    { name: 'Installed', type: 'column', data: Ins },
    { name: 'Mobilized', type: 'column', data: Mob }
  );

  const ProjCom1 = ProjectCompletionMobitel;
  const ProjCom2 = ProjectCompletionVendor;
  const ProjCompletion = ProjCom1.map((a, i) => a + ProjCom2[i]);
  const ProjectCompletion = ProjCompletion;

  const SitesOnAir1 = ProjectCompletionMobitel;
  const SitesOnAir2 = ProjectCompletionVendor;
  const SitesOnAir = SitesOnAir1.map((a, i) => a + SitesOnAir2[i]);

  const PATCompltetion1 = PatCompletionDataMobitel;
  const PATCompltetion2 = PatCompletionDataVendor;
  const PatCompletionData = PATCompltetion1.map((a, i) => a + PATCompltetion2[i]);

  const SARData1 = SARDataMobitel;
  const SARData2 = SARDataVendor;
  const SARData = SARData1.map((a, i) => a + SARData2[i]);

  const CommissioningData1 = CommissioningDataMobitel;
  const CommissioningData2 = CommissioningDataVendor;
  const CommissioningData = CommissioningData1.map((a, i) => a + CommissioningData2[i]);

  const InstallationData1 = InstallationDataMobitel;
  const InstallationData2 = InstallationDataVendor;
  const InstallationData = InstallationData1.map((a, i) => a + InstallationData2[i]);

  const MobilizationData1 = MobilizationDataMobitel;
  const MobilizationData2 = MobilizationDataVendor;
  const MobilizationData = MobilizationData1.map((a, i) => a + MobilizationData2[i]);

  const weeklyProgress1 = WeeklyProgressDataMobitel[0].data;
  const weeklyProgress2 = WeeklyProgressDataVendor[0].data;
  const weeklyProgress = weeklyProgress1.map((a, i) => a + weeklyProgress2[i]);

  const weeklyTarget1 = WeeklyProgressDataMobitel[1].data;
  const weeklyTarget2 = WeeklyProgressDataVendor[1].data;
  const weeklyTarget = weeklyTarget1.map((a, i) => a + weeklyTarget2[i]);

  const WeeklyProgressData = [];
  WeeklyProgressData.push(
    { name: 'Completed', type: 'column', data: weeklyProgress },
    { name: 'Targeted', type: 'column', data: weeklyTarget }
  );

  // const CompletedSites = CompletedSitesMobitel.map((item, i) =>
  //   Object.assign(item, CompletedSitesVendor[i])
  // );
  const CompletedSites = CompletedSitesMobitel.map((a, i) => a.concat(CompletedSitesVendor[i]));

  const showDataHandler = async () => {
    if (Special_Tag.length === 0) {
      alert('Please select any keyword !');
    } else {
      fetchMobitelData();
      fetchVendorData();
      fetchScopeData();
      fetchSpecialTag();
      fetchMobitelProjectsLastUpdates();
      fetchVendorProjectsLastUpdates();
    }
  };

  const fetchMobitelProjectsLastUpdates = () => {
    axiosInstance
      .get('/mobitelProjectsLastUpdates/SubProjects', {
        params: { Special_Tag: SpecialTagSelectDown, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setMobitelLastUpdates(res.data.existingPosts);
      });
  };

  const fetchVendorProjectsLastUpdates = () => {
    axiosInstance
      .get('/vendorProjectsLastUpdates/SubProjects', {
        params: { Special_Tag: SpecialTagSelectDown, Project: projectNameDropdownValue }
      })
      .then((res) => {
        setVendorLastUpdates(res.data.existingPosts);
      });
  };

  const showVendorProjectsUpdates = () => {
    setVendorUpdatesIsShown(true);
    setMobitelUpdatesIsShown(false);
  };

  const showMobitelProjectsUpdates = () => {
    setVendorUpdatesIsShown(false);
    setMobitelUpdatesIsShown(true);
  };

  return (
    <Page title="Mobitel Sub Projects | Mobitel Projects Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Mobitel Sub Projects
          </Typography>
          <Typography variant="h9" gutterBottom />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="caption1">Select Keyword</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
            <FormControl sx={{ width: 200 }}>
              <Select // ------------------------------------------------------------------- Special_Tag-------------------
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                size="small"
                value={Special_Tag}
                onChange={handleChangeSpecialTag}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {specialTag.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={Special_Tag.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={projectNameDropdownValue}
              onChange={handleChangeProject}
            >
              {projects.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button size="small" variant="contained" component="span" onClick={showDataHandler}>
              Show Data
            </Button>
            {/* <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={projectNamesDrowpDownValue}
              onChange={handleChangeProjectName}
            >
              {projectNames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="top" mb={0}>
          <Typography variant="h6" gutterBottom />
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWeeklySales scopeData={ScopeData} />
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
            <AppWebsiteVisits chartData={ChartDatForColumnGraph} xaxisData={XaxisData} />
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
          <Grid item xs={12} md={6} lg={12} mb={0}>
            <Card style={{ height: '520px' }}>
              <Stack sx={{ p: 2 }} direction="row">
                <Button
                  color="secondary"
                  onClick={() => {
                    showMobitelProjectsUpdates();
                    fetchMobitelProjectsLastUpdates();
                    fetchVendorProjectsLastUpdates();
                    showDataHandler();
                  }}
                >
                  Mobitel projects
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    showVendorProjectsUpdates();
                    fetchMobitelProjectsLastUpdates();
                    fetchVendorProjectsLastUpdates();
                    showDataHandler();
                  }}
                >
                  Vendor projects
                </Button>
              </Stack>
              {MobitelUpdatesIsShown && (
                <LastUpdatesMobitel mobitelLastUpdates={MobitelLastUpdates} />
              )}
              {VendorUpdatesIsShown && <LastUpdatesVendor vendorLastUpdates={VendorLastUpdates} />}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
