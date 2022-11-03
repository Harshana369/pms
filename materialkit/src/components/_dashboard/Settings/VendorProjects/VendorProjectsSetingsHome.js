// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../../Page';
import CardList from './CardList';
//

// ----------------------------------------------------------------------

export default function VendorProjectsSetingsHome() {
  return (
    <Page title="Vendor Projects Settings | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Vendor Projects Settings
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
