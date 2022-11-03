import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { table } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Grid, Button, Card, Container, Stack, Typography, Link } from '@mui/material';
import trash from '@iconify/icons-eva/trash-2-outline';
import edit from '@iconify/icons-eva/edit-2-outline';
// ----------------------------------------------------------------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 13,
    backgroundColor: theme.palette.info.cardscolour,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: theme.palette.common.white
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.info.testingcolor
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.info.testingcolor
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function OverviewTable1() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axiosInstance.get('/vendorProjectsOverviewTable');
    setPosts(result.data.existingPosts);
  };

  const deleteUser = async (id) => {
    await axiosInstance.delete(`/vendorProjectsOverviewTable/delete/${id}`);
    loadUsers();
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 800 }}
        aria-label="customized table"
        style={{ borderWidth: '0.5px', borderColor: '#3e6fa7', borderStyle: 'solid' }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell>Vendor Name</StyledTableCell>
            <StyledTableCell align="left">Start Date</StyledTableCell>
            <StyledTableCell align="left" style={{ width: '80px' }}>
              Ending Date
            </StyledTableCell>
            <StyledTableCell align="center">Budget (USD M)</StyledTableCell>
            <StyledTableCell align="left">Project Scope</StyledTableCell>
            <StyledTableCell align="left">HO Scope</StyledTableCell>
            <StyledTableCell align="left">PAT Scope</StyledTableCell>
            <StyledTableCell align="left">Completed Scope</StyledTableCell>
            <StyledTableCell align="left">Remaining Scope</StyledTableCell>
            <StyledTableCell align="left">Progress</StyledTableCell>
            <StyledTableCell align="left" />
            <StyledTableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, index) => (
            <StyledTableRow>
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{post.ProjectName}</StyledTableCell>
              <StyledTableCell align="left">{post.Vendor}</StyledTableCell>
              <StyledTableCell align="left">{post.StartDate}</StyledTableCell>
              <StyledTableCell align="left">{post.EndDate}</StyledTableCell>
              <StyledTableCell align="center">{post.Budget}</StyledTableCell>
              <StyledTableCell align="left">{post.ProjectScope}</StyledTableCell>
              <StyledTableCell align="left">{post.HandoverScope}</StyledTableCell>
              <StyledTableCell align="left">{post.PATPass}</StyledTableCell>
              <StyledTableCell align="left">{post.Completed}</StyledTableCell>
              <StyledTableCell align="left">{post.HandoverScope - post.Completed}</StyledTableCell>
              <StyledTableCell align="left">
                {((post.Completed / post.HandoverScope) * 100).toFixed(2)}%
              </StyledTableCell>
              <StyledTableCell style={{ width: '18px', padding: '0px' }}>
                <IconButton
                  aria-label="edit"
                  color="secondary"
                  href={`VendorProjectsOverview/EditDetails/${post._id}`}
                >
                  <BorderColorIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell style={{ width: '18px', padding: '0px' }}>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => {
                    const confirmBox = window.confirm('Do you want to delete this?');
                    if (confirmBox === true) {
                      deleteUser(post._id);
                    }
                  }}
                >
                  <DeleteIcon width={18} height={28} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
