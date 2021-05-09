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
  const [isOne, setOne] = useState(true);
  const [maxBug, setMaxBugs] = useState(30);

  useEffect(async () => {
    //    console.log(user);
    //    console.log(student);
    //   console.log(existBugs);
  });

  return (
    <div style={{ marginLeft: "2%", marginRight: "2%" }}>
      <List className={classes.root} style={{ height: maxHeight + "px" }}>
        <div
          style={{
            display: maxBug > existBugs.length ? "block" : "none",
            color: "green",
          }}
        >
          {existBugs.map((bug) => (
            <AlignItemsStudents
              user={user}
              student={student}
              Bug={bug}
            ></AlignItemsStudents>
          ))}
          **You can always add bugs by clicking on "BUGS" at the global menu**
        </div>
      </List>
    </div>
  );
}
