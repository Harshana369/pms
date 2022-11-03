import * as React from 'react';
import { Card, Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LastUpdatesMobitel from './LastUpdatesMobitel';

export default function LabTabs({ mobitelLastUpdates }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Mobitel Projects" value="1" />
              <Tab label="Vendor Projects" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AppNewsUpdate MobitelLastUpdates={mobitelLastUpdates} />
          </TabPanel>
          <TabPanel value="2">
            <AppNewsUpdate MobitelLastUpdates={mobitelLastUpdates} />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
}
