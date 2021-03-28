import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Divider, Grid } from "@material-ui/core";
import useStyles from "./styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ProductList from "./orderProduct/ProductList";

const OrderList = ({ order, onItemClick }) => {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    var temp = order.orderDate.split("T");
    var temp2 = temp[0].split("-");
    console.log(temp);
    console.log(temp2);
    setDate(temp2[2].concat("/").concat(temp2[1]).concat("/").concat(temp2[0]));
  });

  const handleClick = () => {
    if (!isShow) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div>
      <List disablePadding>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary={
              <React.Fragment>
                <div className={classes.title} id="item">
                  {" "}
                  <div style={{ display: "inline-block" }}>
                    <div> Order No. {order.orderID}</div>
                    <div>Order Date. {date}</div>
                  </div>
                  <div
                    style={{ display: "inline-block", marginLeft: "500px" }}
                    onClick={handleClick}
                  >
                    <Grid item xs={8}>
                      {isShow ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </Grid>
                  </div>
                  <div style={{ display: !isShow ? "block" : "none" }}>
                    {order.products.map((product) => (
                      <ProductList
                        product={product}
                        quantity={order.quantity}
                        productsArray={order.products}
                        onItemClick={onItemClick}
                      ></ProductList>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            }
          ></ListItemText>
        </ListItem>
      </List>

      <Divider></Divider>
    </div>
  );
};

export default OrderList;
