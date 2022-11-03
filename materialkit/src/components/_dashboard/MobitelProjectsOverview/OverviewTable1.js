import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
  const [overviewData, setoverviewData] = useState([]);
  const [ProjectNames, setProjectNames] = useState([]);
  const [mappedOvervieData, setMappedOvervieData] = useState([]);

  useEffect(() => {
    loadPosts();
    getOverviewData();
    getProjectNamesArray();
    mapOverviewData();
  }, []);

  useEffect(() => {
    mapOverviewData();
  }, [overviewData]);

  const loadPosts = async () => {
    const result = await axiosInstance.get('/mobitelProjectsOverviewTable');
    setPosts(result.data.existingPosts);
  };

  const getOverviewData = async () => {
    const result = await axiosInstance.get('/AutomateMobitelProjectsOverviewTable');
    setoverviewData(result.data.OverviewDataForFrontendOverviewTable);
  };

  const getProjectNamesArray = async () => {
    const result = await axiosInstance.get('/mobitelProjectsOverviewTable/ProjectsArray');
    setProjectNames(result.data.mobitelProjectsNamesArrayToTheExcelUploads);
  };

  const deleteUser = async (id) => {
    await axiosInstance.delete(`/mobitelProjectsOverviewTable/delete/${id}`);
    loadPosts();
  };

  const mapOverviewData = () => {
    const HandoverData = [];
    const PATData = [];
    const OnAirData = [];

    const Projects = ProjectNames;
    // Projects = ['Covid 19 Capacity Update 3', 'Huawei IBBE P1', 'Other Project 2021', 'Other Project 2022']

    for (let i = 0; i < Projects.length; i += 1) {
      HandoverData[i] = parseInt(
        overviewData[0].filter((obj) => obj.Project === Projects[i]).length,
        10
      );
      PATData[i] = parseInt(
        overviewData[1].filter((obj) => obj.Project === Projects[i]).length,
        10
      );
      OnAirData[i] = parseInt(
        overviewData[2].filter((obj) => obj.Project === Projects[i]).length,
        10
      );
    }
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    // console.log(onairData);

    const myarray1 = HandoverData;
    const myarray2 = PATData;
    const myarray3 = OnAirData;

    const chartData = [];

    chartData.push(myarray1, myarray2, myarray3);

    setMappedOvervieData(chartData);
    return chartData;
  };

  const HOScope = mappedOvervieData[0];
  const PATScope = mappedOvervieData[1];
  const CompletedScope = mappedOvervieData[2];

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
            <StyledTableRow key={index + 1}>
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{post.ProjectName}</StyledTableCell>
              <StyledTableCell align="left">{post.Vendor}</StyledTableCell>
              <StyledTableCell align="left">{post.StartDate}</StyledTableCell>
              <StyledTableCell align="left">{post.EndDate}</StyledTableCell>
              <StyledTableCell align="center">{post.Budget}</StyledTableCell>
              <StyledTableCell align="left">{post.ProjectScope}</StyledTableCell>
              <StyledTableCell align="left">{HOScope[index]}</StyledTableCell>
              <StyledTableCell align="left">{PATScope[index]}</StyledTableCell>
              <StyledTableCell align="left">{CompletedScope[index]}</StyledTableCell>
              <StyledTableCell align="left">
                {HOScope[index] - CompletedScope[index]}
              </StyledTableCell>
              <StyledTableCell align="left">
                {((CompletedScope[index] / HOScope[index]) * 100).toFixed(2)}%
              </StyledTableCell>
              <StyledTableCell style={{ width: '18px', padding: '0px' }}>
                <IconButton
                  aria-label="edit"
                  color="secondary"
                  href={`MobitelProjectsOverview/Edit/${post._id}`}
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
