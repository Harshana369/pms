import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import site from '@iconify/icons-eva/radio-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(27),
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
export default function AppNewUsers({ onAirData }) {
  // const [OnAirData, setData1] = useState();
  // useEffect(() => {
  //   axios
  //     .get('https://pms-mobitel.herokuapp.com/vendorProjectsDatabases')
  //     .then((res) => {
  //       setData1(res.data.OnAirDataForFrontEnd);
  //       // console.log(res.data.HandOverDataToSquares);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const TOTAL = OnAirData;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={site} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{onAirData}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        On Air
      </Typography>
    </RootStyle>
  );
}
