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

const steps = ["Shipping address", "Payment details"];

const CheckoutStepper = ({ shippingAddress, billingInfo, checkoutToken }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    shippingAddress(data);
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    shippingData ? (
      <>
        {console.log(shippingData)}
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {shippingData.firstName}{" "}
            {shippingData.lastName}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: ref</Typography>
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