import React from 'react';
import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-eva/radio-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Button, Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(27),
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.darker,
  backgroundColor: theme.palette.secondary.lighter
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
  color: theme.palette.secondary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
    theme.palette.secondary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
export default function AppBugReports1({ handoverData }) {
  const url = 'http://172.22.110.186';

  // const url = 'http://localhost:3000';
  const TOTAL = handoverData;

  const handleClickOpen = () => {
    window.open(
      `${url}/DatabasesMobitelProjects/AllMobitelHandoverData`,
      'Handover Details',
      'width=1000px,height=400px'
    );
  };

  return (
    <RootStyle>
      <IconWrapperStyle onClick={handleClickOpen}>
        <Icon icon={bugFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        Handover
      </Typography>
    </RootStyle>
  );
}
