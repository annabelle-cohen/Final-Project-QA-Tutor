import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import classImg from "./img/6663.jpg";
import { Link, Route, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
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

export default function NestedGrid({ c, userName, onClick }) {
  const classes = useStyles();

  const handleClickClass = () => onClick(c);

  return (
    <div className={classes.root}>
      <Grid item xs>
        <Link onClick={handleClickClass}>
          <Paper className={classes.paper}>
            <div>
              <CardMedia
                className={classes.media}
                image={classImg}
                title="Contemplative Reptile"
              />
              <div
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {c.className}
              </div>
              <Divider></Divider>

              <div style={{ textAlign: "left", marginLeft: "10%" }}>
                Tutor: {userName}
                <br></br>
                Number of students: {c.students.length}
              </div>
            </div>
          </Paper>
        </Link>
      </Grid>
    </div>
  );
}
