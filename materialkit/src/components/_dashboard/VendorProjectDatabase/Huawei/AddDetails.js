import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Stack } from '@mui/material';

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
  const [Vendor, SetVendor] = useState('');
  const [StartDate, SetstartDate] = useState('');
  const [EndDate, SetendDate] = useState('');
  const [Budget, Setbudget] = useState('');
  const [ProjectScope, SetProjectScope] = useState('');
  const [HandoverScope, SethoScope] = useState('');
  const [OnHoldSites, SetOnholdAmount] = useState('');
  const [PATPass, SetpatpassScope] = useState('');
  const [Completed, SetcompletedScope] = useState('');
  const [Remaining, Setremaining] = useState('');
  const [Progress, SetProgress] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    const newProject = {
      Database,
      ProjectName,
      Vendor,
      StartDate,
      EndDate,
      Budget,
      ProjectScope,
      HandoverScope,
      OnHoldSites,
      PATPass,
      Completed,
      Remaining,
      Progress
    };
    axiosInstance
      .post('/mobitelProjectsOverviewTable/save', newProject)
      .then(() => {
        alert('New Project Added');
        handleClose();
        navigate('/dashboard/MobitelProjectsOverview', { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary" variant="outlined">
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: 'black' }}>Add New Project</DialogTitle>
        <DialogContent style={{ width: 550, height: 350 }}>
          <DialogContentText style={{ color: 'black' }}>
            Add details of the new project
          </DialogContentText>
          <br />
          <Box sx={{ align: 'center', width: 505, maxWidth: '100%' }}>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                disabled
                id="DatabaseName"
                fullWidth
                autocomplete="off"
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
                autocomplete="off"
                size="small"
                label="Project Name"
                placeholder="Name"
                onChange={(e) => {
                  SetprojectName(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                id="Vendor"
                fullWidth
                size="small"
                label="Vendor Name"
                placeholder="Vendor Name"
                onChange={(e) => {
                  SetVendor(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                id="Start Date"
                fullWidth
                size="small"
                label="Start Date"
                placeholder="mmm-yy"
                onChange={(e) => {
                  SetstartDate(e.target.value);
                }}
              />
              <TextField
                id="End Date"
                fullWidth
                size="small"
                label="End Date"
                placeholder="mmm-yy"
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
                placeholder="USD M"
                onChange={(e) => {
                  Setbudget(e.target.value);
                }}
              />
              <TextField
                id="ProjectScope"
                fullWidth
                size="small"
                label="Project Scope"
                placeholder="Scope"
                onChange={(e) => {
                  SetProjectScope(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={0.6} direction="row" mb={2}>
              <TextField
                id="HO Scope"
                size="small"
                fullWidth
                label="Handover Scope"
                placeholder="Scope"
                onChange={(e) => {
                  SethoScope(e.target.value);
                }}
              />
              <TextField
                id="On hold"
                size="small"
                fullWidth
                label="On Hold Sites"
                placeholder="On hold sites amount"
                onChange={(e) => {
                  SetOnholdAmount(e.target.value);
                }}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
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
