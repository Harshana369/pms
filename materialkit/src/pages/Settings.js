// material
import { Link as RouterLink } from 'react-router-dom';
import { Container, Stack, Typography, Grid, Link } from '@mui/material';
// components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Page from '../components/Page';
//

// ----------------------------------------------------------------------

export default function Settings() {
  return (
    <Page title="Settings | Projects Management System">
      <Container>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />
        <Grid container spacing={1}>
          {/* <Grid item xs={12} sm={6} md={12}>
            <Link underline="none" component={RouterLink} to="/dashboard/settings/VendorProjects">
              <Accordion
                sx={{
                  backgroundColor: '#011f40',
                  borderRadius: 0.2
                }}
              >
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Vendor Projects</Typography>
                </AccordionSummary>
              </Accordion>
            </Link>
          </Grid> */}
          <Grid item xs={12} sm={6} md={12}>
            <Link underline="none" component={RouterLink} to="/dashboard/settings/MobitelProjects">
              <Accordion
                sx={{
                  backgroundColor: '#011f40',
                  borderRadius: 0.2
                }}
              >
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Select Menu Options</Typography>
                </AccordionSummary>
              </Accordion>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
