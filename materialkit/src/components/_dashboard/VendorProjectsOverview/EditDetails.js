import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Stack, Link, CardHeader } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import Page from '../../Page';

export default function EditDetails() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const { id } = useParams();
  const [post, setPost] = useState({
    ProjectName: '',
    Vendor: '',
    StartDate: '',
    EndDate: '',
    Budget: '',
    ProjectScope: '',
    HandoverScope: '',
    PATPass: '',
    Completed: '',
    Remaining: '',
    Progress: ''
  });

  const {
    ProjectName,
    Vendor,
    StartDate,
    EndDate,
    Budget,
    ProjectScope,
    HandoverScope,
    PATPass,
    Completed,
    Remaining,
    Progress
  } = post;

  const onInputChange = (e) => {
    console.log(e.target.value);
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadPost();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const loadPost = async () => {
    const result = await axiosInstance.get(`/vendorProjectsOverviewTable/${id}`);
    setPost(result.data.post);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/vendorProjectsOverviewTable/Edit/${id}`, post);
    alert('Details Updated');
    navigate('/dashboard/VendorProjectsOverview', { replace: true });
  };

  return (
    <Page title="Insights | Project Database">
      <Card mb={2}>
        <CardHeader title="Edit Project Details" />
        <Box sx={{ p: 3, pb: 1, width: 600, maxWidth: '100%' }} dir="ltr">
          <DialogContentText style={{ color: 'white' }}>
            Enter the new details of the project
          </DialogContentText>
          <br />
          <Stack spacing={0.6} direction="row" mb={2}>
            <TextField
              id="ProjectName"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Project Name"
              type="text"
              name="ProjectName"
              value={ProjectName}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={0.6} direction="row" mb={2}>
            <TextField
              id="Vendor"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Vendor Name"
              type="text"
              name="Vendor"
              value={Vendor}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={0.6} direction="row" mb={2}>
            <TextField
              id="Start Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Start Date"
              type="text"
              name="StartDate"
              value={StartDate}
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="End Date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="End Date"
              type="text"
              name="EndDate"
              value={EndDate}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={0.6} direction="row" mb={2}>
            <TextField
              id="Budget"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Budget"
              type="text"
              name="Budget"
              value={Budget}
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="ProjectScope"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Project Scope"
              type="text"
              name="ProjectScope"
              value={ProjectScope}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={0.6} direction="row" mb={2}>
            <TextField
              id="HO Scope"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Handover Scope"
              type="text"
              name="HandoverScope"
              value={HandoverScope}
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="PAT Pass"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="PAT Pass Scope"
              type="text"
              name="PATPass"
              value={PATPass}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={0.6} direction="row" mb={2}>
            <TextField
              id="Completed"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Completed Scope"
              type="text"
              name="Completed"
              value={Completed}
              onChange={(e) => onInputChange(e)}
            />
            {/* <TextField
              id="Remaining"
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Remaining Scope"
              type="text"
              name="Remaining"
              value={Remaining}
              onChange={(e) => onInputChange(e)}
            /> */}
          </Stack>
          <Stack spacing={0.6} direction="row" mb={2}>
            {/* <TextField
              id="Progress"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Progress"
              type="text"
              name="Progress"
              value={Progress}
              onChange={(e) => onInputChange(e)}
            /> */}
          </Stack>
          <Stack spacing={0.8} direction="row" mb={1}>
            <Button color="primary" variant="outlined">
              <Link underline="none" component={RouterLink} to="/dashboard/VendorProjectsOverview">
                Cancel
              </Link>
            </Button>
            <Button onClick={(e) => onSubmit(e)} color="primary" variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </Page>
  );
}
