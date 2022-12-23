import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import CryptoJS from 'react-native-crypto-js';
import { useDispatch } from 'react-redux';

// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { AllSiteId } from '../../Redux/Action/DayPlanAction';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import sidebarConfig from './SidebarConfig';
import Empty from './Empty';

/* eslint-disable */

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 70;
const DRAWER_WIDTH = 235;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const renderContent = (
  <Scrollbar
    sx={{
      height: '100%',
      '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
    }}
  >
    <Box sx={{ px: 2.5, py: 3 }}>
      <Box component={RouterLink} to="/dashboard/home" sx={{ display: 'inline-flex' }}>
        <Logo />
      </Box>
    </Box>
    <NavSection navConfig={sidebarConfig} />
    <Box sx={{ flexGrow: 1 }} />
  </Scrollbar>
);

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// -----------------------------------------------------------------------------------
export default function DashboardLayout({ isOpenSidebar, onCloseSidebar, onOpenSidebar }) {
  const [open, setOpen] = useState(false);
  const [fullScreenMode, setfullScreenMode] = useState('on');

  const [jsonDecInfo, setjsonDecInfo] = useState('');
  const userRole = jsonDecInfo.adminLevel;

  const getUserData = () => {
    const secret = 'AuH8e#?y!E87nyVh';
    const encryptedData = localStorage.getItem('encInf');

    if (encryptedData) {
      const decData = CryptoJS.AES.decrypt(encryptedData, secret);
      const decInfo = decData.toString(CryptoJS.enc.Utf8);
      setjsonDecInfo(JSON.parse(decInfo));
    }
  };

  useEffect(() => {
    getUserData();
    fetchFullScreenStatus();
  }, []);

  const fetchFullScreenStatus = () => {
    setfullScreenMode(localStorage.getItem('mode'));
  };

  DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
  };

  const dispatch = useDispatch();

  // loading all site engineers names
  React.useEffect(() => {
    dispatch(AllSiteId());
  }, [dispatch]);
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      {!fullScreenMode || fullScreenMode === 'on' ? (
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      ) : (
        <Empty />
      )}
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
