// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import { AppTasks, AppOrderTimeline } from '../components/_dashboard/other';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function Other() {
  return (
    <Page title="Insights | Project Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
          <Typography variant="h9" gutterBottom>
            Manage your tasks from here.
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="top" mb={3}>
          <Typography variant="h7" gutterBottom>
            Reminders
          </Typography>
        </Stack>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={12}>
            <AppTasks />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppTasks />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
