import { Button, FormControlLabel, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { useDeleteeStudent } from 'hooks/useDeleteStudent';
import { useUpdateStudent } from 'hooks/useUpdateStudent';
import PropTypes from 'prop-types';
import React from 'react';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  { id: 'sex', numeric: false, disablePadding: false, label: 'Sex' },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'placeOfBirth',
    numeric: false,
    disablePadding: false,
    label: 'Place Of Birth',
  },
  {
    id: 'dateOfBirth',
    numeric: false,
    disablePadding: false,
    label: 'Date Of Birth',
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Students
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    width: 550,
    height: 720,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '550px',
    gap: '10px',
  },
  formFeilds: {
    width: '100%',
    height: '30px',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function DataTable({ studentData, state, studyGroups }) {
  console.log('studentData', studentData);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [initialValues, setInitialValues] = React.useState({});
  const [valuesToDelete, setValuesToDelete] = React.useState([]);
  const [isRowSelected, setIsRowSelected] = React.useState(false);
  const [studyGroupValues, setStudyGroupValues] = React.useState([]);
  //const [stateValue, setStateValue] = React.useState(state);

  const transformedArray = studentData?.map((student) => {
    const date =
      student.dateOfBirth !== '' ? new Date(student.dateOfBirth) : '';
    const dateOfBirth = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    return {
      ...student,
      ['name']: student.name,
      ['email']: student.email,
      ['sex']: student.sex,
      ['dateOfBirth']: dateOfBirth,
      ['placeOfBirth']: student.placeOfBirth,
      ['studentID']: student.studentID,
      ['studentStudyGroup']: student.student_study_groups.map(
        (value) => value.study_group.name
      ),
    };
  });

  const filteredArray = transformedArray?.filter((value) => {
    if (value.studentStudyGroup.some((s) => state.includes(s))) {
      return { ...value };
    }
  });

  const sendStudentUpdate = useUpdateStudent();
  const deleteStudents = useDeleteeStudent();

  const handleEditOpen = (row) => {
    setInitialValues({
      ...row,
    });
    setSelected(row.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditStudent = async (formValues) => {
    const { name, sex, email, studentID } = formValues;
    await sendStudentUpdate.mutateAsync({ name, sex, email, studentID });
    setOpen(false);
  };

  React.useEffect(() => {
    if (state?.length) {
      setRows(
        transformedArray?.filter((value) => {
          if (value.studentStudyGroup.some((s) => state.includes(s))) {
            return { ...value };
          }
        })
      );
    } else {
      setRows(studentData);
    }
  }, [studentData, state]);

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
    console.log(selectedIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
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

  const handleCheckedValue = (event, row) => {
    const updatedList = [...valuesToDelete];
    if (event.target.checked) {
      updatedList = [...valuesToDelete, event.target.value];
    } else {
      updatedList.splice(valuesToDelete.indexOf(event.target.value), 1);
    }
    setValuesToDelete((prev) => [...prev, row.studentID]);
    if (updatedList.length) {
      setIsRowSelected(true);
    } else {
      setIsRowSelected(false);
    }
  };

  const handleRemoveItem = async () => {
    // const transformedArray = studentData.filter(
    //   ({ name }) => valuesToDelete.indexOf(name) === -1
    // );
    //await transformedArray.forEach((value) =>
    valuesToDelete?.forEach((id) => deleteStudents.mutate(id));
    //);
  };

  const handleChecked = (event) => {
    setStudyGroupValues([...studyGroupValues, Number(event.target.value)]);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          {isRowSelected ? (
            <>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleRemoveItem}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <></>
          )}
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
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
                          checked={isItemSelected}
                          onChange={(event) => handleCheckedValue(event, row)}
                          inputProps={{ 'aria-labelledby': labelId }}
                          value={row.name}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <a
                          href="#"
                          style={{ textDecoration: 'none', color: 'blue' }}
                          onClick={() => handleEditOpen(row)}
                        >
                          {row.name}
                        </a>
                      </TableCell>
                      <TableCell align="left" scope="row" padding="none">
                        {row.sex}
                      </TableCell>
                      <TableCell align="left" scope="row" padding="none">
                        {row.email}
                      </TableCell>
                      <TableCell align="left" scope="row" padding="none">
                        {!row.placeOfBirth ? '- -' : row.placeOfBirth}
                      </TableCell>
                      <TableCell align="left" scope="row" padding="none">
                        {!row.dateOfBirth ? '- -' : row.dateOfBirth}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 35]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleEditStudent(values)}
            >
              <Form className={classes.form}>
                <h3>Edit New Student</h3>
                <label htmlFor="name">Name:</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className={classes.formFeilds}
                />
                <label htmlFor="sex">Sex</label>
                <Field
                  id="sex"
                  name="sex"
                  placeholder="Enter your gender"
                  className={classes.formFeilds}
                />
                <label htmlFor="placeOfBirth">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={classes.formFeilds}
                />
                <label htmlFor="placeOfBirth">Place Of Birth:</label>
                <Field
                  id="placeOfBirth"
                  name="placeOfBirth"
                  placeholder="Enter your place of birth"
                  className={classes.formFeilds}
                />
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value="03/05/2022"
                  className={classes.formFeilds}
                  onChange={(event) => handleDateOfBirth(event)}
                />
                <label>Select study group</label>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {studyGroups?.map((studyGroup) => {
                    const isSelected =
                      initialValues?.student_study_groups?.filter(
                        (g) =>
                          g.study_group.name.toLowerCase() ===
                          studyGroup.name.toLowerCase()
                      )?.length;
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => handleChecked(event)}
                            name="student_study_groups"
                            color="primary"
                            checked={isSelected}
                            value={studyGroup.groupID}
                          />
                        }
                        label={studyGroup.name}
                      />
                    );
                  })}
                </div>

                {/* <Field
                  as="select"
                  id="student_study_groups"
                  name="student_study_groups"
                ></Field> */}

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    style={{
                      width: '100px',
                    }}
                  >
                    Cancle
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      width: '100px',
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
