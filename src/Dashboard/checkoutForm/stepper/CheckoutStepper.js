import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Info } from "@material-ui/icons";

const steps = ["Shipping address", "Payment details"];

const CheckoutStepper = ({
  shippingAddress,
  billingInfo,
  checkoutToken,
  personalInfo,
  bugsList,
}) => {
  console.log(personalInfo);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [orderId, setOrderId] = useState("");
  const classes = useStyles();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    shippingAddress(data);
    setShippingData(data);

    nextStep();
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      getOrderId();
    }
  });

  const getOrderId = async () => {
    var orderInfo = "";
    var length = 0;

    await fetch(
      "http://localhost:8092/acs/orders/getOrderHistroy/" +
        personalInfo.personalInfo.address
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((d) => {
            orderInfo = d;
            length = orderInfo.length - 1;
            console.log(orderInfo);
            //   console.log(orderInfo[length].orderID);
            if (orderInfo.length !== 0) {
              setOrderId(orderInfo[length].orderID);
            }
          });
        } else {
          console.log("Error:", response);
          response.json().then((d) => {
            console.log("Errordata", d);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error.data);
      });
  };

  let Confirmation = () =>
    shippingData ? (
      <>
        <div style={{ display: orderId !== "" ? "block" : "none" }}>
          <Typography variant="h5">
            Thank you for your purchase, {shippingData.firstName}{" "}
            {shippingData.lastName}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order No.{orderId}</Typography>
        </div>
        <div style={{ display: orderId !== "" ? "none" : "block" }}>
          Loading order Please wait...
        </div>
        <br />
        <Button
          component={Link}
          variant="outlined"
          type="button"
          to="/dashboard"
        >
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  const Form = () =>
    activeStep == 0 ? (
      <AddressForm test={test} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        billingInfo={billingInfo}
        checkoutToken={checkoutToken}
        personalInfo={personalInfo}
        bugsList={bugsList}
        backStep={backStep}
        nextStep={nextStep}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            variant="h4"
            align="center"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};
export default CheckoutStepper;
