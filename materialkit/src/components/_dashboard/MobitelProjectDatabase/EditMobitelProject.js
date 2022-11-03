// material
import { Grid, Button, Card, Typography, Stack, Container, Link } from '@mui/material';
// components
import Page from '../../Page';
import EditDatabase from './AllMobitelProjects/DataEditFormNew';
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

export default function EditMobitelProject() {
  return (
    <Page title="Test DB | Project Database">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
        <Typography variant="h6" gutterBottom>
          Mobitel Projects Database - Edit Project
        </Typography>
        <Button size="small" color="inherit" variant="outlined">
          <Link underline="hover" href="/dashboard/VendorProjectDatabase">
            Refresh
          </Link>
        </Button>
      </Stack>
      <br />
      <Card>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="top" mb={1} />
          <Grid item xs={12} sm={12} md={12}>
            <EditDatabase />
          </Grid>
        </Container>
      </Card>
    </Page>
  );
}
