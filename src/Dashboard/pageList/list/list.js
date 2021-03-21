import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  borders,
  Grid,
  Box,
  ListItemAvatar,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const List1 = ({ product, onClickItem, onRemoveProduct }) => {
  console.log(product);
  const classes = useStyles();
  const handleItemClick = () => onClickItem(product);
  const handleDeleteClick = () => onRemoveProduct(product);
  return (
    <div>
      <List disablePadding>
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
                  className={classes.title}
                  onClick={handleItemClick}
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

          <Typography variant="body2" style={{ marginRight: "300px" }}>
            ${product.unitPrice.toFixed(2)}
            <div style={{ fontSize: 10 + "px", color: "gray" }}>
              +
              {product.shippingServiceCost > 0
                ? product.shippingServiceCost
                : "FREE"}
            </div>
          </Typography>
        </ListItem>

        <ListItem style={{ padding: "10px 0" }}></ListItem>
      </List>
      <Grid item xs={8}>
        <DeleteIcon className={classes.delete} onClick={handleDeleteClick} />
      </Grid>
      <Divider></Divider>
    </div>
  );
};

export default List1;
