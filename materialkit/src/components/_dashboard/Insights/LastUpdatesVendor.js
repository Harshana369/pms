import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
//
import Scrollbar from '../../Scrollbar';

// --------------------------------------------------------------
export default function LastUpdatesVendor({ vendorLastUpdates }) {
  return (
    <Card>
      <CardHeader title="Latest Updates - Vendor Projects" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {vendorLastUpdates.map((posts, index) => (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                key={index}
                component="img"
                src={`/static/Tower (${index + 1}).jpg`}
                sx={{ width: 48, height: 48, borderRadius: 1.5 }}
              />
              <Box sx={{ minWidth: 240 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    mb={0}
                  >
                    <Typography variant="h8" noWrap>
                      {posts.Site_ID}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      - {posts.Project}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {moment(posts.updatedAt).fromNow()}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {posts.currentUser} updated project details of site {posts.Site_Name} (
                  {posts.Site_ID}) in {posts.Project}.
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
