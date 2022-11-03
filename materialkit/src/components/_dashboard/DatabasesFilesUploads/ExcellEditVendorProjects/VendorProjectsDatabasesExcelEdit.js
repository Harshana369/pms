// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../Page';
import EditByExcelComponent from './EditByExcelComponent';

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
export default function VendorProjectsDatabasesExcelEdit() {
  return (
    <Page title="Vendor Databases Excel Edit | Mobitel Projects Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Vendor Projects Database Excel Edit
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <EditByExcelComponent />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
