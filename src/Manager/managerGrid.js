import React, { useState, useEffect } from "react";
import { Link, Route, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import NestedGrid from "./managerClassInfo";
import StudentsGrid from "./studentsInformation";
import StudentBugList from "./studentBugList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 230,
    width: "100%",
  },
}));

export default function AutoGrid(user, classList, studentsList) {
  const [isClicked, setClicked] = useState(false);
  const [isStudentClicked, setStudentClicked] = useState(false);
  const [classChosen, setClassChosen] = useState(user.classList[0]);
  const [studentChosen, setStudentChosen] = useState(classChosen.students[0]);
  const classes = useStyles();

  useEffect(() => {
    console.log(user);
  });
  const handleClickClass = (c) => {
    if (isClicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
    console.log(c);
    setClassChosen(c);
  };

  const handleStudentClick = (s) => {
    if (isStudentClicked) {
      setStudentClicked(false);
    } else {
      setStudentClicked(true);
    }
    console.log(s);
    setStudentChosen(s);
  };

  const handleClick = async (bug) => {
    console.log(bug);
    const data = {
      bugName: bug.bugName,
      studentEmail: studentChosen.student.email,
      managerEmail: user.user.email,
    };

    const main = "http://localhost:8092/";
    const addBug = main + "/acs/managers/addBugToStudent";
    const dataJson = JSON.stringify(data);

    await fetch(addBug, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const bug = d;
            console.log(bug);
          });
        } else {
          response.json().then((x) => {
            console.log(x);
          });
        }
      },
      (error) => {}
    );
  };

  return (
    <div className={classes.root}>
      <div style={{ display: isClicked ? "none" : "block" }}>
        <Grid container spacing={3}>
          {user.classList.map((c) => (
            <NestedGrid
              c={c}
              userName={user.user.username}
              onClick={handleClickClass}
            ></NestedGrid>
          ))}
        </Grid>
      </div>
      <div style={{ display: isClicked ? "block" : "none" }}>
        <div
          className={classes.root}
          style={{ display: isStudentClicked ? "none" : "block" }}
        >
          <Paper className={classes.paper}>
            {" "}
            <div
              style={{ color: "black", fontWeight: "bold", padding: "10px" }}
            >
              {classChosen.className}
            </div>
            <Grid container spacing={3}>
              {classChosen.students.map((s) => (
                <StudentsGrid s={s} onClick={handleStudentClick}></StudentsGrid>
              ))}

              <div
                style={{
                  display: classChosen.students.length <= 0 ? "block" : "none",
                  textAlign: "left",
                }}
              >
                Oops!...there is no students in this class
                <br></br>
                Please contact our technical support center
              </div>
            </Grid>
          </Paper>
        </div>

        <div
          style={{
            display: isStudentClicked ? "block" : "none",
          }}
        >
          <Paper
            className={classes.paper}
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "22px",
              width: "1200px",
              marginLeft: "7%",
            }}
          >
            You're watching {studentChosen.student.firstName}{" "}
            {studentChosen.student.lastName}
            <Divider></Divider>
            <StudentBugList
              user={user.user}
              student={studentChosen}
              onClick={handleClick}
            ></StudentBugList>
          </Paper>
        </div>
      </div>
    </div>
  );
}
