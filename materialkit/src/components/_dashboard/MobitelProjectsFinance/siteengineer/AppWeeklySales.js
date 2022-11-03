import { Icon } from '@iconify/react';
import site from '@iconify/icons-eva/radio-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714;

export default function AppWeeklySales() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={site} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">967</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        Scope
      </Typography>
    </RootStyle>
  );
}
