import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
      <TextField
        size="small"
        placeholder="Search ..."
        type="text"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Stack>
  );
};
