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
export default function AppWeeklySales({ scopeData, scopeDataDetails }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

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
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function createData(name, count) {
    return { name, count };
  }

  console.log(scopeDataDetails);
  const rows = [
    createData('Covid 19 Capacity Update 3', 182),
    createData('Huawei IBBE P1', 165),
    createData('Other Project 2021', 72),
    createData('Mobitel Projects Overview', 1200)
  ];

  return (
    <>
      <RootStyle>
        <IconWrapperStyle>
          <Icon icon={site} width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{TOTAL}</Typography>

        <Button variant="outlined" onClick={handleClickOpen}>
          Scope
        </Button>
      </RootStyle>

      <Dialog onClose={handleClose} open={open}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>ProjectName</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
}
