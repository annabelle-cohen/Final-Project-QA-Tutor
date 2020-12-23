import React from "react";
import Grid from "@material-ui/core/Grid";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ products, onAddToCart, onClickItem }) => {
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid
        container
        justify="center"
        xs={2}
        sm={12}
        md={2}
        lg={12}
        spacing={1}
      >
        {products.map((product) => (
          <Grid key={product.productID} item xs={4} sm={4} md={4} lg={3}>
            <Product
              product={product}
              onAddToCart={onAddToCart}
              onClickItem={onClickItem}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
