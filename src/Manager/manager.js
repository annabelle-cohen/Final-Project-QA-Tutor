import React, { Component } from "react";
import NavTabs from "./managerMenu";
import { saveUser } from "../Actions/authActions";
import { connect } from "react-redux";
import { domainUrl } from "../requests";

export class ManagerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height,
      existBugsInSystem: [],
      classList: [],
      studentsList: [],
      studentChosen: {},
      isUpdate: false,
    };

    this.props.saveUser({
      user: this.props.auth.user,
      isLoggedIn: this.props.auth.isLoggedIn,
    });

    this.fillExistBugsInSystem();
    this.initNumberOfClasses();
  }

  componentWillMount() {
    this.setState({ height: window.innerHeight + "px" });
  }

  initNumberOfClasses = async () => {
    const data = {
      manager: this.props.auth.user.email,
    };

    const addBug = domainUrl + "/acs/classes/getAllClasses";
    const dataJson = JSON.stringify(data);

    await fetch(addBug, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            this.setState({ classList: d });
            var tempStudents = [];
            var bool1 = true;
            for (var i = 0; i < d.length; i++) {
              for (var j = 0; j < d[i].students.length; j++) {
                tempStudents.push(d[i].students[j]);
                if (bool1) {
                  this.setState({
                    studentChosen: d[i].students[j],
                  });

                  bool1 = false;
                }
              }
            }

            this.setState({ studentsList: tempStudents });
          });
        } else {
          response.json().then((x) => {
            console.log(x);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  updateStudent = async (student) => {
    console.log(student);
  };
  fillExistBugsInSystem = async () => {
    const data = {
      email: this.props.auth.user.email,
    };

    const getAllBugs = domainUrl+ "/acs/managers/getAllBugs";
    const dataJson = JSON.stringify(data);

    await fetch(getAllBugs, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            const bugs = d;
            this.setState({ existBugsInSystem: bugs });
          });
        } else {
          response.json().then((x) => {
            console.log(x);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    const handleClick = async (bug) => {
      const data = {
        bugName: bug.bugName,
        description: bug.description,
        managerEmail: this.props.auth.user.email,
      };

      const addBug = domainUrl+ "/acs/managers/addBug";
      const dataJson = JSON.stringify(data);

      await fetch(addBug, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const bug = d;
              console.log(bug);
            });
          } else {
            response.json().then((x) => {
              console.log(x);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );

      this.fillExistBugsInSystem();
    };

    return (
      <div>
        <NavTabs
          height={this.state.height}
          user={this.props.auth.user}
          existBugs={this.state.existBugsInSystem}
          onClick={handleClick}
          classList={this.state.classList}
          studentsList={this.state.studentsList}
          studentChosen={this.state.studentChosen}
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
