import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
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
      { field: 'id' },
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

export default function BreakingGroupDemo() {
  return (
    <Box height={10000000} width="100%" backgroundColor="#000f1f">
      <Stack alignItems="center" mb={2}>
        <Typography variant="h6" mt={4} gutterBottom>
          Day plan
        </Typography>
      </Stack>

      <DataGrid
        sx={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          color: 'white',
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
  );
}
