import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CryptoJS from 'react-native-crypto-js';
import windowsFilled from '@iconify/icons-eva/file-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Card, IconButton } from '@mui/material';
// components
import MenuPopover from '../../MenuPopover';
//
import account from '../../../_mocks_/account';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(27),
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.light,
  backgroundColor: '#011f40'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

const MENU_OPTIONS = [
  {
    label: 'Vendor Projects',
    linkTo: '/dashboard/DatabasesVendorProjectsAll/ViewOnly'
  },
  {
    label: 'Mobitel Projects',
    linkTo: '/dashboard/DatabasesMobitelProjects/AllMobitelProjects/ViewOnly'
  }
];
// ---------------------------------------------------------------------
export default function DatabasesView() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RootStyle ref={anchorRef} onClick={handleOpen}>
        <IconWrapperStyle>
          <Icon icon={windowsFilled} width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="subtitle1" sx={{ opacity: 1 }}>
          View Databases
        </Typography>
      </RootStyle>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 205 }}
      >
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'subtitle4', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            <Typography color="#cdd0d4" variant="subtitle1" sx={{ opacity: 1 }}>
              {option.label}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
