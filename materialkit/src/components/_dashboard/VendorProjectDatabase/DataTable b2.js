import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { filter } from 'lodash';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
// ----------------------------------------------------------------------
/* eslint-disable camelcase */

const TABLE_HEAD = [
  {
    id: 'Project_ID',
    alignRight: false,
    label: 'Project ID'
  },
  {
    id: 'Implementation_By',
    alignRight: false,
    label: 'Implemented by'
  },
  {
    id: 'Project',
    alignRight: false,
    label: 'Project'
  },
  {
    id: 'Scope',
    alignRight: false,
    label: 'Scope'
  },
  {
    id: 'HO_Date',
    alignRight: false,
    label: 'HO Date'
  },
  {
    id: 'Site_ID',
    alignRight: false,
    label: 'Site ID'
  },
  {
    id: 'Site_Name',
    alignRight: false,
    label: 'Site Name'
  },
  {
    id: 'New_RAT',
    alignRight: false,
    label: 'New RAT'
  },
  {
    id: 'Site_Engineer',
    alignRight: false,
    label: 'Site Engineers'
  },
  {
    id: 'Sub_Contractor',
    alignRight: false,
    label: 'Sub Contractors'
  },
  {
    id: 'Site_Status',
    alignRight: false,
    label: 'Site Status'
  },
  {
    id: 'Responsible',
    alignRight: false,
    label: 'Responsible'
  },
  {
    id: 'Civil_PAT_Date',
    alignRight: false,
    label: 'Civil PAT Date'
  },
  {
    id: 'SAQ_Clearance_Date',
    alignRight: false,
    label: 'SAQ Clearance Date'
  },
  {
    id: 'Approval_Received_Date',
    alignRight: false,
    label: 'Approval Received Date'
  },
  {
    id: 'MCW_Requested_Date',
    alignRight: false,
    label: 'MCW Requested Date'
  },
  {
    id: 'MCW_Completed_Date',
    alignRight: false,
    label: 'MCW Completed Date'
  },
  {
    id: 'Mobilization_Status',
    alignRight: false,
    label: 'Mobilization Status'
  },
  {
    id: 'Mobilized_Date',
    alignRight: false,
    label: 'Mobilized Date'
  },
  {
    id: 'Installation_Status',
    alignRight: false,
    label: 'Installation Status'
  },
  {
    id: 'Installation_Date',
    alignRight: false,
    label: 'Installation Date'
  },
  {
    id: 'Power_Connected_Date',
    alignRight: false,
    label: 'Power Connected Date'
  },
  {
    id: 'TX_Connected_Date',
    alignRight: false,
    label: 'TX Connected Date'
  },
  {
    id: 'Commissioning_Status',
    alignRight: false,
    label: 'Commisioning Status'
  },
  {
    id: 'Commisioned_Date',
    alignRight: false,
    label: 'Commisioning Date'
  },
  {
    id: 'SAR_Status',
    alignRight: false,
    label: 'SAR Status'
  },
  {
    id: 'SAR_Date',
    alignRight: false,
    label: 'SAR Date'
  },
  {
    id: 'PAT_Status',
    alignRight: false,
    label: 'PAT Status'
  },
  {
    id: 'PAT_Pass_Date',
    alignRight: false,
    label: 'PAT Date'
  },
  {
    id: 'Check_List_Submitted',
    alignRight: false,
    label: 'Check List Submitted'
  },
  {
    id: 'Check_List_Verified',
    alignRight: false,
    label: 'Check List Verified'
  },
  {
    id: 'On_Air_Status',
    alignRight: false,
    label: 'On Air Status'
  },
  {
    id: 'On_Air_Date',
    alignRight: false,
    label: 'On Air Date'
  },
  {
    id: 'PR_Submitted_for_TSS',
    alignRight: false,
    label: 'PR Submitted for TSS'
  },
  {
    id: 'PR_Raised_for_TSS',
    alignRight: false,
    label: 'PR Raised for TSS'
  },
  {
    id: 'TSS_PO_number',
    alignRight: false,
    label: 'TSS PO number'
  },
  {
    id: 'PO_Issued_for_TSS',
    alignRight: false,
    label: 'PO Issued for TSS'
  },
  {
    id: 'TSS_HO',
    alignRight: false,
    label: 'TSS HO'
  },
  {
    id: 'TSSR_Submitted',
    alignRight: false,
    label: 'TSSR Submitted'
  },
  {
    id: 'TSSR_Approved',
    alignRight: false,
    label: 'TSSR Approved'
  },
  {
    id: 'BOQ_Submitted',
    alignRight: false,
    label: 'BOQ Submitted'
  },
  {
    id: 'Imp_HO',
    alignRight: false,
    label: 'Imp HO'
  },
  {
    id: 'PR_Submission_for_Imp',
    alignRight: false,
    label: 'PR Submission for Imp'
  },
  {
    id: 'PR_Number_for_Imp',
    alignRight: false,
    label: 'PR Number for Imp'
  },
  {
    id: 'PR_Raised_for_Imp',
    alignRight: false,
    label: 'PR Raised for Imp'
  },
  {
    id: 'PO_Issued_for_Imp',
    alignRight: false,
    label: 'PO Issued for Imp'
  },
  {
    id: 'PR_Sub_for_supply',
    alignRight: false,
    label: 'PR Sub for supply'
  },
  {
    id: 'PR_Number_for_supply',
    alignRight: false,
    label: 'PR Number for supply'
  },
  {
    id: 'PR_Raised_for_supply',
    alignRight: false,
    label: 'PR Raised for Supply'
  },
  {
    id: 'PO_Issued_for_supply',
    alignRight: false,
    label: 'PO Issued for supply'
  },
  {
    id: 'PI_Submitted',
    alignRight: false,
    label: 'PI Submitted'
  },
  {
    id: 'PI_Number',
    alignRight: false,
    label: 'PI Number'
  },
  {
    id: 'PI_Approved',
    alignRight: false,
    label: 'PI Approved'
  },
  {
    id: 'TRC_Completed',
    alignRight: false,
    label: 'TRC Completed'
  },
  {
    id: 'BOI_Completed',
    alignRight: false,
    label: 'BOI Completed'
  },
  {
    id: 'ICL_Completed',
    alignRight: false,
    label: 'ICL Completed'
  },
  {
    id: 'LC_Issued',
    alignRight: false,
    label: 'LC Issued'
  },
  {
    id: 'Shipped',
    alignRight: false,
    label: 'Shipped'
  },
  {
    id: 'Received_at_port',
    alignRight: false,
    label: 'Received at port'
  },
  {
    id: 'Delivered_to_WH',
    alignRight: false,
    label: 'Delivered to WH'
  },
  {
    id: 'Reconciled',
    alignRight: false,
    label: 'Reconciled'
  },
  {
    id: 'COW_Submitted',
    alignRight: false,
    label: 'COW Submitted'
  },
  {
    id: 'COW_Approved',
    alignRight: false,
    label: 'COW Approved'
  },
  {
    id: 'Supply_HW_PAC_Submitted',
    alignRight: false,
    label: 'Supply HW PAC Sub'
  },
  {
    id: 'Supply_HW_PAC_Approved',
    alignRight: false,
    label: 'Supply HW PAC Approved'
  },
  {
    id: 'Imp_PAC_Submitted',
    alignRight: false,
    label: 'Imp PAC Submitted'
  },
  {
    id: 'Imp_PAC_Approved',
    alignRight: false,
    label: 'Imp PAC Approved'
  },
  {
    id: 'Supply_SW_PAC_Submitted',
    alignRight: false,
    label: 'Supply SW PAC Sub'
  },
  {
    id: 'Supply_SW_PAC_Approved',
    alignRight: false,
    label: 'Supply SW PAC Approved'
  },
  {
    id: 'Capitalization_Supply_HW',
    alignRight: false,
    label: 'Capitalization Supply HW'
  },
  {
    id: 'Capitalization_Imp',
    alignRight: false,
    label: 'Capitalization Imp'
  },
  {
    id: 'Capitalization_Supply_SW',
    alignRight: false,
    label: 'Capitalization Supply SW'
  },
  {
    id: 'Actions',
    alignRight: false,
    label: ''
  }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.Project_ID.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('Project_ID');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios
      .get('http://localhost:8072/vendorProjects')
      .then((result) => {
        setPosts(result.data.existingPosts);
        console.log(result.data.existingPosts);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteUser = async (id) => {
    await axios.delete(`/vendorProjects/delete/${id}`);
    loadUsers();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = posts.map((n) => n.Project_ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Project_ID) => {
    const selectedIndex = selected.indexOf(Project_ID);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Project_ID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

  const filteredUsers = applySortFilter(posts, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    // <Page title="Database | Project Database">
    // <Container>
    <Card sx={{ minWidth: 1080 }}>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={posts.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    Project_ID,
                    Implementation_By,
                    Project,
                    Scope,
                    HO_Date,
                    Site_ID,
                    Site_Name,
                    New_RAT,
                    Site_Engineer,
                    Sub_Contractor,
                    Site_Status,
                    Responsible,
                    Civil_PAT_Date,
                    SAQ_Clearance_Date,
                    Approval_Received_Date,
                    MCW_Requested_Date,
                    MCW_Completed_Date,
                    Mobilization_Status,
                    Mobilized_Date,
                    Installation_Status,
                    Installation_Date,
                    Power_Connected_Date,
                    TX_Connected_Date,
                    Commissioning_Status,
                    Commisioned_Date,
                    SAR_Status,
                    SAR_Date,
                    PAT_Status,
                    PAT_Pass_Date,
                    Check_List_Submitted,
                    Check_List_Verified,
                    On_Air_Status,
                    On_Air_Date,
                    PR_Submitted_for_TSS,
                    PR_Raised_for_TSS,
                    TSS_PO_number,
                    PO_Issued_for_TSS,
                    TSS_HO,
                    TSSR_Submitted,
                    TSSR_Approved,
                    BOQ_Submitted,
                    Imp_HO,
                    PR_Submission_for_Imp,
                    PR_Number_for_Imp,
                    PR_Raised_for_Imp,
                    PO_Issued_for_Imp,
                    PR_Sub_for_supply,
                    PR_Number_for_supply,
                    PR_Raised_for_supply,
                    PO_Issued_for_supply,
                    PI_Submitted,
                    PI_Number,
                    PI_Approved,
                    TRC_Completed,
                    BOI_Completed,
                    ICL_Completed,
                    LC_Issued,
                    Shipped,
                    Received_at_port,
                    Delivered_to_WH,
                    Reconciled,
                    COW_Submitted,
                    COW_Approved,
                    Supply_HW_PAC_Submitted,
                    Supply_HW_PAC_Approved,
                    Imp_PAC_Submitted,
                    Imp_PAC_Approved,
                    Supply_SW_PAC_Submitted,
                    Supply_SW_PAC_Approved,
                    Capitalization_Supply_HW,
                    Capitalization_Imp,
                    Capitalization_Supply_SW,
                    role
                  } = row;
                  const isItemSelected = selected.indexOf(Project_ID) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, Project_ID)}
                        />
                      </TableCell>
                      {/* // -------------------------------------------------------------------------------------------- */}
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle6" noWrap>
                            {Project_ID}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Implementation_By}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Project}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Scope}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {HO_Date}
                        </Typography>
                      </TableCell>
                      {/* // ----------------------------------------------------------------------------------------- */}
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Site_ID}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Site_Name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {New_RAT}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Site_Engineer}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Sub_Contractor}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Site_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Responsible}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Civil_PAT_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {SAQ_Clearance_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Approval_Received_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {MCW_Requested_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {MCW_Completed_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Mobilization_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Mobilized_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Installation_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Installation_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Power_Connected_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {TX_Connected_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Commissioning_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Commisioned_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {SAR_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {SAR_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PAT_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PAT_Pass_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Check_List_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Check_List_Verified}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {On_Air_Status}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {On_Air_Date}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Submitted_for_TSS}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Raised_for_TSS}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {TSS_PO_number}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PO_Issued_for_TSS}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {TSS_HO}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {TSSR_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {TSSR_Approved}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {BOQ_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Imp_HO}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Submission_for_Imp}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Number_for_Imp}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Raised_for_Imp}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PO_Issued_for_Imp}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Sub_for_supply}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Number_for_supply}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PR_Raised_for_supply}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PO_Issued_for_supply}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PI_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PI_Number}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {PI_Approved}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {TRC_Completed}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {BOI_Completed}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {ICL_Completed}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {LC_Issued}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Shipped}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Received_at_port}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Delivered_to_WH}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Reconciled}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {COW_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {COW_Approved}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Supply_HW_PAC_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Supply_HW_PAC_Approved}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Imp_PAC_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Imp_PAC_Approved}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Supply_SW_PAC_Submitted}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Supply_SW_PAC_Approved}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Capitalization_Supply_HW}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Capitalization_Imp}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle5" noWrap>
                          {Capitalization_Supply_SW}
                        </Typography>
                      </TableCell>

                      {/* // ----------------------------------------------------------------------------------------------------- */}
                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                      {/* // ----------------------------------------------------------------------------------------------------- */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
    // </Container>
    // </Page>
  );
}
