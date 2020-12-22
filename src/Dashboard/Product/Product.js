import React, { Component } from "react";
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
import { connect } from "react-redux";
import { saveProductSelected } from "../../Actions/productSelected";
import { savePassingProduct } from "../../Actions/passProduct";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "2px",
  },
});
export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: "",
    };
    this.props.savePassingProduct({
      productToPass: this.props.productToPass,
    });

    const product = this.props.productToPass;
  }

  handleAddToCart = (e) => {
    console.log("hi");
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={this.product.images[0].source}
          title={this.product.title}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {this.product.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              ${this.product.unitPrice}
            </Typography>
          </div>
          <Typography
            dangerouslySetInnerHTML={{ __html: this.product.subtitle }}
            variant="body2"
            color="textSecondary"
            component="p"
          />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to Cart" onClick={this.handleAddToCart}>
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveProductSelected: (productSelected) =>
      dispatch(saveProductSelected(productSelected)),
    savePassingProduct: (productToPass) =>
      dispatch(savePassingProduct(productToPass)),
  };
}

const mapStateToProps = (state) => {
  return {
    productSelected: state.productSelected,
    productToPass: state.productToPass,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Product));
