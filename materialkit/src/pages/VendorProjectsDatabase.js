// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import CardLists from '../components/_dashboard/VendorProjectDatabase/Home/CardLists';
// ----------------------------------------------------------------------

export default function VendorProjectsDatabase() {
  return (
    <Page title="Vendor Projects Databases | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Vendor Projects Databases
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />
        <CardLists />
      </Container>
    </Page>
  );
}
