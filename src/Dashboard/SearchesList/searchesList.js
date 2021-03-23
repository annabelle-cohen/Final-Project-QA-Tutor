import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  borders,
  Box,
  ListItemAvatar,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import List1 from "./searchListPage/search";

const ListingSearches = ({
  title,
  searchesList,
  onClickItem,
  onRemoveSearch,
  onRemoveAll,
}) => {
  const classes = useStyles();

  const handleClick = () => onRemoveAll();
  return (
    <div>
      <Typography
        variant="h3"
        gutterBottom
        style={{ fontWeight: "bold", marginLeft: "620px", marginTop: "-50px" }}
      >
        {title}
      </Typography>

      <List disablePadding>
        <Divider></Divider>
        {searchesList.map((search) => (
          <List1
            search={search}
            onClickItem={onClickItem}
            onRemoveSearch={onRemoveSearch}
          ></List1>
        ))}

        <ListItem style={{ padding: "10px 0" }}></ListItem>
        <div
          style={{
            display: searchesList.length == 0 ? "block" : "none",
            height: "100px",
            marginLeft: "595px",
            fontSize: "20px",
            color: "gray",
            fontWeight: "bold",
          }}
        >
          You have nothing in your {title}
        </div>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleClick}
            style={{
              marginLeft: "680px",
            }}
            disabled={searchesList.length == 0 ? true : false}
          >
            Remove all
          </Button>
        </div>
      </List>
    </div>
  );
};

export default ListingSearches;
