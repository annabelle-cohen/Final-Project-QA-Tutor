import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { saveUser } from "../Actions/authActions";
import { saveUserAAP } from "../Actions/authAAPActions";
import { saveStaySignIn } from "../Actions/staySignIn";

class SignInLinks extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.saveUser({ user: {}, isLoggedIn: false });
    if (!this.props.signInCheck.isStaySignIn) {
      this.props.saveUserAAP({
        userAAP: "",
        isLoggedIn: this.props.authAAP.isLoggedIn,
        isSignIn: false,
      });
    }
  }

  renderUserPage() {
    const user = this.props.auth.user;
    return (
      <li>
        <NavLink onClick={this.onClick} to="/signin">
          Log Out
        </NavLink>
      </li>
    );
  }

  loggedIn() {
    if (this.props.auth.isLoggedIn) {
      return (
        <ul className="right">
          {/* <li><NavLink to='/' className='btn btn-floating green lighten-1'>{this.createIconLetters()}</NavLink></li> */}
          <li>{this.renderUserPage()}</li>
        </ul>
      );
    }
    return "";
  }

  render() {
    return this.loggedIn();
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authAAP: state.authAAP,
    signInCheck: state.signInCheck,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
    saveUserAAP: (userAAP) => dispatch(saveUserAAP(userAAP)),
    saveStaySignIn: (signInCheck) => dispatch(saveStaySignIn(signInCheck)),
  };
}

const SignInLink1 = connect(mapStateToProps, mapDispatchToProps)(SignInLinks);

export default SignInLink1;
