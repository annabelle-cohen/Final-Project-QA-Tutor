import React from "react";
import { Link } from "react-router-dom";
import SignInLinks from "./signedInLink";
import SignOutLinks from "./signedOutLink";
import { connect } from "react-redux";
import { Component } from "react";
import "./styleNavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link
            to={
              this.props.auth.isLoggedIn
                ? this.props.auth.user.roleEnum === "MANAGER"
                  ? "/manager"
                  : "/dashboard"
                : "/"
            }
            className="brand-logo"
          >
            QA Tutor
          </Link>
          <ul className="right">
            {this.props.auth.isLoggedIn ? <SignInLinks /> : <SignOutLinks />}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

function mapDispatchToProps() {
  return {};
}

const NavBar1 = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default connect()(NavBar1);
