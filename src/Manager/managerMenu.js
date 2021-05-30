import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
/**need check empty classes */
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

export default function NavTabs({
  height,
  user,
  existBugs,
  onClick,
  classList,
  studentsList,
  studentChosen,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isExist, setExist] = useState(false);
  const [Bugs, setBugs] = React.useState([
    {
      //1 done
      bugName: "ProductPage Bug",
      description: "Product doesn't add to cart from the product page",
      isAdd: false,
    },
    {
      //2 done
      bugName: "ProductPageAdvanced Bug",
      description:
        "Product doesn't add to cart from the product page\n" +
        "but still update the total sum and show like is add at the navigation bar",
      isAdd: false,
    },
    {
      //3 done
      bugName: "ProductsCategory Bug",
      description: "Product doesn't add to cart from the category page",
      isAdd: false,
    },
    {
      //4 done
      bugName: "ProductsCategoryAdvanced Bug",
      description: "Product add to cart succefully but with extra 52.34$",
      isAdd: false,
    },
    {
      //5 done
      bugName: "Quantity Bug",
      description:
        "If the students try to increase the quantity, it doesn't work",
      isAdd: false,
    },
    {
      //6 done
      bugName: "QuantityAdvanced Bug",
      description:
        "The quantity is increased in product page, but when the student add to cart is always qauntity 1",
      isAdd: false,
    },
    {
      //7 done
      bugName: "QuantityCheckOut Bug",
      description:
        "The Student try to increase the quantity in the check out page, but it doesn't do anything.",
      isAdd: false,
    },
    {
      //8 done
      bugName: "QuantityCheckOutAdvanced Bug",
      description:
        "The Quantity is increased even at the payment form, but at the summary of the order in the student email nothing change",
      isAdd: false,
    },
    {
      //9 done
      bugName: "Unwanted product Bug",
      description: "Product that doesn't even chosen add to cart",
      isAdd: false,
    },
    {
      //10 done
      bugName: "Credit Bug",
      description: "The students pay without all fields fills",
      isAdd: false,
    },
    {
      //11 done
      bugName: "TotalPrice Bug",
      description:
        "The total price in the summary doesn't correct, always with addition of 100$",
      isAdd: false,
    },
    {
      //12 done
      bugName: "CVV Bug",
      description: "The cvv at the credit card doesnt correct",
      isAdd: false,
    },
    {
      //13 done
      bugName: "Date Bug",
      description: "The date at the credit card doesn't correct",
      isAdd: false,
    },
    {
      //14 done
      bugName: "Purchase Bug",
      description: "Purchase doesn't work even with correct credit card",
      isAdd: false,
    },
    {
      //15 done
      bugName: "Stock Bug",
      description:
        "It is possible to add a larger quantity than is in stock to the cart",
      isAdd: false,
    },
    {
      //16 done
      bugName: "History Bug",
      description:
        "The system will not display the entire purchase history of that account",
      isAdd: false,
    },
    {
      //17 done
      bugName: "Category Bug",
      description:
        "By pressing on desired category it takes the user to different category",
      isAdd: false,
    },
    {
      //18 done
      bugName: "Results Bug",
      description:
        "No matter what the user looking for at the search input it always show no results",
      isAdd: false,
    },
    {
      //19 done
      bugName: "Checkout Bug",
      description: "when the student go to check out, the cart is empty.",
      isAdd: false,
    },
    {
      //20 done
      bugName: "Delete single prodect Bug",
      description:
        "when the student try to delete single product it delete more products.\n" +
        "Work only with more then one product in the cart.",
      isAdd: false,
    },
    {
      //21 done
      bugName: "Logout Bug",
      description:
        "The student try to logout from aap and the button doesn't work",
      isAdd: false,
    },
    {
      //22 done
      bugName: "Buy again Bug",
      description:
        "The student try to but again a cart in the history but when he click on buy again button it is buy different cart\n" +
        "will work only if there is more then one order!",
      isAdd: false,
    },
    {
      //23 done
      bugName: "Watchlist Product Page Bug",
      description:
        "Watchlist bug will be little bit confusing, first if the student have something in their cart it will add to watch list by press on the button add to watchlist\n" +
        "second if the cart is empty then the watchlist button doesn't work at all! ",
      isAdd: false,
    },
    {
      //24 done
      bugName: "Logo Button Bug",
      description:
        "The Logo Button of AAP is always takes the student to Purchase History ",
      isAdd: false,
    },
    {
      //25 done
      bugName: "ProductMenuLink Bug",
      description:
        "The link of the product in the menu drop down at the navigation bar always takes the user to home page",
      isAdd: false,
    },
    {
      //26 done
      bugName: "ProductWatchlistLink Bug",
      description:
        "The link of the product in the watchlist drop down at the navigation bar always takes the user to sign in to AAP page",
      isAdd: false,
    },
    {
      //27 done
      bugName: "ProductLinkProductsPage Bug",
      description:
        "The link of the product in the products page takes to another product",
      isAdd: false,
    },
    {
      //28 done
      bugName: "SignInToAAP Bug",
      description:
        "The user try to sign in to aap and it always say incorrect details even the details are correct.",
      isAdd: false,
    },
    {
      //29 done
      bugName: "PopularCategories Bug",
      description:
        "The Links of the popular categories at the top of the page always link to the dashboard and do nothing",
      isAdd: false,
    },
    {
      //30 done
      bugName: "PopularCategoriesAdvanced Bug",
      description:
        "The Links of the popular categories at the bottom of the page takes to the popular categories at the top of the page",
      isAdd: false,
    },
  ]);

  useEffect(async () => {
    console.log(classList);
    //  console.log(studentsList);
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let NoClasses = () => {
    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              component="h2"
              style={{ textAlign: "center", fontSize: "25px" }}
            >
              No Classes yet!
            </Typography>
          </CardContent>
        </Card>
      </div>
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
        {classList.length <= 0 ? (
          <NoClasses></NoClasses>
        ) : (
          <AutoGrid
            user={user}
            classList={classList}
            studentsList={studentsList}
            existBugs={existBugs}
            studentChosen={studentChosen}
          ></AutoGrid>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AlignItemsList
          user={user}
          Bugs={Bugs}
          existBugs={existBugs}
          onClick={onClick}
        ></AlignItemsList>
      </TabPanel>
    </div>
  );
}
