// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import UserListDatagrid from '../components/_dashboard/Admin/UserListDatagrid';
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
export default function UserList() {
  return (
    <Page title="Users List | Project Database System">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Existing Users
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} />
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <UserListDatagrid />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
