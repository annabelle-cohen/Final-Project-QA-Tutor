import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
  handleClick,
}) => {
  const classes = useStyles();

  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/dashboard">
        start adding some
      </Link>
      !
    </Typography>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.cart.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
              productsForIndex={cart.cart}
              handleClick={handleClick}
              amount={cart.amountOfproducts}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails} style={{ paddingBottom: 40 + "px" }}>
        <Typography
          variant="h5"
          style={{
            color: "black",
          }}
        >
          Subtotal: ${cart.totalPrice.toFixed(2)}
        </Typography>
        <div style={{ position: "static", zIndex: 7, marginTop: 5 + "px" }}>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  console.log(cart);
  return (
    <Container>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.cart.length == 0 ? renderEmptyCart() : renderCart()}
    </Container>
  );
};
export default Cart;
