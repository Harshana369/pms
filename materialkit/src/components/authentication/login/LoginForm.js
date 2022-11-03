import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import CryptoJS from 'react-native-crypto-js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Typography,
  Grid
} from '@mui/material';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/dashboard/home', { replace: true });
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const { data } = await axiosInstance.post('/api/auth/login', { email, password }, config);
      localStorage.clear();
      localStorage.setItem('auth', data.token);

      // user data encryption and save in the localStorage
      const secret = 'AuH8e#?y!E87nyVh';
      const string = JSON.stringify(data.user);
      const encInfo = CryptoJS.AES.encrypt(string, secret).toString();
      localStorage.setItem('encInf', encInfo);

      navigate('/dashboard/home', { replace: true });
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          {error && (
            <Grid item xs={12} sm={6} md={12}>
              <Accordion
                sx={{
                  backgroundColor: '#c20202',
                  borderRadius: 0.2,
                  alignItems: 'center'
                }}
              >
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="h8" justifyContent="space-between">
                    <span className="error-message">{error}</span>
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </Grid>
          )}
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="off"
            size="large"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={error}
          />

          <TextField
            fullWidth
            autoComplete="off"
            size="large"
            // autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            // {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={error}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={(e) => {
            loginHandler(e);
          }}
          // loading={isSubmitting}
        >
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
}
