import React from 'react';
import { Icon } from '@iconify/react';
import site from '@iconify/icons-eva/radio-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Button,
  Card,
  Dialog,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

/* eslint-disable */

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(27),
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------------------------------
export default function AppWeeklySales({ scopeData }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  //const url = 'http://172.22.110.186';

  const url = 'http://localhost:3000';

  // const [ScopeData, setData1] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://pms-mobitel.herokuapp.com/mobitelProjectsOverviewTable', {
  //       params: { assignEvent: 'projectName' }
  //     })
  //     .then((res) => {
  //       setData1(res.data.scopeDataToTheFrontEnd);
  //       console.log(res.data.scopeDataToTheFrontEnd);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const TOTAL = scopeData;

  const handleClickOpen = () => {
    window.open(
      `${url}/DatabasesMobitelProjects/AllMobitelScopeData`,
      'Scope Details',
      'width=1000px,height=400px'
    );
  };
  // const handleClose = (value) => {
  //   setOpen(false);
  //   setSelectedValue(value);
  // };
  return (
    <>
      <RootStyle>
        <IconWrapperStyle onClick={handleClickOpen}>
          <Icon icon={site} width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{TOTAL}</Typography>

        <Typography variant="subtitle1" sx={{ opacity: 1 }}>
          Scope
        </Typography>
      </RootStyle>
    </>
  );
}
