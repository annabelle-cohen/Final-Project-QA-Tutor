import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const Product = ({ product, onAddToCart, onClickItem }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product, 1);

  const handleItemClick = () => onClickItem(product);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.images[0].source}
        title={product.title}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            <Link
              to="/dashboard"
              onClick={handleItemClick}
              className={classes.link}
            >
              {" "}
              {product.title}{" "}
            </Link>
          </Typography>

          <Typography
            dangerouslySetInnerHTML={{ __html: product.subtitle }}
            variant="body2"
            color="textSecondary"
            component="p"
            style={{
              marginTop: -30 + "px",
              marginLeft: -30 + "px",
            }}
          />
        </div>
      </CardContent>
      <div
        style={{
          display: "inline-block",
          marginLeft: 20 + "px",
          marginTop: 15 + "px",
          position: "absolute",
        }}
      >
        <Typography gutterBottom variant="h6" component="h2">
          ${product.unitPrice}
        </Typography>
      </div>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
