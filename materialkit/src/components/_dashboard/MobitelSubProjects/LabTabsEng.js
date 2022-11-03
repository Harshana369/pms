import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Container, Card } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AppWebsiteVisits2 from './New folder/AppWebsiteVisits2';
import AppWebsiteVisits3 from './New folder/AppWebsiteVisits3';
import AppWebsiteVisits4 from './New folder/AppWebsiteVisits4';
import AppWebsiteVisits5 from './New folder/AppWebsiteVisits5';
import AppWebsiteVisits6 from './New folder/AppWebsiteVisits6';
import AppWebsiteVisits7 from './New folder/AppWebsiteVisits7';
import AppBugReports from './siteengineer/AppBugReports';
import AppItemOrders from './siteengineer/AppItemOrders';
import AppNewUsers from './siteengineer/AppNewUsers';
import AppWeeklySales from './siteengineer/AppWeeklySales';
import AppWebsiteVisitsEng1 from './siteengineer/AppWebsiteVisitsEng1';
import AppCurrentVisitsEng1 from './siteengineer/AppCurrentVisitsEng1';
import AppWebsiteVisits1DailyEng1 from './siteengineer/AppWebsiteVisits1DailyEng1';

export default function LabTabsEng() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <br />
      <br />
      <br />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Site Engineer" value="1" />
            <Tab label="Site Engineer" value="2" />
            <Tab label="Site Engineer" value="3" />
            <Tab label="Site Engineer" value="4" />
            <Tab label="Site Engineer" value="5" />
            <Tab label="Site Engineer" value="6" />
            <Tab label="Site Engineer" value="7" />
            <Tab label="Site Engineer" value="8" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <AppBugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppWeeklySales />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisitsEng1 />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisitsEng1 />
            </Grid>
          </Grid>
          <br />
          <AppWebsiteVisits1DailyEng1 />
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <AppBugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppWeeklySales />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisitsEng1 />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisitsEng1 />
            </Grid>
          </Grid>
          <br />
          <AppWebsiteVisits1DailyEng1 />
        </TabPanel>
        <TabPanel value="3">
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <AppBugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppWeeklySales />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisitsEng1 />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisitsEng1 />
            </Grid>
          </Grid>
          <br />
          <AppWebsiteVisits1DailyEng1 />
        </TabPanel>
        <TabPanel value="4">
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <AppBugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppNewUsers />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AppWeeklySales />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisitsEng1 />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisitsEng1 />
            </Grid>
          </Grid>
          <br />
          <AppWebsiteVisits1DailyEng1 />
        </TabPanel>
        <TabPanel value="5">
          <AppWebsiteVisits6 />
        </TabPanel>
        <TabPanel value="6">
          <AppWebsiteVisits7 />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
