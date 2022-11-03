// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/VendorProjectsOverview/OverviewHome';
// ----------------------------------------------------------------------

export default function VendorProjectsOverview() {
  return (
    <Page title="Vendor Projects Overview | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Vendor Projects Overview
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />
        <ProductList />
      </Container>
    </Page>
  );
}
