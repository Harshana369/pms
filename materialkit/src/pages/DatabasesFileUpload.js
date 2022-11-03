// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import CardLists from '../components/_dashboard/DatabasesFilesUploads/Home/CardLists';
// ----------------------------------------------------------------------

export default function DatabasesFileUpload() {
  return (
    <Page title="Databases File Upload | Projects Management Database System">
      <Container>
        <Typography variant="h6" gutterBottom>
          Databases File Upload
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
