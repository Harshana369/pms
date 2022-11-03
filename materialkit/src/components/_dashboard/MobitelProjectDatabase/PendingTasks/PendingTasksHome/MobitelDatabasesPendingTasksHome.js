// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../../Page';
import CardLists from './CardLists';
// ----------------------------------------------------------------------

export default function MobitelDatabasesPendingTasksHome() {
  return (
    <Page title="Mobitel Projects Databases | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Mobitel Projects Pending Tasks
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
