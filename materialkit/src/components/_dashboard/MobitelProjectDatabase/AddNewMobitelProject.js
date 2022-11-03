// material
import { Grid, Button, Card, Typography, Stack, Container, Link } from '@mui/material';
// components
import Page from '../../Page';
import Testdataforms from './DataInputFormNew';
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

export default function AddNewMobitelProject() {
  return (
    <Page title="Mobitel Projects Database | Projects Management Database System">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
        <Typography variant="h6" gutterBottom>
          Mobitel Projects Database - Add New Project
        </Typography>
        <Typography variant="h9" gutterBottom />
        <Button size="small" color="inherit" variant="outlined">
          <Link underline="hover" href="/dashboard/DatabasesMobitelProjects/AddNew">
            Refresh
          </Link>
        </Button>
      </Stack>
      <br />
      <Card>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="top" mb={1} />
          <Grid item xs={12} sm={12} md={12}>
            <Testdataforms />
          </Grid>
        </Container>
      </Card>
    </Page>
  );
}
