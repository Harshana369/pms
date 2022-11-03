import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
//
import Datagrid from '../components/_dashboard/TestDatagrid/Datagrid';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Databases() {
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>
        <Stack mb={18} direction="row" alignItems="center" justifyContent="space-between">
          <Datagrid />
        </Stack>
        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <CellEditControlGrid />
        </Stack> */}
        {/* <Stack mb={24} direction="row" alignItems="center" justifyContent="space-between">
          <Test />
        </Stack> */}
      </Container>
    </Page>
  );
}
