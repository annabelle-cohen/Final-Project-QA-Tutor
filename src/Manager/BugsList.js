import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AlignItems from "./BugInfo";

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

export default function AlignItemsList({ user, Bugs, existBugs, onClick }) {
  const classes = useStyles();
  const [maxHeight, setHeight] = useState(window.innerHeight - 150);

  return (
    <div style={{ marginLeft: "23%" }}>
      {console.log(existBugs)}
      <List className={classes.root} style={{ height: maxHeight + "px" }}>
        {Bugs.map((bug) => (
          <AlignItems
            user={user}
            Bug={bug}
            existBugs={existBugs}
            onClick={onClick}
          ></AlignItems>
        ))}
      </List>
    </div>
  );
}
