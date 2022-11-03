import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, Link } from '@mui/material';
import graph from '@iconify/icons-eva/activity-fill';
// components
import Page from '../components/Page';
//
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1,
  AppNewUsers,
  AppBugReports,
  AppBugReports1,
  AppItemOrders,
  AppWeeklySales
} from '../components/_dashboard/VendorProjects';

import AppCurrentVisits0 from '../components/_dashboard/VendorProjects/New folder/AppCurrentVisits0';
import AppCurrentVisits1 from '../components/_dashboard/VendorProjects/New folder/AppCurrentVisits1';
import AppCurrentVisits2 from '../components/_dashboard/VendorProjects/New folder/AppCurrentVisits2';
import AppCurrentVisits3 from '../components/_dashboard/VendorProjects/New folder/AppCurrentVisits3';
import AppCurrentVisits4 from '../components/_dashboard/VendorProjects/New folder/AppCurrentVisits4';
import AppCurrentVisits5 from '../components/_dashboard/VendorProjects/New folder/AppCurrentVisits5';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
export default function VendorProjectsView() {
  return (
    <Page title="Mobitel Projects | Project Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h5" gutterBottom>
            All Vendor Projects Insights
          </Typography>
          <Typography variant="h9" gutterBottom />
        </Stack>
        <Stack direction="row" spacing={0.5} mb={1}>
          <Button style={{ width: 252 }} size="large" color="warning" variant="contained">
            <Icon icon={graph} color="#DF3E30" height={16} />
            <Link underline="hover" component={RouterLink} to="/dashboard/VendorProjectsView">
              &nbsp;&nbsp;All Projects
            </Link>
          </Button>
          <Button style={{ width: 252 }} size="large" color="inherit" variant="outlined">
            <Icon icon={graph} color="#32a14f" height={16} />
            <Link underline="hover" component={RouterLink} to="/dashboard/VendorProjectsView1">
              &nbsp;&nbsp;ZTE L850 Phase 3
            </Link>
          </Button>

          <Button style={{ width: 252 }} size="large" color="inherit" variant="outlined">
            <Icon icon={graph} color="#32a14f" height={16} />
            <Link underline="hover" component={RouterLink} to="/dashboard/VendorProjectsView2">
              &nbsp;&nbsp;ZTE BBE 2020
            </Link>
          </Button>

          <Button style={{ width: 252 }} size="large" color="inherit" variant="outlined">
            <Icon icon={graph} color="#32a14f" height={16} />
            <Link underline="hover" component={RouterLink} to="/dashboard/VendorProjectsView3">
              &nbsp;&nbsp;Project 3
            </Link>
          </Button>
        </Stack>
        <Stack direction="row" spacing={0.5} mb={3}>
          <Button style={{ width: 252 }} size="large" color="inherit" variant="outlined">
            <Icon icon={graph} color="#32a14f" height={16} />
            <Link underline="hover" component={RouterLink} to="/dashboard/VendorProjectsView4">
              &nbsp;&nbsp;Project 4
            </Link>
          </Button>
          <Button style={{ width: 252 }} size="large" color="inherit" variant="outlined">
            <Icon icon={graph} color="#32a14f" height={16} />
            <Link underline="hover" component={RouterLink} to="/dashboard/VendorProjectsView5">
              &nbsp;&nbsp;Project 5
            </Link>
          </Button>
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports1 />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits0 />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits1 />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits2 />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits3 />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppCurrentVisits4 />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits5 />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits1 />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppNewsUpdate />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
