import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlertDialog() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProperty = async (id) => {
    try {
      const res = await axiosInstance.delete(
        `http://localhost:8072/vendorProjectsOverviewTable/delete/${id}`,
        id
      );
      if (res.data.success) {
        alert('Successfully Deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <IconButton aria-label="delete" color="primary" onClick={handleClickOpen}>
        <DeleteIcon width={18} height={28} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteProperty}>Confirm Delete</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
