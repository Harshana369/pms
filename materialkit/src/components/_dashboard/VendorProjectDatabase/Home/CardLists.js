// material
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';
import AllVendorProjects from './AllVendorProjects';
import HuaweiProjects from './HuaweiProjects';
import ZTEProjects from './ZTEProjects';
// ----------------------------------------------------
export default function ProductList() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/DatabasesVendorProjectsAll">
          <AllVendorProjects />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/DatabasesVendorProjectsHuawei">
          <HuaweiProjects />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link underline="none" component={RouterLink} to="/dashboard/DatabasesVendorProjectsZTE">
          <ZTEProjects />
        </Link>
      </Grid>
    </Grid>
  );
}
