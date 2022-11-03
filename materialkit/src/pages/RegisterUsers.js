// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import AddNewUser from '../components/_dashboard/Admin/AddNewUser';
import ProfilePic from '../components/_dashboard/Admin/ProfilePic';

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
export default function RegisterUsers() {
  return (
    <Page title="Users List | Project Database System">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            Register New User
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} />
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ProfilePic />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <AddNewUser />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
