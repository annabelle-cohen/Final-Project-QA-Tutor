import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { Link } from "react-router-dom";

const AddressForm = ({ test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const methods = useForm();

  useEffect(() => {
    setShippingCountries({
      AU: "Australia",
      BR: "Brazil",
      CN: "China",
      EG: "Egypt",
      DE: "Germany",
      IN: "India",
      IL: "Israel",
      JP: "Japan",
      ES: "Spain",
      US: "United States",
    });

    console.log(shippingCountries);
  }, []);

  const handleError = (e) => {
    e.preventDefault();
    isValid = false;
  };
  var isValid = true;
  return (
    <>
      {" "}
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({ ...data, shippingCountry })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
          </Grid>
          <InputLabel
            style={{ position: "absolute", zIndex: 4, paddingTop: 10 + "px" }}
          >
            Shipping Country *
          </InputLabel>
          <Select
            value={shippingCountry}
            onChange={(e) => setShippingCountry(e.target.value)}
            style={{
              width: 265 + "px",
              paddingTop: 15 + "px",
              marginTop: 20 + "px",
            }}
          >
            {Object.entries(shippingCountries)
              .map(([code, name]) => ({ id: code, label: name }))
              .map((item) => (
                <MenuItem key={item.id} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
          <br /> <br /> <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/checkout">
              Back to Cart
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={shippingCountry != "" ? false : true}
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
