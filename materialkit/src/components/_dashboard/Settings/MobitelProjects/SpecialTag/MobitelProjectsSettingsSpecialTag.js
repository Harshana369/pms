import React, { useState } from 'react';
// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../../Page';
import SpecialTagDatagrid from './SpecialTagDatagrid';
import AddDetails from './AddNewData';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function MobitelProjectsSettingsSpecialTag() {
  const [isVisible1, setIsVisible1] = useState(false);

  return (
    <Page title="Settings | Mobitel Projects Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Mobitel Projects Special Tag Settings
          </Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <SpecialTagDatagrid />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AddDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
