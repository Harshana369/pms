import { Check, Save } from '@mui/icons-material';
import { Box, Button, CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function DayPlanTableAction({ params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const handleSubmit = async () => {
    setLoading(true);

    const result = await axiosInstance.put('/SiteEngineerDayPlan/Edit', params.row);
    await axiosInstance.put('/mobitelDatabase/Scope/Edit', params.row);
    // console.log(resultScope);

    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative'
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] }
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
          }}
        />
      )}
    </Box>
  );
}
