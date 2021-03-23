import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  borders,
  Grid,
  Box,
  ListItemAvatar,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const List1 = ({ search, onClickItem, onRemoveSearch }) => {
  const classes = useStyles();

  const handleItemClick = () => onClickItem(search);
  const handleDeleteClick = () => onRemoveSearch(search);

  return (
    <div>
      <List disablePadding>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary={
              <React.Fragment>
                <Link className={classes.title} onClick={handleItemClick}>
                  {search}
                </Link>
              </React.Fragment>
            }
          ></ListItemText>
          <div style={{ marginRight: "520px" }}>
            <Grid item xs={8}>
              <DeleteIcon
                className={classes.delete}
                onClick={handleDeleteClick}
              />
            </Grid>
          </div>
        </ListItem>
      </List>

      <Divider></Divider>
    </div>
  );
};

export default List1;
