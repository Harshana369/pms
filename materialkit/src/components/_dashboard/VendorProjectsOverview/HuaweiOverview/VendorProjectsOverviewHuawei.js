import React, { useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Link } from '@mui/material';
// components
import Page from '../../../Page';
import AddDetails from './AddDetails';
import OverviewTable1 from './OverviewTable1';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function VendorProjectsOverviewHuawei() {
  const [isVisible1, setIsVisible1] = useState(false);

  return (
    <Page title="Vendor Projects Overview - Huawei | Project Management Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Vendor Projects Overview - Huawei Projects
          </Typography>
          <Typography variant="h9" gutterBottom />
          <Button size="small" color="inherit" variant="outlined">
            <Link underline="hover" href="/dashboard/VendorProjectsOverview">
              Refresh
            </Link>
          </Button>
        </Stack>
      </Container>
      <Grid alignItems="center" item xs={12} sm={12} md={12} mb={1.8}>
        <OverviewTable1 />
      </Grid>
      <Grid alignItems="center" item xs={12} sm={12} md={12} mb={1}>
        <Stack spacing={0.7} direction="row">
          {setIsVisible1 ? <AddDetails /> : null}
        </Stack>
      </Grid>
    </Page>
  );
}
