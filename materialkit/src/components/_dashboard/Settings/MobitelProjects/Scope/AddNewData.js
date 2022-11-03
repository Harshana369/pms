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
  const [Scope, setScope] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    const newName = { Scope };
    axiosInstance
      .post('/Scope/save', newName)
      .then(() => {
        alert('New Scope Added');
        setScope('');
        // navigate('/dashboard/settings/MobitelProjects/specialTag', { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const formik = useFormik({ initialValues: { Scope: '' } });

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
                  Enter Scope
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
                  label="Scope"
                  value={Scope}
                  onChange={(e) => {
                    setScope(e.target.value);
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
                  Add Scope
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
