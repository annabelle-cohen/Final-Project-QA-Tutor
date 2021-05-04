import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import classImg from "./img/6663.jpg";

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

export default function AutoGrid(user) {
  const classes = useStyles();

  useEffect(() => {
    console.log(user);
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {user.classList.map((c) => (
          <Grid item xs>
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
                  Tutor: {user.user.username}
                  <br></br>
                  Number of students: {c.students.length}
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
