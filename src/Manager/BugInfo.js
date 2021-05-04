import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Divider, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    marginLeft: "-28px",
    top: -10,
  },
  Avatar: {
    marginLeft: "10px",
    marginTop: "35px",
  },
  Text: {
    marginTop: "25px",
    fontSize: "22px",
  },
  BugButton: {
    marginTop: "80px",
  },
}));

export default function AlignItems({ user, Bug, existBugs, onClick }) {
  const classes = useStyles();

  const handleClick = () => onClick(Bug);

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar className={classes.Avatar}>
          <Avatar
            alt="Remy Sharp"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00OTcuMjI5LDI2MC45MjVoLTg4LjYxNXYtMzAuNzA4YzQ0LjU4NC03LjEwMiw3OC43NjktNDUuODE2LDc4Ljc2OS05Mi4zNjh2LTE5LjY5MmMwLTguMTU2LTYuNjEzLTE0Ljc2OS0xNC43NjktMTQuNzY5DQoJCQlzLTE0Ljc2OSw2LjYxMy0xNC43NjksMTQuNzY5djE5LjY5MmMwLDMwLjIwNi0yMS4wNCw1NS41NzMtNDkuMjMsNjIuMjYxdi0xMy4wM2MwLTEzLjU3My0xMS4wNDItMjQuNjE1LTI0LjYxNS0yNC42MTVIMzY5LjIzDQoJCQl2LTU0LjE1M2MwLTMxLjA2Ni0yMi4yNTQtNTcuMDI0LTUxLjY1Ni02Mi43OTNsMTAuOTk4LTI0Ljc0NmMzLjMxMy03LjQ1My0wLjA0NC0xNi4xODItNy40OTgtMTkuNDk0DQoJCQljLTcuNDU1LTMuMzE0LTE2LjE4MiwwLjA0NC0xOS40OTQsNy40OThsLTE1Ljc5NCwzNS41MzZoLTU5LjU3M0wyMTAuNDIsOC43NzVjLTMuMzEyLTcuNDUzLTEyLjA0MS0xMC44MTEtMTkuNDk0LTcuNDk4DQoJCQljLTcuNDUzLDMuMzEyLTEwLjgxLDEyLjA0MS03LjQ5OCwxOS40OTRsMTAuOTk4LDI0Ljc0NmMtMjkuNDAxLDUuNzctNTEuNjU1LDMxLjcyNi01MS42NTUsNjIuNzkzdjU0LjE1M2gtMTQuNzY5DQoJCQljLTEzLjU3MywwLTI0LjYxNSwxMS4wNDItMjQuNjE1LDI0LjYxNXYxMy4wM2MtMjguMTktNi42ODctNDkuMjMtMzIuMDU1LTQ5LjIzLTYyLjI2MXYtMTkuNjkyDQoJCQljMC04LjE1Ni02LjYxMy0xNC43NjktMTQuNzY5LTE0Ljc2OXMtMTQuNzY5LDYuNjEzLTE0Ljc2OSwxNC43Njl2MTkuNjkyYzAsNDYuNTUyLDM0LjE4NSw4NS4yNjUsNzguNzY5LDkyLjM2OHYzMC43MDhIMTQuNzcxDQoJCQljLTguMTU2LDAtMTQuNzY5LDYuNjEzLTE0Ljc2OSwxNC43NjlzNi42MTMsMTQuNzY5LDE0Ljc2OSwxNC43NjloODguNjE1djMwLjcwOGMtNDQuNTg0LDcuMTAyLTc4Ljc2OSw0NS44MTYtNzguNzY5LDkyLjM2OA0KCQkJdjE5LjY5MmMwLDguMTU2LDYuNjEzLDE0Ljc2OSwxNC43NjksMTQuNzY5czE0Ljc2OS02LjYxMywxNC43NjktMTQuNzY5di0xOS42OTJjMC0zMC4yMDYsMjEuMDQtNTUuNTczLDQ5LjIzLTYyLjI2MXY4LjEwNw0KCQkJQzEwMy4zODYsNDQzLjUzNywxNzEuODQ5LDUxMiwyNTYsNTEyczE1Mi42MTQtNjguNDYzLDE1Mi42MTQtMTUyLjYxNHYtOC4xMDdjMjguMTksNi42ODgsNDkuMjMsMzIuMDU1LDQ5LjIzLDYyLjI2MXYxOS42OTINCgkJCWMwLDguMTU2LDYuNjEzLDE0Ljc2OSwxNC43NjksMTQuNzY5czE0Ljc2OS02LjYxMywxNC43NjktMTQuNzY5di0xOS42OTJjMC00Ni41NTItMzQuMTg1LTg1LjI2NS03OC43NjktOTIuMzY4di0zMC43MDhoODguNjE1DQoJCQljOC4xNTYsMCwxNC43NjktNi42MTMsMTQuNzY5LTE0Ljc2OVM1MDUuMzg1LDI2MC45MjUsNDk3LjIyOSwyNjAuOTI1eiBNMTcyLjMwOCwxMDguMzExYzAtMTkuMDAyLDE1LjQ1OS0zNC40NjEsMzQuNDYxLTM0LjQ2MQ0KCQkJaDk4LjQ2MWMxOS4wMDIsMCwzNC40NjEsMTUuNDU5LDM0LjQ2MSwzNC40NjF2NTQuMTUzSDE3Mi4zMDhWMTA4LjMxMXogTTM3OS4wNzYsMzU5LjM4NmMwLDY3Ljg2NC01NS4yMTIsMTIzLjA3Ni0xMjMuMDc2LDEyMy4wNzYNCgkJCVMxMzIuOTI0LDQyNy4yNSwxMzIuOTI0LDM1OS4zODZWMTkyLjAwM2gxMDguMzA3djE0Mi43NjhjMCw4LjE1Niw2LjYxMywxNC43NjksMTQuNzY5LDE0Ljc2OXMxNC43NjktNi42MTMsMTQuNzY5LTE0Ljc2OVYxOTIuMDAzDQoJCQloMTA4LjMwN1YzNTkuMzg2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
          />
        </ListItemAvatar>

        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body1"
                className={classes.Text}
                color="textPrimary"
              >
                {Bug.bugName}
              </Typography>
            </React.Fragment>
          }
          className={classes.Text}
          secondary={
            <React.Fragment>
              <div style={{ marginTop: "-22px" }}>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {"Description: "}
                </Typography>
                {Bug.description}
              </div>
            </React.Fragment>
          }
        />

        <div>
          <Button
            className={classes.BugButton}
            onClick={handleClick}
            size="large"
            type="button"
            variant="outlined"
            color="primary"
            style={{ display: Bug.isAdd ? "none" : "block" }}
          >
            Add Bug!
          </Button>
        </div>

        <div
          style={{
            display: Bug.isAdd ? "block" : "none",
            color: "green",
            fontSize: "22px",
            marginTop: "80px",
            marginRight: "80px",
          }}
        >
          Exist
        </div>
      </ListItem>

      <Divider></Divider>
    </div>
  );
}
