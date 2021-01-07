import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const CartItem = ({
  item,
  onUpdateCartQty,
  onRemoveFromCart,
  productsForIndex,
  handleClick,
  amount,
}) => {
  const classes = useStyles();

  const handleUpdateCartQty = (item, newQuantity) =>
    onUpdateCartQty(item, newQuantity);

  const handleRemoveFromCart = (item) => onRemoveFromCart(item);
  console.log(productsForIndex);
  const index = productsForIndex.findIndex(
    (product) => item.productID === product.productID
  );
  const onItemClick = () => handleClick(item);

  return (
    <Card className="cart-item" style={{ height: 480 + "px" }}>
      <CardMedia
        image={item.images[0].source}
        alt={item.title}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">
          <Link to="/dashboard" onClick={onItemClick} className={classes.link}>
            {item.title}
          </Link>
        </Typography>
        <Typography variant="h5">${item.unitPrice}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item, amount[index] - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{amount[index]}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item, amount[index] + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
