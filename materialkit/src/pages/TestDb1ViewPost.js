// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import ViewPosts1 from '../components/_dashboard/TestDb1/ViewPosts1';
// ----------------------------------------------------------------------
// ---------------------------------------------------------------------

export default function TestDb1ViewPost() {
  return (
    <Page title="Test DB | Project Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="top" mb={6}>
          <Typography variant="h5" gutterBottom>
            Test Database
          </Typography>
        </Stack>
        <Grid item xs={12} sm={6} md={12}>
          <ViewPosts1 />
        </Grid>
      </Container>
    </Page>
  );
}
