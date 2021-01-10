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

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const Confirmation = () => {
    return <div>Confirmation</div>;
  };
  const Form = () => (activeStep == 0 ? <AddressForm /> : <PaymentForm />);

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
