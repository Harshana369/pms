// material
import { Grid, Card, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import BasicTable from '../components/_dashboard/Test_database/BasicTable';
// ----------------------------------------------------------------------
// ---------------------------------------------------------------------
export default function Testdatabase() {
  return (
    <Page title="Test DB | Project Database">
      <Card>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="top" mb={6}>
            <Typography variant="h5" gutterBottom>
              Test Database
            </Typography>
          </Stack>
          <Grid item xs={12} sm={12} md={12}>
            <BasicTable />
          </Grid>
        </Container>
      </Card>
    </Page>
  );
}
