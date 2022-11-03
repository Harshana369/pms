import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-eva/home-outline';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/Home';
//

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <Page title="Home | Mobitel Projects Dashboard">
      <Container>
        <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>
          <Icon icon={windowsFilled} width={21} height={21} /> Home
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />
        <ProductList />
      </Container>
    </Page>
  );
}
