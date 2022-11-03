// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
export default function AcceptancePendingTasks({ acceptance }) {
  const AcceptancePendingTasksNotifications = acceptance;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Typography variant="subtitle1" color="PendingTasks" sx={{ opacity: 1 }}>
          {AcceptancePendingTasksNotifications < 5 ? (
            <Typography variant="subtitle1" color="primary" sx={{ opacity: 1 }}>
              {AcceptancePendingTasksNotifications}
            </Typography>
          ) : (
            <Typography variant="subtitle1" color="PendingTasks" sx={{ opacity: 1 }}>
              {AcceptancePendingTasksNotifications}
            </Typography>
          )}
        </Typography>
      </IconWrapperStyle>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        Acceptance
      </Typography>
    </RootStyle>
  );
}
