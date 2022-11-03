import react, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import CryptoJS from 'react-native-crypto-js';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckMark from '@iconify/icons-eva/checkmark-fill';
import Clear from '@iconify/icons-eva/question-mark-outline';
import { Icon } from '@iconify/react';
// material
import Alert from '@mui/material/Alert';
import {
  Stack,
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
/* eslint-disable camelcase */