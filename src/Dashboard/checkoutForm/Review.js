import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => (
  <>
    <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
      Order summary
    </Typography>
    <List disablePadding>
      {checkoutToken.cart.map((product) => (
        <ListItem style={{ padding: "10px 0" }} key={product.title}>
          <ListItemText
            primary={product.title}
            secondary={`Quantity: ${
              checkoutToken.amountOfproducts[
                checkoutToken.cart.findIndex(
                  (item) => item.productID === product.productID
                )
              ]
            }`}
          />
          <Typography variant="body2">
            ${product.unitPrice.toFixed(2)}
            <div style={{ fontSize: 10 + "px", color: "gray" }}>
              +
              {product.shippingServiceCost > 0
                ? product.shippingServiceCost
                : "FREE"}
            </div>
          </Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: "10px 0" }}>
        <ListItemText primary="Total:" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          ${checkoutToken.totalPrice.toFixed(2)}
        </Typography>
      </ListItem>
    </List>
  </>
);
export default Review;
