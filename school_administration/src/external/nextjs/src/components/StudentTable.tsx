import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Field, Form, Formik } from 'formik';
import { useGetStudents } from 'hooks/useGetStudents';
import React from 'react';
import { Context, MyContext } from '../../pages/_app';
import { useAddStudent } from '../hooks/useAddStudent';
import { useAddStudentStudyGroups } from '../hooks/useAddStudentStudyGroups';
import { useGetStudyGroups } from '../hooks/useGetStudyGroups';
import DataTable from './CustomizeComp/DataTable';

interface MyFormValues {
  studentID: number;
  name: string;
  sex: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: string;
  student_study_groups: [];
}

interface MyStudentData {
  studentID: number;
  name: string;
  sex: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: string;
  student_study_groups: [];
}

const initialValues: MyFormValues = {
  studentID: 0,
  name: '',
  sex: '',
  email: '',
  placeOfBirth: '',
  dateOfBirth: '',
  student_study_groups: [],
};

function StudentTable(): React.ReactElement {
  const useStyles = makeStyles((theme) => ({
    addNewButton: {
      display: 'flex',
      marginBottom: '20px',
      flexDirection: 'row',
    },
    totalStudents: {
      fontSize: '21px',
      marginRight: '20px',
      marginLeft: '10px',
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 550,
      height: 700,
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
  }));

  const { data: studentData } = useGetStudents<MyStudentData>();
  const { data: studyGroups } = useGetStudyGroups();
  console.log('studyGroups', studyGroups);
  const createStudent = useAddStudent();
  const createStudentStudyGroup = useAddStudentStudyGroups();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [studyGroupValues, setStudyGroupValues] = React.useState<any>([]);
  const [dateOfBirthValue, setDateOfBirth] = React.useState();

  const { state } = React.useContext(Context) as MyContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStudyGroupValues([]);
  };

  const handleChecked = (event: any) => {
    setStudyGroupValues([...studyGroupValues, Number(event.target.value)]);
  };

  const handleDateOfBirth = (event: any) => {
    setDateOfBirth(event.target.value);
  };

  const handleAddStudent = async (formValues: MyFormValues) => {
    const studyGroupIDs = studyGroupValues;
    const dateOfBirth = dateOfBirthValue;
    const { studentID, name, sex, email, placeOfBirth }: MyFormValues =
      formValues;

    try {
      await createStudent.mutateAsync({
        studentID,
        name,
        sex,
        email,
        placeOfBirth,
        dateOfBirth,
      });
      setOpen(false);
      setStudyGroupValues([]);
      const newStudentID = studentData?.[studentData?.length - 1]?.studentID;

      await createStudentStudyGroup.mutateAsync({
        newStudentID: newStudentID && newStudentID + 1,
        studyGroupIDs,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.addNewButton}>
        <PersonOutlineIcon />
        <div className={classes.totalStudents}>
          {`${
            studentData?.length === undefined
              ? 'Loading...'
              : studentData?.length
          } Students`}
        </div>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          <AddIcon /> New
        </Button>
      </div>
      <DataTable
        studentData={studentData}
        state={state}
        studyGroups={studyGroups}
      />
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
          <div className={classes.paper}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleAddStudent(values)}
            >
              <Form className={classes.form}>
                <h3>Add New Student</h3>
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
                  placeholder="Enter email address"
                  className={classes.formFeilds}
                />
                <label htmlFor="placeOfBirth">Place Of Birth:</label>
                <Field
                  id="placeOfBirth"
                  name="placeOfBirth"
                  placeholder="Place of birth"
                  className={classes.formFeilds}
                />
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className={classes.formFeilds}
                  onChange={(event: any) => handleDateOfBirth(event)}
                />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {studyGroups?.map((studyGroup: any) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => handleChecked(event)}
                            name="student_study_groups"
                            color="primary"
                            value={studyGroup.groupID}
                          />
                        }
                        label={studyGroup.name}
                      />
                    );
                  })}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    style={{
                      width: '100px',
                    }}
                  >
                    Cancel
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
    </>
  );
}

export default StudentTable;
