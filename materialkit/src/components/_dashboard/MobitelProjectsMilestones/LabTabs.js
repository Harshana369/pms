import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function LabTabs({
  TSSRmilestonesData,
  POmilsetonesData,
  LogisticsmilsetonesData,
  DependancymilsetonesData,
  ImplemenationmilsetonesData,
  CapitalizationmilsetonesData
}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="TSSR" value="1" />
            <Tab label="PO" value="2" />
            <Tab label="Logistics" value="3" />
            <Tab label="Dependancy" value="4" />
            <Tab label="Implementation" value="5" />
            <Tab label="Capitalization" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AppWebsiteVisits2 TSSRmilestonesData={TSSRmilestonesData} />
        </TabPanel>
        <TabPanel value="2">
          <AppWebsiteVisits3 POmilsetonesData={POmilsetonesData} />
        </TabPanel>
        <TabPanel value="3">
          <AppWebsiteVisits4 LogisticsmilsetonesData={LogisticsmilsetonesData} />
        </TabPanel>
        <TabPanel value="4">
          <AppWebsiteVisits5 DependancymilsetonesData={DependancymilsetonesData} />
        </TabPanel>
        <TabPanel value="5">
          <AppWebsiteVisits6 ImplemenationmilsetonesData={ImplemenationmilsetonesData} />
        </TabPanel>
        <TabPanel value="6">
          <AppWebsiteVisits7 CapitalizationmilsetonesData={CapitalizationmilsetonesData} />
          {/* <br />
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits72 />
          </Grid>
          <br />
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits73 />
          </Grid>
          <br />
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits74 />
          </Grid>
          <br />
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits75 />
          </Grid> */}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
