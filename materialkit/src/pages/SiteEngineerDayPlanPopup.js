import React from 'react';
// import CloseIcon from '@material-ui/icons/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Box, style } from '@mui/system';
/* eslint-disable */

export default function SiteEngineerDayPlanPopup(props) {
  const { openPopup, setOpenPopup, siteEName } = props;

  console.log(siteEName);

  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle style={{ backgroundColor: '#130f40' }}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Select Plan
          </Typography>
          <Button
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          ></Button>
        </div>
      </DialogTitle>
      <DialogContent style={{ backgroundColor: '#130f40' }}>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <TextField
            label="First name"
            // value={username}
            // onChange={(e) => {
            //   setUsername(e.target.value);
            // }}
            // type="text"
            // // {...getFieldProps('firstName')}
            // error={Boolean(touched.firstName && errors.firstName)}
            // helperText={touched.firstName && errors.firstName}
          />

          <TextField
            label="Last name"
            // value={lastName}
            // onChange={(e) => {
            //   setLastName(e.target.value);
            // }}
            // type="text"
            // // {...getFieldProps('lastName')}
            // error={Boolean(touched.lastName && errors.lastName)}
            // helperText={touched.lastName && errors.lastName}
          />

          <TextField label="Village" />

          <TextField label="Village" />
          {/* <TextField label="Village" />
          <TextField label="Village" />
          <TextField label="Village" /> */}
        </Stack>

        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{
            width: 700,
            maxWidth: '100%'
          }}
        >
          <TextField fullWidth label="fullWidth" id="fullWidth" />
        </Stack>

        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Select Result
        </Typography>

        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <TextField label="Village" />
          <TextField label="Village" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
