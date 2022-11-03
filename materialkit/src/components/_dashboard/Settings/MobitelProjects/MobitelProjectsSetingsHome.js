// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../Page';
import CardList from './Home/CardList';
// ----------------------------------------------------------------------

export default function MobitelProjectsSetingsHome() {
  return (
    <Page title="Settings - Select Menu Options | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Select Menu Options Settings
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />
        <CardList />
      </Container>
    </Page>
  );
}
