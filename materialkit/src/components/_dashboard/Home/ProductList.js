import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link } from '@mui/material';
import ProductCardDashboard from './Dashboard';
import VendorProjects from './VendorProjects';
import MobitelProjects from './MobitelProjects';
import VendorDatabases from './VendorDatabases';
import MobitelDatabases from './MobitelDatabases';
import DatabasesView from './DatabasesView';
// ----------------------------------------------------------------------
export default function ProductList() {
  // const url = 'http://localhost:3000';

  // const handleClickOpen = () => {
  //   window.open(
  //     `${url}/DatabasesMobitelProjects/AllMobitelHandoverData`,
  //     'Handover Details',
  //     'width=1000px,height=400px'
  //   );
  // };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2.4}>
        {/* <Button onClick={handleClickOpen}>Click</Button> */}
        <Link underline="none" component={RouterLink} to="/dashboard/app">
          <ProductCardDashboard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/VendorProjectsOverview">
          <VendorProjects />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/MobitelProjectsOverview">
          <MobitelProjects />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/DatabasesVendorProjects">
          <VendorDatabases />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/DatabasesMobitelProjects">
          <MobitelDatabases />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <DatabasesView />
      </Grid>
    </Grid>
  );
}
