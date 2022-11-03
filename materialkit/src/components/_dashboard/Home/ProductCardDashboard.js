import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
export default function ProductCardDashboard() {
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Box
          component="img"
          // src="/static/illustrations/dashboard.png"
          sx={{ height: 50, mx: 'auto', my: { xs: 1, sm: 1 } }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            Dashboard
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}
