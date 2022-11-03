// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import CardLists from '../components/_dashboard/MobitelProjectDatabase/Home/CardLists';
// ----------------------------------------------------------------------

export default function MobitelProjectsDatabase() {
  return (
    <Page title="Mobitel Projects Databases | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Mobitel Projects Databases
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
