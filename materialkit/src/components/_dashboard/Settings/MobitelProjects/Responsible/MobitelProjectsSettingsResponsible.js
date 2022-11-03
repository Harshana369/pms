import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Card, Container, Stack, Typography, Link } from '@mui/material';
// components
import Page from '../../../../Page';
import DependencyDatagrid from './Datagrid';
import AddDetails from './AddNewData';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function MobitelProjectsSettingsResponsible() {
  const [isVisible1, setIsVisible1] = useState(false);

  return (
    <Page title="Settings - Select Menu Options | Projects Management Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" gutterBottom>
            Responsible Settings
          </Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <DependencyDatagrid />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AddDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
