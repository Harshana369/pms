import React, { useState } from 'react';
import axios from 'axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, Button, Card, Container, Typography } from '@mui/material';
/* eslint-disable camelcase */

export default function AddNewData() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();
  const [New_RAT, setNew_RAT] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    const newName = { New_RAT };
    axiosInstance
      .post('/New_RAT/save', newName)
      .then(() => {
        alert('New New_RAT Added');
        setNew_RAT('');
        // navigate('/dashboard/settings/MobitelProjects/specialTag', { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const formik = useFormik({ initialValues: { New_RAT: '' } });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                <Typography variant="body2" color="text.secondary">
                  Enter New RAT
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="New RAT"
                  value={New_RAT}
                  onChange={(e) => {
                    setNew_RAT(e.target.value);
                  }}
                  type="text"
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Button
                  fullWidth
                  size="large"
                  onClick={(e) => {
                    sendData(e);
                  }}
                  value="register"
                  variant="contained"
                >
                  Add New_RAT
                </Button>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} />
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Card>
  );
}
