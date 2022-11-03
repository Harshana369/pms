// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/Insights/InsightsHome';
// ----------------------------------------------------------------------

export default function VendorProjectsInsights() {
  return (
    <Page title="Vendor Projects Insights | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Vendor Projects Insights
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
