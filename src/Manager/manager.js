import React, { Component } from "react";
import NavTabs from "./managerMenu";
import { saveUser } from "../Actions/authActions";
import { connect } from "react-redux";

export class ManagerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height,
      Bugs: [
        {
          bugName: "ProductPage Bug",
          description: "Product doesn't add to cart from the product page",
          isAdd: false,
        },
        {
          bugName: "ProductsPage Bug",
          description: "Product doesn't add to cart from the category page",
          isAdd: false,
        },
        {
          bugName: "Quantity Bug",
          description:
            "If the students try to increase the quantity, it doesn't work",
          isAdd: false,
        },
        {
          bugName: "Unwanted product Bug",
          description: "Product that doesn't even chosen add to cart",
          isAdd: false,
        },
        {
          bugName: "Credit Bug",
          description: "The students pay without all fields fills",
          isAdd: false,
        },
        {
          bugName: "TotalPrice Bug",
          description: "The total price in the summary doesn't correct",
          isAdd: false,
        },
        {
          bugName: "cvv Bug",
          description: "The cvv at the credit card doesnt correct",
          isAdd: false,
        },
        {
          bugName: "date Bug",
          description: "The date at the credit card doesn't correct",
          isAdd: false,
        },
        {
          bugName: "Purchase Bug",
          description: "Purchase doesn't work even with correct credit card",
          isAdd: false,
        },
        {
          bugName: "Stock Bug",
          description:
            "It is possible to add a larger quantity than is in stock to the cart",
          isAdd: false,
        },
        {
          bugName: "History Bug",
          description:
            "The system will not display the entire purchase history of that account",
          isAdd: false,
        },
        {
          bugName: "Category Bug",
          description:
            "By pressing on desired category it takes the user to different category",
          isAdd: false,
        },
        {
          bugName: "Results Bug",
          description:
            "No matter what the user looking for at the search input it always show no results",
          isAdd: false,
        },
      ],
    };

    this.props.saveUser({
      user: this.props.auth.user,
      isLoggedIn: this.props.auth.isLoggedIn,
    });
  }

  componentWillMount() {
    this.setState({ height: window.innerHeight + "px" });
  }

  render() {
    return (
      <div>
        <NavTabs
          height={this.state.height}
          user={this.props.auth.user}
          bugs={this.state.Bugs}
        ></NavTabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
  };
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const ManagerPage1 = connect(mapStateToProps, mapDispatchToProps)(ManagerPage);

export default connect()(ManagerPage1);
