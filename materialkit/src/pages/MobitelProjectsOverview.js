import React, { useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Link } from '@mui/material';
// components
import Page from '../components/Page';
import AddDetails from '../components/_dashboard/MobitelProjectsOverview/AddDetails';
import OverviewTable from '../components/_dashboard/MobitelProjectsOverview/OverviewTable1';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function MobitelProjectsOverview() {
  const [isVisible1, setIsVisible1] = useState(false);

  return (
    <Page title="Mobitel Projects Overview | Project Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Mobitel Projects Overview
          </Typography>
          <Typography variant="h9" gutterBottom />
          <Button size="small" color="inherit" variant="outlined">
            <Link underline="hover" href="/dashboard/MobitelProjectsOverview">
              Refresh
            </Link>
          </Button>
        </Stack>
      </Container>
      <Grid alignItems="center" item xs={12} sm={12} md={12} mb={1.8}>
        <OverviewTable />
      </Grid>
      <Grid alignItems="center" item xs={12} sm={12} md={12} mb={1}>
        <Stack spacing={0.7} direction="row">
          {setIsVisible1 ? <AddDetails /> : null}
        </Stack>
      </Grid>
    </Page>
  );
}
