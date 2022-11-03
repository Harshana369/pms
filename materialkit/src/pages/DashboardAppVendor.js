// material
import { Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import AppBugReports1 from '../components/_dashboard/app/AppBugReports1';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
export default function DashboardAppVendor() {
  return (
    <Page title="Vendor Dashboard | Projects Management Database System">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppBugReports1 />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits1 />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
