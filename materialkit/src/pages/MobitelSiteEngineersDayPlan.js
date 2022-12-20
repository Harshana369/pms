/* eslint-disable */

import * as React from 'react';
import {
  DataGrid,
  gridSortedRowIdsSelector,
  GridToolbarContainer,
  useGridApiContext
} from '@mui/x-data-grid';
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Page from '../components/Page';
import SiteEngineerDayPlanPopup from './SiteEngineerDayPlanPopup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  AllSiteId,
  getSiteEngineerForSiteIdFunction,
  getSiteEngineerForTableData,
  getUniqueSiteEngineerForTableLoad
} from 'src/Redux/Action/DayPlanAction';
import { createSvgIcon } from '@mui/material/utils';
import moment from 'moment';
import DayPlanTableAction from './DayPlanTableAction';
import { GridToolbarColumnsButton } from '@mui/x-data-grid';
import { GridToolbarFilterButton } from '@mui/x-data-grid';
import { GridToolbarDensitySelector } from '@mui/x-data-grid';

function Get_Result_Date(params) {
  if (
    typeof params.row.Result_Date === 'undefined' ||
    params.row.Result_Date === 'Invalid date' ||
    params.row.Result_Date == null ||
    params.row.Result_Date === ''
  ) {
    return '';
  }
  return `${params.row.Result_Date}`;
}

function Set_Result_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Result_Date = dateString;
  return { ...params.row, Result_Date };
}

const rows = [
  {
    id: '001',
    planDate: '2022-12-02',
    sName: 'Test01',
    selectedScope: 'Relevant scope to Test01',
    plannedWork: 'Text',
    Site_Status: 'PAT Submitted',
    Result_Date: '2022-12-02',
    Comment: 'Text'
  },
  {
    id: '002',
    SiteEngineer: 'Dumindu Chamikara',
    createdAt: '2022-12-15T05:47:39.637Z',
    planDate: '2022-12-10',
    plannedWork: 'hhhhh',
    sName: 'KLBEN1',
    selectedScope: '1. Miscellaneous HO Huawei2022',
    updatedAt: '2022-12-15T05:47:39.637Z',
    __v: 0,
    _id: '639ab4fb418df3414472db14'
  }
];

export default function MobitelSiteEngineersDayPlan() {
  const [openPopup, setOpenPopup] = React.useState(false);
  //---------------
  const [siteEName, setSiteENmae] = React.useState();
  const [rowId, setRowId] = React.useState(null);
  const dispatch = useDispatch();
  const SiteEngineerDayPlanDetails = useSelector((state) => state.mobitelSiteEngineerDayPlan);
  const { loading, error, SiteIdData } = SiteEngineerDayPlanDetails;

  const AllTableDetails = useSelector((state) => state.allTableData);
  const {
    SiteEngineerForSitesLoading,
    AllTableData,
    allTableError,
    uniqueTableLoading,
    uniqueTableError
  } = AllTableDetails;

  const columns = [
    { field: 'planDate', headerName: 'Plan Date', width: 150 },
    {
      field: 'sName',
      headerName: 'Site ID',
      width: 150
    },
    {
      field: 'selectedScope',
      headerName: 'Scope',
      width: 250
    },
    {
      field: 'plannedWork',
      headerName: 'Planned work',
      width: 150
    },
    {
      field: 'Site_Status',
      headerName: 'Site Status',
      width: 150,
      type: 'singleSelect',
      editable: true,
      valueOptions: ['PAT Submitted', 'Commissioned', 'installed/Tx Pending', 'Hold']
    },
    {
      field: 'Result_Date',
      headerName: 'Result Date',
      width: 150,
      type: 'date',

      valueGetter: Get_Result_Date,
      valueSetter: Set_Result_Date,
      editable: true
    },
    {
      field: 'Comment',
      headerName: 'Comment',
      width: 150,
      editable: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => <DayPlanTableAction {...{ params, rowId, setRowId }} />
    }
  ];

  const columnGroupingModel = [
    {
      groupId: 'Plan_data',
      headerName: 'Plan',
      headerClassName: 'naming-group-plan',
      children: [
        { field: 'planDate' },
        { field: 'sName' },
        { field: 'selectedScope' },
        { field: 'plannedWork' }
      ]
    },
    {
      groupId: 'Result_data',
      headerName: 'Result',
      headerClassName: 'naming-group-result',
      children: [{ field: 'Site_Status' }, { field: 'Result_Date' }, { field: 'Comment' }]
    }
  ];

  React.useEffect(() => {
    dispatch(getUniqueSiteEngineerForTableLoad(siteEName));
    dispatch(getSiteEngineerForSiteIdFunction(siteEName));
  }, [siteEName, dispatch]);

  React.useEffect(() => {
    dispatch(getSiteEngineerForTableData());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(AllSiteId());
  }, [dispatch]);

  //----------------Site Engineer--------------------

  const defaultProps = {
    options: SiteIdData.allSiteEngineersNames,
    getOptionLabel: (option) => option.Site_Engineer
  };

  const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt'
  );

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

    const buttonBaseProps = {
      color: 'primary',
      size: 'small',
      startIcon: <ExportIcon />
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
        >
          All Database
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <Page title="Site Enginners DayPlan">
        <Stack alignItems="center">
          <Typography variant="h6" gutterBottom>
            Day plan
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          spacing={1}
          mb={2}
        >
          <Button color="primary" variant="outlined" on onClick={() => setOpenPopup(true)}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.2}>
              <AddIcon />
              Add Plan
              {/* </Link> */}
            </Stack>
          </Button>

          {loading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Autocomplete
              sx={{ width: 300, marginTop: 3 }}
              {...defaultProps}
              inputValue={siteEName}
              onChange={(event, newValue) => setSiteENmae(newValue?.siteEName || newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Site Engineers" variant="standard" />
              )}
            />
          )}
        </Stack>

        <Box
          sx={{
            height: 515,
            width: '100%'
          }}
        >
          {uniqueTableLoading ? (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : uniqueTableError ? (
            <Alert severity="error">Just select the Site Engineer name</Alert>
          ) : (
            <DataGrid
              sx={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: 'rgb(198,198,198)',
                '& .naming-group-plan': {
                  backgroundColor: 'rgba(255, 7, 0, 0.55)'
                },
                '& .naming-group-result': {
                  backgroundColor: '#4834d4'
                }
              }}
              rows={AllTableData}
              columns={columns}
              components={{ Toolbar: CustomToolbar }}
              getRowId={(AllTableData) => AllTableData._id}
              experimentalFeatures={{ columnGrouping: true }}
              disableSelectionOnClick
              columnGroupingModel={columnGroupingModel}
              checkboxSelection={false}
              onCellEditCommit={(params) => setRowId(params.id)}
            />
          )}
        </Box>

        <SiteEngineerDayPlanPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          siteEName={siteEName}
        ></SiteEngineerDayPlanPopup>
      </Page>
    </>
  );
}
