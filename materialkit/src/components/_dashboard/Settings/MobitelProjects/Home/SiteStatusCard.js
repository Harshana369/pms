import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-eva/activity-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// -------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(13),
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.light,
  backgroundColor: '#011f40',
  borderRadius: 8
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

// ----------------------------------------------------------------------
export default function SiteStatusCard() {
  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        Site Status
      </Typography>
    </RootStyle>
  );
}
