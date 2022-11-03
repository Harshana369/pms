import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

// -----------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------
/* eslint-disable camelcase */

function createData(
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
  Capitalization_Supply_SW
) {
  return {
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
    Capitalization_Supply_SW
  };
}

const rows = [
  createData('A', 305, 3.7, 67, 4.3, 305, 3.7, 67, 4.3),
  createData('B', 452, 25.0, 51, 4.9, 452, 25.0, 51, 4.9),
  createData('C', 262, 16.0, 24, 6.0, 452, 25.0, 51, 4.9)
];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'Project_ID',
    numeric: false,
    disablePadding: true,
    label: 'Project ID'
  },
  {
    id: 'Implementation_By',
    numeric: true,
    disablePadding: false,
    label: 'Implemented by'
  },
  {
    id: 'Project',
    numeric: true,
    disablePadding: false,
    label: 'Project'
  },
  {
    id: 'Scope',
    numeric: true,
    disablePadding: false,
    label: 'Scope'
  },
  {
    id: 'HO_Date',
    numeric: true,
    disablePadding: false,
    label: 'HO Date'
  },
  {
    id: 'Site_ID',
    numeric: true,
    disablePadding: false,
    label: 'Site ID'
  },
  {
    id: 'Site_Name',
    numeric: true,
    disablePadding: false,
    label: 'Site Name'
  },
  {
    id: 'New_RAT',
    numeric: true,
    disablePadding: false,
    label: 'New RAT'
  },
  {
    id: 'Site_Engineer',
    numeric: true,
    disablePadding: false,
    label: 'Site Engineers'
  },
  {
    id: 'Sub_Contractor',
    numeric: true,
    disablePadding: false,
    label: 'Sub Contractors'
  },
  {
    id: 'Site_Status',
    numeric: true,
    disablePadding: false,
    label: 'Site Status'
  },
  {
    id: 'Responsible',
    numeric: true,
    disablePadding: false,
    label: 'Responsible'
  },
  {
    id: 'Civil_PAT_Date',
    numeric: true,
    disablePadding: false,
    label: 'Civil PAT Date'
  },
  {
    id: 'SAQ_Clearance_Date',
    numeric: true,
    disablePadding: false,
    label: 'SAQ Clearance Date'
  },
  {
    id: 'Approval_Received_Date',
    numeric: true,
    disablePadding: false,
    label: 'Approval Received Date'
  },
  {
    id: 'MCW_Requested_Date',
    numeric: true,
    disablePadding: false,
    label: 'MCW Requested Date'
  },
  {
    id: 'MCW_Completed_Date',
    numeric: true,
    disablePadding: false,
    label: 'MCW Completed Date'
  },
  {
    id: 'Mobilization_Status',
    numeric: true,
    disablePadding: false,
    label: 'Mobilization Status'
  },
  {
    id: 'Mobilized_Date',
    numeric: true,
    disablePadding: false,
    label: 'Mobilized Date'
  },
  {
    id: 'Installation_Status',
    numeric: true,
    disablePadding: false,
    label: 'Installation Status'
  },
  {
    id: 'Installation_Date',
    numeric: true,
    disablePadding: false,
    label: 'Installation Date'
  },
  {
    id: 'Power_Connected_Date',
    numeric: true,
    disablePadding: false,
    label: 'Power Connected Date'
  },
  {
    id: 'TX_Connected_Date',
    numeric: true,
    disablePadding: false,
    label: 'TX Connected Date'
  },
  {
    id: 'Commissioning_Status',
    numeric: true,
    disablePadding: false,
    label: 'Commisioning Status'
  },
  {
    id: 'Commisioned_Date',
    numeric: true,
    disablePadding: false,
    label: 'Commisioning Date'
  },
  {
    id: 'SAR_Status',
    numeric: true,
    disablePadding: false,
    label: 'SAR Status'
  },
  {
    id: 'SAR_Date',
    numeric: true,
    disablePadding: false,
    label: 'SAR Date'
  },
  {
    id: 'PAT_Status',
    numeric: true,
    disablePadding: false,
    label: 'PAT Status'
  },
  {
    id: 'PAT_Pass_Date',
    numeric: true,
    disablePadding: false,
    label: 'PAT Date'
  },
  {
    id: 'Check_List_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'Check List Submitted'
  },
  {
    id: 'Check_List_Verified',
    numeric: true,
    disablePadding: false,
    label: 'Check List Verified'
  },
  {
    id: 'On_Air_Status',
    numeric: true,
    disablePadding: false,
    label: 'On Air Status'
  },
  {
    id: 'On_Air_Date',
    numeric: true,
    disablePadding: false,
    label: 'On Air Date'
  },
  {
    id: 'PR_Submitted_for_TSS',
    numeric: true,
    disablePadding: false,
    label: 'PR Submitted for TSS'
  },
  {
    id: 'PR_Raised_for_TSS',
    numeric: true,
    disablePadding: false,
    label: 'PR Raised for TSS'
  },
  {
    id: 'TSS_PO_number',
    numeric: true,
    disablePadding: false,
    label: 'TSS PO number'
  },
  {
    id: 'PO_Issued_for_TSS',
    numeric: true,
    disablePadding: false,
    label: 'PO Issued for TSS'
  },
  {
    id: 'TSS_HO',
    numeric: true,
    disablePadding: false,
    label: 'TSS HO'
  },
  {
    id: 'TSSR_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'TSSR Submitted'
  },
  {
    id: 'TSSR_Approved',
    numeric: true,
    disablePadding: false,
    label: 'TSSR Approved'
  },
  {
    id: 'BOQ_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'BOQ Submitted'
  },
  {
    id: 'Imp_HO',
    numeric: true,
    disablePadding: false,
    label: 'Imp HO'
  },
  {
    id: 'PR_Submission_for_Imp',
    numeric: true,
    disablePadding: false,
    label: 'PR Submission for Imp'
  },
  {
    id: 'PR_Number_for_Imp',
    numeric: true,
    disablePadding: false,
    label: 'PR Number for Imp'
  },
  {
    id: 'PR_Raised_for_Imp',
    numeric: true,
    disablePadding: false,
    label: 'PR Raised for Imp'
  },
  {
    id: 'PO_Issued_for_Imp',
    numeric: true,
    disablePadding: false,
    label: 'PO Issued for Imp'
  },
  {
    id: 'PR_Sub_for_supply',
    numeric: true,
    disablePadding: false,
    label: 'PR Sub for supply'
  },
  {
    id: 'PR_Number_for_supply',
    numeric: true,
    disablePadding: false,
    label: 'PR Number for supply'
  },
  {
    id: 'PR_Raised_for_supply',
    numeric: true,
    disablePadding: false,
    label: 'PR Raised for Supply'
  },
  {
    id: 'PO_Issued_for_supply',
    numeric: true,
    disablePadding: false,
    label: 'PO Issued for supply'
  },
  {
    id: 'PI_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'PI Submitted'
  },
  {
    id: 'PI_Number',
    numeric: true,
    disablePadding: false,
    label: 'PI Number'
  },
  {
    id: 'PI_Approved',
    numeric: true,
    disablePadding: false,
    label: 'PI Approved'
  },
  {
    id: 'TRC_Completed',
    numeric: true,
    disablePadding: false,
    label: 'TRC Completed'
  },
  {
    id: 'BOI_Completed',
    numeric: true,
    disablePadding: false,
    label: 'BOI Completed'
  },
  {
    id: 'ICL_Completed',
    numeric: true,
    disablePadding: false,
    label: 'ICL Completed'
  },
  {
    id: 'LC_Issued',
    numeric: true,
    disablePadding: false,
    label: 'LC Issued'
  },
  {
    id: 'Shipped',
    numeric: true,
    disablePadding: false,
    label: 'Shipped'
  },
  {
    id: 'Received_at_port',
    numeric: true,
    disablePadding: false,
    label: 'Received at port'
  },
  {
    id: 'Delivered_to_WH',
    numeric: true,
    disablePadding: false,
    label: 'Delivered to WH'
  },
  {
    id: 'Reconciled',
    numeric: true,
    disablePadding: false,
    label: 'Reconciled'
  },
  {
    id: 'COW_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'COW Submitted'
  },
  {
    id: 'COW_Approved',
    numeric: true,
    disablePadding: false,
    label: 'COW Approved'
  },
  {
    id: 'Supply_HW_PAC_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'Supply HW PAC Sub'
  },
  {
    id: 'Supply_HW_PAC_Approved',
    numeric: true,
    disablePadding: false,
    label: 'Supply HW PAC Approved'
  },
  {
    id: 'Imp_PAC_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'Imp PAC Submitted'
  },
  {
    id: 'Imp_PAC_Approved',
    numeric: true,
    disablePadding: false,
    label: 'Imp PAC Approved'
  },
  {
    id: 'Supply_SW_PAC_Submitted',
    numeric: true,
    disablePadding: false,
    label: 'Supply SW PAC Sub'
  },
  {
    id: 'Supply_SW_PAC_Approved',
    numeric: true,
    disablePadding: false,
    label: 'Supply SW PAC Approved'
  },
  {
    id: 'Capitalization_Supply_HW',
    numeric: true,
    disablePadding: false,
    label: 'Capitalization Supply HW'
  },
  {
    id: 'Capitalization_Imp',
    numeric: true,
    disablePadding: false,
    label: 'Capitalization Imp'
  },
  {
    id: 'Capitalization_Supply_SW',
    numeric: true,
    disablePadding: false,
    label: 'Capitalization Supply SW'
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ padding: '0px' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ width: '200px' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Database Table
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 1 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={72} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch size="small" checked={dense} onChange={handleChangeDense} />}
        label="Compact View"
      />
    </Box>
  );
}
