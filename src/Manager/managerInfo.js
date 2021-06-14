import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tutor from "./img/pinguinTeach.png";
import { domainUrl } from "../requests";

const useStyles = makeStyles({
  root: {
    maxWidth: 420,
  },
  media: {
    height: 230,
  },
});

export default function MediaCardInfo({ user, classList, studentsList }) {
  const [bugs, setBugs] = useState([]);
  const classes = useStyles();
  const [isOne, setOne] = useState(true);

  useEffect(() => {
    if (isOne) {
      var data = {
        email: user.email,
      };
      //    console.log("in user effect");
      const dataJson = JSON.stringify(data);

      fetch(domainUrl+"/acs/managers/getAllBugs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: dataJson,
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const bugs = d;
              //  console.log(bugs);
              setBugs(bugs);
            });
          } else {
            // console.log("Error:", response);
            //console.log("failed");
            response.json().then((d) => {
              //  console.log("Errordata", d);
              //   console.log("failed");
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error.data);
        });
      setOne(false);
    }
  });

  return (
    <Card className={classes.root}>
      <CardActionArea disabled={true}>
        <CardMedia
          className={classes.media}
          image={Tutor}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            component="h2"
            style={{ textAlign: "center", fontSize: "25px" }}
          >
            Hi!&nbsp;{user.username}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: "16px" }}
          >
            Email:{user.email}
            <br></br>
            Number of Classes:{classList.length}
            <br></br>
            Number Of Students:{studentsList.length}
            <br></br>
            Rule:Tutor
            <br></br>
            Number of Bugs exits:{bugs.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
