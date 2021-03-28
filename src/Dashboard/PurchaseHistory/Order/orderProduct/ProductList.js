import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const ProductList = ({ product, quantity, productsArray, onItemClick }) => {
  console.log(quantity);
  console.log(product);
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    var index = productsArray.findIndex(
      (item) => item.productID === product.productID
    );
    setIndex(index);
  });

  const handleClickOnItem = () => onItemClick(product);

  return (
    <div>
      <List disablePadding style={{ marginLeft: "-345px" }}>
        <ListItem style={{ padding: "10px 0" }} key={product.title}>
          <ListItemAvatar style={{ marginLeft: "350px" }}>
            <CardMedia
              image={product.images[0].source}
              className={classes.media}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Link
                  className={classes.title2}
                  onClick={handleClickOnItem}
                  to="/dashboard/productPage"
                >
                  {product.title}
                </Link>
              </React.Fragment>
            }
            style={{ marginLeft: "30px" }}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {product.subtitle}
                </Typography>
              </React.Fragment>
            }
          ></ListItemText>
          <br></br>

          <Typography
            variant="body2"
            style={{ marginRight: "300px", color: "gray" }}
          >
            ${product.unitPrice.toFixed(2)}
            <div style={{ fontSize: 10 + "px", color: "gray" }}>
              +
              {product.shippingServiceCost > 0
                ? product.shippingServiceCost
                : "FREE"}
            </div>
            <div
              style={{ fontSize: 10 + "px", color: "gray", marginLeft: "5px" }}
            >
              Qty. {quantity[index]}
            </div>
          </Typography>
        </ListItem>

        <ListItem style={{ padding: "10px 0" }}></ListItem>
      </List>

      <Divider style={{ width: "700px" }}></Divider>
    </div>
  );
};

export default ProductList;
