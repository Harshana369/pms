import React, { useState } from 'react';
// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../../Page';
import SiteEngineersDatagrid from './SiteEngineersDatagrid';
import AddDetails from './AddNewUser';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function MobitelProjectsSettingsSiteEngineers() {
  const [isVisible1, setIsVisible1] = useState(false);

  return (
    <Page title="Settings | Projects Management System">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Mobitel Projects Site Engineers Settings
          </Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <SiteEngineersDatagrid />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AddDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
