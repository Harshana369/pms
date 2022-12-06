import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Page from '../components/Page';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100
  },
  { field: 'Plan_Date', headerName: 'Plan Date', width: 100 },
  {
    field: 'Site_ID',
    headerName: 'Site ID',
    width: 150
  },
  {
    field: 'Scope',
    headerName: 'Scope',
    width: 250
  },
  {
    field: 'Planned_work',
    headerName: 'Planned work',
    width: 150
  },
  {
    field: 'Site_Status',
    headerName: 'Site Status',
    width: 150
  },
  {
    field: 'Result_Date',
    headerName: 'Result Date',
    width: 150
  },
  {
    field: 'Comment',
    headerName: 'Comment',
    width: 150
  }
];

const rows = [
  {
    id: '001',
    Plan_Date: '2022-12-02',
    Site_ID: 'Test01',
    Scope: 'Relevant scope to Test01',
    Planned_work: 'Text',
    Site_Status: 'PAT Submitted',
    Result_Date: '2022-12-02',
    Comment: 'Text'
  }
];

const columnGroupingModel = [
  {
    groupId: 'Plan_data',
    headerName: 'Plan',
    headerClassName: 'naming-group-plan',
    children: [
      { field: 'Plan_Date' },
      { field: 'Site_ID' },
      { field: 'Scope' },
      { field: 'Planned_work' }
    ]
  },
  {
    groupId: 'Result_data',
    headerName: 'Result',
    headerClassName: 'naming-group-result',
    children: [{ field: 'Site_Status' }, { field: 'Result_Date' }, { field: 'Comment' }]
  }
];

export default function MobitelSiteEngineersDayPlan() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const addPlan = (value) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Page title="Mobitel Projects Database | Site Enginners DayPlan">
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
        <Button color="primary" variant="outlined" on onClick={addPlan}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.2}>
            <AddIcon />
            Add Plan
            {/* </Link> */}
          </Stack>
        </Button>{' '}
      </Stack>

      <Box
        sx={{
          height: 515,
          width: '100%'
        }}
      >
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
          rows={rows}
          columns={columns}
          experimentalFeatures={{ columnGrouping: true }}
          disableSelectionOnClick
          columnGroupingModel={columnGroupingModel}
          checkboxSelection={false}
        />
      </Box>

      <Dialog onClose={addPlan} open={open}>
        <DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              <CloseIcon />
            </Button>
          </DialogActions>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </DialogContent>
      </Dialog>
    </Page>
  );
}
