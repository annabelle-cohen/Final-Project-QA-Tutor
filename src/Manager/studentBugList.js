import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

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

export default function StudentBugList({ user, student, onClick }) {
  const classes = useStyles();
  const [maxHeight, setHeight] = useState(window.innerHeight - 240);
  const [existedBugs, setBugs] = useState([]);
  const [isOne, setOne] = useState(true);
  const [maxBug, setMaxBugs] = useState(30);

  useEffect(async () => {
    console.log(user);
    console.log(student);

    if (isOne) {
      console.log(user.email);

      const data = {
        email: user.email,
      };

      const main = "http://localhost:8092/";
      const addBug = main + "/acs/managers/getAllBugs";
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
              console.log(d);
              setBugs(d);
            });
          } else {
            response.json().then((x) => {
              console.log(x);
              console.log("errorrrrr");
            });
          }
        },
        (error) => {
          console.log(error);
          console.log("errorrrrr");
        }
      );
      console.log(existedBugs);
      setOne(false);
    }
  });

  return (
    <div style={{ marginLeft: "2%", marginRight: "2%" }}>
      <List className={classes.root} style={{ height: maxHeight + "px" }}>
        <div
          style={{
            display: maxBug > existedBugs.length ? "block" : "none",
            color: "green",
          }}
        >
          **You can always add bugs by clicking on "BUGS" at the global menu**
        </div>
      </List>
    </div>
  );
}
