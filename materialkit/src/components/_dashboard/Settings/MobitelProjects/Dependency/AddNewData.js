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
  const [Dependency, setDependency] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    const newName = { Dependency };
    axiosInstance
      .post('/Dependency/save', newName)
      .then(() => {
        alert('New Dependency Added');
        setDependency('');
        // navigate('/dashboard/settings/MobitelProjects/specialTag', { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const formik = useFormik({ initialValues: { Dependency: '' } });

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
                  Enter Dependency
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
                  label="Dependency"
                  value={Dependency}
                  onChange={(e) => {
                    setDependency(e.target.value);
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
                  Add Dependency
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
