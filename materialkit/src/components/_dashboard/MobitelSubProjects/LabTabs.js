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
import AppWebsiteVisits72 from './New folder/AppWebsiteVisits72';
import AppWebsiteVisits73 from './New folder/AppWebsiteVisits73';
import AppWebsiteVisits74 from './New folder/AppWebsiteVisits74';
import AppWebsiteVisits75 from './New folder/AppWebsiteVisits75';

export default function LabTabs() {
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
            <Tab label="TSSR" value="1" />
            <Tab label="PO" value="2" />
            <Tab label="Logistics" value="3" />
            <Tab label="Dependancy" value="4" />
            <Tab label="Implementation" value="5" />
            <Tab label="Capitalization" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AppWebsiteVisits2 />
        </TabPanel>
        <TabPanel value="2">
          <AppWebsiteVisits3 />
        </TabPanel>
        <TabPanel value="3">
          <AppWebsiteVisits4 />
        </TabPanel>
        <TabPanel value="4">
          <AppWebsiteVisits5 />
        </TabPanel>
        <TabPanel value="5">
          <AppWebsiteVisits6 />
        </TabPanel>
        <TabPanel value="6">
          <AppWebsiteVisits7 />
          <br />
          <AppWebsiteVisits72 />
          <br />
          <AppWebsiteVisits73 />
          <br />
          <AppWebsiteVisits74 />
          <br />
          <AppWebsiteVisits75 />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
