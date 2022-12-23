import React from 'react';
import {
  Alert,
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
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker, LocalizationProvider } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useSelector } from 'react-redux';

/* eslint-disable */

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default function SiteEngineerDayPlanPopup(props) {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  const [selectedId, setSelectedId] = React.useState();
  const [selectedScope, setSelectedScope] = React.useState();
  const [scope, setScope] = React.useState([null]);
  const [planDate, setPlanDate] = React.useState(currentDate);
  const [plannedWork, setPlannedWork] = React.useState();
  const [allSiteData, setAllSiteData] = React.useState([{}]);
  const [error, setError] = React.useState(false);

  const { openPopup, setOpenPopup, siteEName } = props;

  const SiteEngineerForDetails = useSelector((state) => state.SiteEngineerForAllSite);
  const { SiteEngineerForSitesLoading, SiteEngineerForSitesError, SiteEngineerForSites } =
    SiteEngineerForDetails;

  const getSiteData = async () => {
    try {
      const { data } = await axiosInstance.get('/getAllSiteData');
      setAllSiteData(data.allSiteData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowClick = () => {
    const selectedSiteId = selectedId;
    const reformattedArray = allSiteData.map(({ Site_ID, Scope }) => ({
      Site_ID,
      Scope
    }));
    var newArray = reformattedArray.filter(function (el) {
      return el.Site_ID === selectedSiteId;
    });
    const Data = newArray.map((object) => object.Scope);
    let Temp = [...new Set(Data)];
    setScope(Temp);
    // return Temp;
  };

  //----------------Site ID--------------------

  React.useEffect(() => {
    handleRowClick();
  }, [selectedId]);

  React.useEffect(() => {
    getSiteData();
  }, []);

  const clearallSate = () => {
    setPlanDate('');
    setSelectedId('');
    setSelectedScope('');
    setPlannedWork('');
  };

  const filterFunction = () => {
    if (
      siteEName === '' ||
      planDate === '' ||
      selectedId === '' ||
      selectedScope === '' ||
      plannedWork === ''
    ) {
      setError(true);
    } else {
      saveDayPlan();
    }
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
        { siteEName, planDate, selectedId, selectedScope, plannedWork },
        config
      );

      setError(false);
    } catch (error) {
      console.log(error);
    }

    setOpenPopup(false);
    clearallSate();
  }

  const handleChangeScope = (event) => {
    setSelectedScope(event.target.value);
  };

  const handleChangePlanWork = (event) => {
    setPlannedWork(event.target.value);
  };

  const setDate = (e) => {
    setPlanDate(`${e.$y}-${e.$M + 1}-${e.$D}`);
  };

  const plan = ['plan one', 'plan two', 'plan three'];

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
                setError(false);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>

        {error === true ? <Alert severity="error">Please enter all the fields</Alert> : ''}

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
                value={planDate}
                InputLabel={planDate}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {SiteEngineerForSitesLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : SiteEngineerForSitesError ? (
              <Alert severity="error">Just select the Site Engineer name</Alert>
            ) : (
              <Autocomplete
                freeSolo
                sx={{ width: 300 }}
                id="free-solo-2-demo"
                disableClearable
                options={SiteEngineerForSites.map((option) => option.Site_ID)}
                onChange={(event, newValue) => setSelectedId(newValue?.selectedId || newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Site Id"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search'
                    }}
                  />
                )}
              />
            )}
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
                onChange={handleChangeScope}
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
            <FormControl sx={{ width: 500 }}>
              <InputLabel id="demo-simple-select-label">Plan Work</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={plannedWork}
                label="Plan Work"
                onChange={handleChangePlanWork}
              >
                {plan.map((el) => (
                  <MenuItem value={el} key={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Button color="primary" variant="outlined" onClick={filterFunction}>
            Submit Button
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
