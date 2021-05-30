import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AlignItemsStudents from "./BugInfoStudent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100ch",
    backgroundColor: theme.palette.background.paper,
    overflowY: "scroll",
  },
  inline: {
    display: "inline",
  },
}));

export default function StudentBugList({ user, student, existBugs }) {
  const classes = useStyles();
  const [maxHeight, setHeight] = useState(window.innerHeight - 240);
  const [StudentBugs, setStudentsBugs] = useState(student.bugs);
  const [existBugsState, setExistBugsState] = useState(existBugs);
  const [isFirst, setFirst] = useState(true);
  const [isOne, setOne] = useState(true);
  const [maxBug, setMaxBugs] = useState(30);

  useEffect(async () => {
    //    console.log(user);
    //    console.log(student);
    //   console.log(existBugs);
    if (isFirst) {
      setStudentsBugs(student.bugs);
      setFirst(false);
    }
    console.log(student.bugs);
    console.log(StudentBugs);
  });

  const handleDeleteStudentBug = async (Bug) => {
    const data = {
      bugName: Bug.bugName,
      studentEmail: student.email,
      managerEmail: user.email,
    };

    const main = "http://localhost:8092/";
    const addBug = main + "/acs/managers/removeBugFromStudent";
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
            setStudentsBugs(d.bugs);
            console.log("in delete");
            console.log(StudentBugs);
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

  const handleClickStudentsBugs = async (Bug) => {
    const data = {
      bugName: Bug.bugName,
      studentEmail: student.email,
      managerEmail: user.email,
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
            setStudentsBugs(d.bugs);
            console.log(d);
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
    <div style={{ marginLeft: "2%", marginRight: "2%" }}>
      <List className={classes.root} style={{ height: maxHeight + "px" }}>
        <div
          style={{
            display: maxBug > existBugs.length ? "block" : "none",
            color: "green",
          }}
        >
          {existBugsState.map((bug) => (
            <AlignItemsStudents
              user={user}
              student={student}
              studentBugs={StudentBugs}
              Bug={bug}
              onClickDelete={handleDeleteStudentBug}
              onClickAdd={handleClickStudentsBugs}
            ></AlignItemsStudents>
          ))}
          **You can always add bugs by clicking on "BUGS" at the global menu**
        </div>
      </List>
    </div>
  );
}
