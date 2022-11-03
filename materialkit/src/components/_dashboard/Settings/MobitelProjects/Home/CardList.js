import PropTypes from 'prop-types';
// material
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';
import SiteEngineersCard from './SiteEngineersCard';
import SpecialTagCard from './SpecialTagCard';
import DependencyCard from './DependencyCard';
import SiteStatusCard from './SiteStatusCard';
import ResponsibleCard from './ResponsibleCard';
import SubConCard from './SubConCard';
import ScopeCard from './ScopeCard';
import NewRATCard from './NewRATCard';
import LoremIpsum from './LoremIpsum';

// -----------------------------------------------

export default function ProductList() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/SiteEngineers"
        >
          <SiteEngineersCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/SpecialTag"
        >
          <SpecialTagCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/Dependency"
        >
          <DependencyCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/SiteStatus"
        >
          <SiteStatusCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/Responsible"
        >
          <ResponsibleCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/SubCon"
        >
          <SubConCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/Scope"
        >
          <ScopeCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/NewRAT"
        >
          <NewRATCard />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/SiteStatus"
        >
          <LoremIpsum />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/settings/MobitelProjects/Responsible"
        >
          <LoremIpsum />
        </Link>
      </Grid>
    </Grid>
  );
}
