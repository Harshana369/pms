// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Stack } from '@mui/material';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(132),
  height: theme.spacing(10),
  padding: theme.spacing(5, 0),
  color: theme.palette.secondary.light,
  backgroundColor: '#011f40',
  display: 'flex',
  alignItems: 'center'
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
export default function VendorProjectsSettings() {
  return (
    <RootStyle>
      <Stack direction="row" alignItems="left" justifyContent="left" mb={2}>
        {/* <IconWrapperStyle>
          <Icon icon={windowsFilled} width={15} height={15} />
        </IconWrapperStyle> */}
        <Typography variant="subtitle1"> Vendor Projects Settings </Typography>
      </Stack>
    </RootStyle>
  );
}
