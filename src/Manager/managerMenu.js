import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import blue1 from "./img/blue3.jpg";
import MediaCardInfo from "./managerInfo";
import AlignItemsList from "./BugsList";
import AutoGrid from "./managerGrid";
import { indigo } from "@material-ui/core/colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${blue1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  AppBar: {
    backgroundColor: "#115293",
  },
  Tabs: {
    indicator: {
      backgroundColor: "white",
    },
  },
  indicator: {
    backgroundColor: "white",
    height: "2px",
    top: "46px",
  },
}));

export default function NavTabs({ height, user }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [classList, setClassList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [isExist, setExist] = useState(false);
  const [updateNeeded, setUpdate] = useState(true);
  const [Bugs, setBugs] = React.useState([
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
      bugName: "CVV Bug",
      description: "The cvv at the credit card doesnt correct",
      isAdd: false,
    },
    {
      bugName: "Date Bug",
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
  ]);

  useEffect(async () => {
    if (!isExist) {
      initNumberOfClasses();
      setExist(true);
    }
    setBugs(Bugs);
  });

  const initNumberOfClasses = async () => {
    const data = {
      manager: user.email,
    };

    const main = "http://localhost:8092/";
    const addBug = main + "/acs/classes/getAllClasses";
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
            setClassList(d);
            var tempStudents = [];
            for (var i = 0; i < d.length; i++) {
              tempStudents.push(d[i].students);
            }
            setStudentsList(tempStudents);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = async (bug) => {
    const data = {
      bugName: bug.bugName,
      description: bug.description,
      managerEmail: user.email,
    };

    const main = "http://localhost:8092/";
    const addBug = main + "/acs/managers/addBug";
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
  };

  return (
    <div className={classes.root} style={{ height: height }}>
      <AppBar position="static" className={classes.AppBar}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          TabIndicatorProps={{ className: classes.indicator }}
        >
          <LinkTab label="Personal Info" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Classes" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Bugs" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div
          style={{
            marginLeft: "35%",
          }}
        >
          <MediaCardInfo
            user={user}
            classList={classList}
            studentsList={studentsList}
          ></MediaCardInfo>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AutoGrid
          user={user}
          classList={classList}
          studentsList={studentsList}
        ></AutoGrid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AlignItemsList
          user={user}
          Bugs={Bugs}
          onClick={handleClick}
        ></AlignItemsList>
      </TabPanel>
    </div>
  );
}
