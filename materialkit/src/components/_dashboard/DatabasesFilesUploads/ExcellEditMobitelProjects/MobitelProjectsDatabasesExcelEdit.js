// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../Page';
import EditByExcelComponentnent from './EditByExcelComponent';

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
export default function MobitelProjectsDatabasesExcelEdit() {
  return (
    <Page title="Mobitel Databases Excel Edit | Mobitel Projects Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Mobitel Projects Database Excel Edit
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <EditByExcelComponentnent />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
