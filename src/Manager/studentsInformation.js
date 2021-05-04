import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link, Route, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function StudentsGrid({ s, onClick }) {
  const classes = useStyles();
  const handleStudentClick = () => onClick(s);

  return (
    <div className={classes.root}>
      <Grid item xs spacing={3}>
        <Link onClick={handleStudentClick}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: "left" }}>
              Student name: {s.student.firstName} {s.student.lastName}
              <br></br>
              Student email: {s.student.email}
              <br></br>
              Student bugs: {s.bugs.length}
            </div>
          </Paper>
        </Link>
      </Grid>
    </div>
  );
}
