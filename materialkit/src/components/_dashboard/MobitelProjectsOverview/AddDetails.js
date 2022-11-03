import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Stack, Box } from '@mui/material';

export default function AddDetails() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [Database, SetDatabase] = useState('Mobitel Projects Overview');
  const [ProjectName, SetprojectName] = useState('');
  const [Vendor, SetVendor] = useState('Mobitel');
  const [StartDate, SetstartDate] = useState('');
  const [EndDate, SetendDate] = useState('');
  const [Budget, Setbudget] = useState('');
  const [ProjectScope, SetProjectScope] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    const newProject = {
      Database,
      ProjectName,
      Vendor,
      StartDate,
      EndDate,
      Budget,
      ProjectScope
    };
    axiosInstance
      .post('/mobitelProjectsOverviewTable/save', newProject)
      .then(() => {
        alert('New project created successfully !');
        handleClose();
        navigate('/dashboard/MobitelProjectsOverview', { replace: true });
        navigate(0);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary" variant="outlined">
        Create Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#041426' }}>Add New Project</DialogTitle>
        <DialogContent
          style={{ color: '#FF0000', width: 600, height: 350, backgroundColor: '#041426' }}
        >
          <DialogContentText style={{ color: 'gray' }}>
            Add details of the new project
          </DialogContentText>
          <br />
          <Box sx={{ align: 'center', width: 600, maxWidth: '100%' }}>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                disabled
                id="DatabaseName"
                fullWidth
                size="small"
                placeholder="Mobitel Projects Overview"
                onChange={(e) => {
                  SetDatabase('Mobitel Projects Overview');
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                id="ProjectName"
                fullWidth
                size="small"
                label="Project Name"
                onChange={(e) => {
                  SetprojectName(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                disabled
                id="Vendor"
                fullWidth
                size="small"
                placeholder="Mobitel"
                onChange={(e) => {
                  SetVendor('Mobitel');
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                id="Start Date"
                fullWidth
                size="small"
                label="Start Date"
                onChange={(e) => {
                  SetstartDate(e.target.value);
                }}
              />
              <TextField
                id="End Date"
                fullWidth
                size="small"
                label="End Date"
                onChange={(e) => {
                  SetendDate(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                id="Budget"
                fullWidth
                size="small"
                label="Budget"
                onChange={(e) => {
                  Setbudget(e.target.value);
                }}
              />
              <TextField
                id="ProjectScope"
                fullWidth
                size="small"
                label="Project Scope"
                onChange={(e) => {
                  SetProjectScope(e.target.value);
                }}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#041426' }}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={sendData} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
