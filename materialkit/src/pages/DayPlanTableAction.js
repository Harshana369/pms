import { Button } from '@mui/material';
import React from 'react';

export default function DayPlanTableAction({ params, rowId, setRowId }) {
  const UpAction = () => {
    console.log(params);
    console.log(rowId);
    console.log(setRowId);
  };
  return <Button onClick={UpAction}>Update</Button>;
}
