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
import useStyles from "./styles";
import { Link } from "react-router-dom";
import List1 from "./list/list";

const Listing = ({
  choice,
  token,
  onClickItem,
  onRemoveProduct,
  onRemoveAll,
}) => {
  const classes = useStyles();

  const handleClick = () => onRemoveAll();

  return (
    <div>
      <Typography
        variant="h3"
        gutterBottom
        style={{ fontWeight: "bold", marginLeft: "660px", marginTop: "-50px" }}
      >
        {choice}
      </Typography>
      <List disablePadding>
        <Divider></Divider>
        {token.map((product) => (
          <List1
            product={product}
            onClickItem={onClickItem}
            onRemoveProduct={onRemoveProduct}
          ></List1>
        ))}
        <ListItem style={{ padding: "10px 0" }}></ListItem>
        <div
          style={{
            display: token.length == 0 ? "block" : "none",
            height: "100px",
            marginLeft: "595px",
            fontSize: "20px",
            color: "gray",
            fontWeight: "bold",
          }}
        >
          You have nothing in your {choice}
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
            disabled={token.length == 0 ? true : false}
          >
            Remove all
          </Button>
        </div>
      </List>
    </div>
  );
};

export default Listing;
