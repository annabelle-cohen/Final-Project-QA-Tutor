import React from "react";
import { Typography, List, ListItem, Divider } from "@material-ui/core";
import useStyles from "./styles";
import OrderList from "./Order/Order";

const HistoryList = ({ token, onItemClick }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="h3"
        gutterBottom
        style={{ fontWeight: "bold", marginLeft: "550px", marginTop: "-50px" }}
      >
        Purchase History
      </Typography>
      <List disablePadding>
        <Divider></Divider>
        {token.map((order) => (
          <OrderList order={order} onItemClick={onItemClick}></OrderList>
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
          You have nothing in your purchase history
        </div>
      </List>
    </div>
  );
};

export default HistoryList;
