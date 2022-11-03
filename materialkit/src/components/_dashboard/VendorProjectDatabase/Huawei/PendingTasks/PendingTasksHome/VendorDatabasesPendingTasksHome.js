// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../../../Page';
import CardLists from './CardLists';
// ----------------------------------------------------------------------

export default function VendorDatabasesPendingTasksHome() {
  return (
    <Page title="Vendor Projects Databases | Mobitel Projects Dashboard">
      <Container>
        <Typography variant="h6" gutterBottom>
          Huawei Projects Pending Tasks
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
