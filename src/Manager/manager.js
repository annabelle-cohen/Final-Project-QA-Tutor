import React, { Component } from "react";
import NavTabs from "./managerMenu";
import { saveUser } from "../Actions/authActions";
import { connect } from "react-redux";

export class ManagerPage extends Component {
  constructor(props) {
    super(props);

    this.props.saveUser({
      user: this.props.auth.user,
      isLoggedIn: this.props.auth.isLoggedIn,
    });
  }

  render() {
    return (
      <div>
        <NavTabs></NavTabs>
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
