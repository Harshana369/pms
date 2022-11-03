// material
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import UserDetails from '../components/_dashboard/UserProfile/UserDetails';
import ProfilePic from '../components/_dashboard/UserProfile/ProfilePic';

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
export default function UserProfile() {
  return (
    <Page title="User Profile | Mobitel Project Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            User Profile
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} />
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ProfilePic />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <UserDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
