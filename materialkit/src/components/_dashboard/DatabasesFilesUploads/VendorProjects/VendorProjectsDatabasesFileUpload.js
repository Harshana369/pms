// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../Page';
import UploadExcellData from './UploadExcellData';

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
export default function VendorProjectsDatabasesFileUpload() {
  return (
    <Page title="Vendor Databases File Upload | Project Database System">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" gutterBottom>
            Vendor Projects Database Files Upload
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <UploadExcellData />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
