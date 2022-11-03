import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Card,
  Container,
  Typography
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const designations = [
  {
    value: 'Engineer',
    label: 'Engineer'
  },
  {
    value: 'Site Engineer',
    label: 'Site Engineer'
  },
  {
    value: 'Vendor',
    label: 'Vendor'
  }
];

const adminLevels = [
  {
    value: 'Admin',
    label: 'Admin'
  },
  {
    value: 'Moderator',
    label: 'Moderator'
  },
  {
    value: 'Editor',
    label: 'Editor'
  },
  {
    value: 'Vendor - Huawei',
    label: 'Vendor - Huawei'
  },
  {
    value: 'Vendor - ZTE',
    label: 'Vendor - ZTE'
  },
  {
    value: 'View Only',
    label: 'View Only'
  }
];

// const RegisterScreen = ({ history }) => {
export default function RegisterForm() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [adminLevel, setAdminLevel] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setcontactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    if (password !== confirmpassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      const { data } = await axiosInstance.post(
        '/api/auth/register',
        {
          username,
          lastName,
          designation,
          adminLevel,
          email,
          contactNumber,
          password
        },
        config
      );

      localStorage.setItem('authToken', data.token);

      navigate('/dashboard/Users/userList', { replace: true });
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema
    // onSubmit: () => {
    //   axios
    //     .post('http://localhost:8072/users/save')
    //     .then(() => {
    //       alert('New Project Added');
    //     })
    //     .catch((err) => {
    //       alert(err);
    //     });
    // navigate('/dashboard', { replace: true });
    // }
  });

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
                  Enter details of the user.
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                <Typography variant="body2" color="red">
                  {error && <span className="error-message">{error}</span>}
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
                  label="First name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  // {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  // {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
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
                  label="Designation"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                  }}
                  type="text"
                  // {...getFieldProps('firstName')}
                  // error={Boolean(touched.firstName && errors.firstName)}
                  // helperText={touched.firstName && errors.firstName}
                  select
                >
                  {designations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Privilage Level"
                  value={adminLevel}
                  onChange={(e) => {
                    setAdminLevel(e.target.value);
                  }}
                  type="text"
                  select
                  // {...getFieldProps('lastName')}
                  // error={Boolean(touched.lastName && errors.lastName)}
                  // helperText={touched.lastName && errors.lastName}
                >
                  {adminLevels.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  // {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  type="text"
                  label="Contact Number"
                  value={contactNumber}
                  onChange={(e) => {
                    setcontactNumber(e.target.value);
                  }}
                  // {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
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
                  autoComplete="current-password"
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
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  // autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="ConfirmPassword"
                  value={confirmpassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  // {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Button
                  fullWidth
                  size="large"
                  // type="submit"
                  // onClick={sendData}
                  // onClick={registerUser}
                  onClick={(e) => {
                    registerHandler(e);
                  }}
                  value="register"
                  variant="contained"
                  // loading={isSubmitting}
                >
                  Register
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
