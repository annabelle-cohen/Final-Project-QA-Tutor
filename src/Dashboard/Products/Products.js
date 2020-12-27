import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import useStyles from "./styles";
import Pagination from "./Pagination";

const Products = ({ products, onAddToCart, onClickItem }) => {
  const classes = useStyles();

  const [products2, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await products;
      setProducts(res);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentPruducts = products2.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleScrollToStats = () => {
    window.scrollTo({
      top: 0,
    });
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className={classes.content}>
      {handleScrollToStats()}
      <div className={classes.toolbar} />
      <Grid container justify="left" xs={2} sm={12} md={2} lg={12} spacing={1}>
        {currentPruducts.map((product) => (
          <Grid key={product.productID} item xs={4} sm={4} md={4} lg={3}>
            <Product
              product={product}
              onAddToCart={onAddToCart}
              onClickItem={onClickItem}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products2.length}
        paginate={paginate}
      />
    </main>
  );
};

export default Products;
