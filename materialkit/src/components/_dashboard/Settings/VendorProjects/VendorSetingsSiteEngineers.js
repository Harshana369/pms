import React, { useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Link } from '@mui/material';
// components
import Page from '../../../Page';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function VendorSetingsSiteEngineers() {
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
        <Stack spacing={0.7} direction="row" />
      </Grid>
      <Grid alignItems="center" item xs={12} sm={12} md={12} mb={1}>
        <Stack spacing={0.7} direction="row" />
      </Grid>
    </Page>
  );
}
