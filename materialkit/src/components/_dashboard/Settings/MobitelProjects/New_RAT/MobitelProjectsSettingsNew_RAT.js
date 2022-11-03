import React, { useEffect, useState } from 'react';
// material
import { Grid, Button, Card, Container, Stack, Typography, Link } from '@mui/material';
// components
import Page from '../../../../Page';
import Datagrid from './Datagrid';
import AddDetails from './AddNewData';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function MobitelProjectsSettingsNew_RAT() {
  const [isVisible1, setIsVisible1] = useState(false);

  return (
    <Page title="Settings - Select Menu Options | Mobitel Projects Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            New RAT Settings
          </Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <Datagrid />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AddDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
