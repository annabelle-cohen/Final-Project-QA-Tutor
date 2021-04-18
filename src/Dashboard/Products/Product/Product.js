import React, { useState, useEffect } from "react";
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
  const [imgSource, setimgSource] = useState(
    console.log(product.images[0].source)
  );
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product, 1);

  const handleItemClick = () => onClickItem(product);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          product.images.length <= 0
            ? "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMi4wMDMgNTEyLjAwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMyA1MTIuMDAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNMzE1LjczMiwyNTZjMC0xMy4yMDEtNC4zNTItMjUuMzctMTEuNjMxLTM1LjI2OGwtODMuNzIxLDgzLjEwNmM5Ljk1OCw3LjQzMywyMi4yNjMsMTEuODk1LDM1LjYxOCwxMS44OTUNCgkJCQlDMjg4LjkyOSwzMTUuNzMzLDMxNS43MzIsMjg4LjkzLDMxNS43MzIsMjU2eiIvPg0KCQkJPHBhdGggZD0iTTEwNy44OSwzODRjLTE3LjE0MywwLTMxLjA4Ny0xMy45NTItMzEuMDg3LTMxLjA5NVYxODQuMzJjMC0xNi45MzksMTMuNzgxLTMwLjcyLDMwLjcxMS0zMC43Mmg0OC41MjFsMjEuNDAyLTU0LjMyMw0KCQkJCWMxLjI5Ny0zLjI2OCw0LjQzNy01LjQxLDcuOTQ1LTUuNDFoMTQxLjIzNWMzLjUwNywwLDYuNjQ3LDIuMTQyLDcuOTQ1LDUuNDFsMTkuMDI5LDQ4LjI5bDc4LjA4OS03Ny41MTcNCgkJCQlDMzg1Ljc5NSwyNi42NzUsMzIzLjk3MSwwLDI1Ni4wMDMsMGMtMTQxLjE1OCwwLTI1NiwxMTQuODQyLTI1NiwyNTZjMCw2Ny4yOTQsMjYuMTM4LDEyOC41NzIsNjguNzQ1LDE3NC4zMUwxMTUuMzk5LDM4NEgxMDcuODl6DQoJCQkJIi8+DQoJCQk8cGF0aCBkPSJNMTk2LjI2NSwyNTZjMCwxMy40MzEsNC41MTQsMjUuODA1LDEyLjAyMywzNS43ODlsODMuODU3LTgzLjIzNGMtMTAuMDUyLTcuNjcxLTIyLjU1NC0xMi4yODgtMzYuMTQ3LTEyLjI4OA0KCQkJCUMyMjMuMDY5LDE5Ni4yNjcsMTk2LjI2NSwyMjMuMDcsMTk2LjI2NSwyNTZ6Ii8+DQoJCQk8cGF0aCBkPSJNNDE4LjEzMiwzNTIuOTA1VjE4NC4zMmMwLTcuNTI2LTYuMTI3LTEzLjY1My0xMy42NTMtMTMuNjUzaC00OS45NDZsLTM4LjIyMSwzNy45MzkNCgkJCQljMTAuMjkxLDEzLjA3MywxNi40ODYsMjkuNTA4LDE2LjQ4Niw0Ny4zOTRjMCw0Mi4zNTEtMzQuNDQ5LDc2LjgtNzYuOCw3Ni44Yy0xOC4wOTEsMC0zNC43MDUtNi4zMjMtNDcuODQ2LTE2LjgyOA0KCQkJCWwtNTEuMzM3LDUwLjk2MWgyNDcuMjg3QzQxMS44NDMsMzY2LjkzMyw0MTguMTMyLDM2MC42NDQsNDE4LjEzMiwzNTIuOTA1eiBNMzgzLjk5OSwyMjEuODY3DQoJCQkJYy05LjQyOSwwLTE3LjA2Ny03LjYzNy0xNy4wNjctMTcuMDY3YzAtOS40MjksNy42MzctMTcuMDY3LDE3LjA2Ny0xNy4wNjdzMTcuMDY3LDcuNjM3LDE3LjA2NywxNy4wNjcNCgkJCQlDNDAxLjA2NSwyMTQuMjI5LDM5My40MjgsMjIxLjg2NywzODMuOTk5LDIyMS44Njd6Ii8+DQoJCQk8cGF0aCBkPSJNMzIwLjgwNywxMTAuOTMzSDE5MS4xOTRsLTIxLjQxLDU0LjMyM2MtMS4yOTcsMy4yNjgtNC40MzcsNS40MS03Ljk0NSw1LjQxaC01NC4zMjMNCgkJCQljLTcuNTI2LDAtMTMuNjUzLDYuMTI3LTEzLjY1MywxMy42NTN2MTY4LjU4NWMwLDcuNzQsNi4yOTgsMTQuMDI5LDE0LjAyOSwxNC4wMjloMjQuNzA0bDYzLjQ3OS02My4wMTkNCgkJCQljLTEwLjUzLTEzLjE1LTE2Ljg3OS0yOS43OS0xNi44NzktNDcuOTE1YzAtNDIuMzUxLDM0LjQ0OS03Ni44LDc2LjgtNzYuOGMxOC4zMywwLDM1LjE1Nyw2LjQ2OCw0OC4zNzUsMTcuMjJsMzYuMDI4LTM1Ljc2Mw0KCQkJCUwzMjAuODA3LDExMC45MzN6Ii8+DQoJCQk8cGF0aCBkPSJNNDQzLjY5OSw4Mi4xNjFsLTcxLjk3LDcxLjQ0MWgzMi43NTFjMTYuOTM5LDAsMzAuNzIsMTMuNzgxLDMwLjcyLDMwLjcxMXYxNjguNTkzYzAsMTcuMTQzLTEzLjk1MiwzMS4wOTUtMzEuMDk1LDMxLjA5NQ0KCQkJCUgxMzkuNjIybC01OC44MjksNTguMzk0YzQ1LjgzMyw0My4xMSwxMDcuNDY5LDY5LjYwNiwxNzUuMjA2LDY5LjYwNmMxNDEuMTU4LDAsMjU2LTExNC44NDIsMjU2LTI1Ng0KCQkJCUM1MTIsMTg4LjkzOSw0ODYuMDUsMTI3Ljg0OSw0NDMuNjk5LDgyLjE2MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
            : product.images[0].source
        }
        title={product.title}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            <Link
              to="/dashboard/productPage"
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
