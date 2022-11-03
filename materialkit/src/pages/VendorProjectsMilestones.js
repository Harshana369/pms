// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/VendorProjectsMilestones/VendorProjectsMilestonesHome';
// ----------------------------------------------------------------------

export default function VendorProjectsMilestones() {
  return (
    <Page title="Vendor Projects Milestones | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Vendor Projects Milestones
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
