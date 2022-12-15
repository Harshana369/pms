import React from 'react';
// import CloseIcon from '@material-ui/icons/Close';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Box, style } from '@mui/system';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker, LocalizationProvider } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useSelector } from 'react-redux';

/* eslint-disable */

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default function SiteEngineerDayPlanPopup(props) {
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [siteName, setSiteName] = React.useState('MTTEL2');
  const [selectedScope, setSelectedScope] = React.useState();
  const [scope, setScope] = React.useState([null]);
  const [planDate, setPlanDate] = React.useState('Enter Date');
  const [plannedWork, setPlannedWork] = React.useState();
  const [allSiteData, setAllSiteData] = React.useState([{}]);

  const load = open && options.length === 0;

  const sName = siteName.Site_ID;

  const { openPopup, setOpenPopup, seSite, siteEName } = props;

  const getSiteData = async () => {
    try {
      const { data } = await axiosInstance.get('/getAllSiteData');
      setAllSiteData(data.allSiteData);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleRowClick = () => {
  //   const selectedSiteId = siteName.Site_ID;
  //   const reformattedArray = allSiteData.map(({ Site_ID, Scope }) => ({
  //     Site_ID,
  //     Scope
  //   }));
  //   var newArray = reformattedArray.filter(function (el) {
  //     return el.Site_ID === selectedSiteId;
  //   });
  //   const Data = newArray.map((object) => object.Scope);
  //   let Temp = [...new Set(Data)];
  //   setScope(Temp);
  //   // return Temp;
  // };

  //----------------Site ID--------------------
  React.useEffect(() => {
    let active = true;
    if (!load) {
      return undefined;
    }
    if (active) {
      setOptions([...seSite]);
    }
    return () => {
      active = false;
    };
  }, [load]);
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  React.useEffect(() => {
    // handleRowClick();
  }, [siteName]);

  React.useEffect(() => {
    getSiteData();
  }, []);

  const clearallSate = () => {
    setPlanDate('');
    setSiteName('');
    setSelectedScope('');
    setPlannedWork('');
  };

  async function saveDayPlan() {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axiosInstance.post(
        `/siteEngineerDayPlan/save`,
        { siteEName, planDate, sName, selectedScope, plannedWork },
        config
      );
    } catch (error) {
      console.log(error);
    }

    setOpenPopup(false);
    clearallSate();
  }

  const handleChange = (event) => {
    setSelectedScope(event.target.value);
  };

  const setDate = (e) => {
    setPlanDate(`${e.$y}-${e.$M + 1}-${e.$D}`);
  };

  return (
    <>
      <Dialog open={openPopup}>
        <DialogTitle style={{ backgroundColor: '#130f40' }}>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add Plan
            </Typography>

            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setOpenPopup(false);
                clearallSate();
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#130f40' }} sx={{ width: '100%', height: 300 }}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            mt={2}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={planDate}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Autocomplete
              id="asynchronous-demo"
              sx={{ width: 300, marginTop: 3 }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) => option.Site_ID === value.Site_ID}
              getOptionLabel={(option) => option.Site_ID}
              options={options}
              loading={load}
              value={siteName}
              onChange={(event, newValue) => setSiteName(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Site ID"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {load ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    )
                  }}
                />
              )}
            />
          </Stack>

          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            sx={{
              width: 300,
              maxWidth: '100%'
            }}
          >
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">Scope</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedScope}
                label="Scope"
                onChange={handleChange}
              >
                {scope.map((el) => (
                  <MenuItem value={el} key={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            sx={{
              width: 700,
              maxWidth: '100%'
            }}
          >
            <TextField
              fullWidth
              label="Planned Work"
              id="fullWidth"
              value={plannedWork}
              onChange={(e) => {
                setPlannedWork(e.target.value);
              }}
            />
          </Stack>
          <Button color="primary" variant="outlined" onClick={saveDayPlan}>
            Submit Button
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
