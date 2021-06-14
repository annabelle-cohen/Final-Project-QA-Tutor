import React, { useState, useEffect } from "react";
import { Link, Route, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import NestedGrid from "./managerClassInfo";
import StudentsGrid from "./studentsInformation";
import StudentBugList from "./studentBugList";
import { domainUrl } from "../requests";

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

export default function AutoGrid(
  user,
  classList,
  studentsList,
  existBugs,
  studentChosen,
) {
  const [isClicked, setClicked] = useState(false);
  const [isStudentClicked, setStudentClicked] = useState(false);
  const [classListNow, setClassList] = useState(user.classList);
  const [classChosen, setClassChosen] = useState(
    user.classList.length <= 0 ? 0 : user.classList[0]
  );
  const [studentName, setStudentName] = useState("");
  const [studentTemp, setTemp] = useState({ bugs: [], email: "defulat", managerEmail: user.email })
  const [studentClicked, setStudentClick] = useState(user.classList.length <= 0 ? user.studentChosen : user.classList[0].students[0]);
  const [isFirst, setFirst] = useState(true);
  const [isReady, setReady] = useState(false);
  const classes = useStyles();

  useEffect(async () => {
    console.log(user);
    if (studentTemp.email === studentClicked.email) {
      setReady(true);
      console.log(studentTemp.email)
      console.log(studentClicked.email)
      console.log("in if of use effect temp")
    } else {
      console.log(studentTemp.email)
      console.log(studentClicked.email)
      setReady(false)
      console.log("not in if of use effect temp")
    }
    if (isFirst) {
      const data = {
        manager: user.user.email,
      };

      const addBug = domainUrl + "/acs/classes/getAllClasses";
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
              setClassList(d);
            });
          } else {
            response.json().then((x) => {
              console.log(x);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
      setFirst(false);
    }
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

  const handleStudentClick = async (s) => {
    console.log(s);
    setReady(false);
    if (isStudentClicked) {
      setStudentClicked(false);
    } else {

      setStudentClick(s);
      setTemp(s);
      setStudentName(s.student.firstName + " " + s.student.lastName);
      setStudentClicked(true);


    }
  };


  return (
    <div className={classes.root}>
      <div style={{ display: isClicked ? "none" : "block" }}>
        <Grid container spacing={3}>
          {classListNow.map((c) => (
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
              {classChosen.students.length <= 0
                ? ""
                : classChosen.students.map((s) => (
                  <StudentsGrid
                    s={s}
                    onClick={handleStudentClick}
                  ></StudentsGrid>
                ))}

              <div
                style={{
                  display: classChosen.students.length <= 0 ? "block" : "none",
                  textAlign: "left",
                  marginLeft: "40%",
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
            display:
              isStudentClicked && user.studentsList.length > 0
                ? "block"
                : "none",
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
            You're watching {studentName}
            {studentChosen}
            <Divider></Divider>
            {user.studentsList.length <= 0 ? (
              ""
            ) : (
              isReady ? <StudentBugList
                user={user.user}
                student={studentClicked}
                existBugs={user.existBugs}
              ></StudentBugList> : ""

            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
