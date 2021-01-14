import React, { useState } from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import "./payment.css";
import Review from "./Review";

const PaymentForm = ({
  shippingData,
  billingInfo,
  checkoutToken,
  backStep,
  nextStep,
}) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [Focus, setFocus] = useState("");
  const [isValid, setValid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      number === "" ||
      name === "" ||
      id === "" ||
      expiry === "" ||
      cvc === ""
    ) {
      setValid(true);
    } else {
      setValid(false);
      const billingInfObj = {
        number: number,
        name: name,
        id: id,
        expiry: expiry,
        cvc: cvc,
      };
      billingInfo(billingInfObj);
    }

    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div
            style={{
              display: "inline-block",
            }}
          >
            <Cards
              id="cart"
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={Focus}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 10,
              top: -45,
              marginLeft: 10 + "px",
            }}
          >
            <div>
              <div style={{ display: "inline-block" }}>
                <InputText
                  id="ownerName"
                  placeholder="Enter full name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => setFocus(e.target.value)}
                />
              </div>

              <div style={{ display: "inline-block" }}>
                <InputMask
                  placeholder="Enter id"
                  id="ownerId"
                  mask="999999999"
                  value={id}
                  name="id"
                  onChange={(e) => setId(e.value)}
                  mode="decimal"
                  useGrouping={false}
                  maxFractionDigits={9}
                  onFocus={(e) => setFocus(e.target.name)}
                />
              </div>
            </div>
            <div>
              <InputMask
                id="creditNumber"
                mask="9999999999999999"
                value={number}
                name="number"
                placeholder="9999 9999 9999 9999"
                onChange={(e) => setNumber(e.value)}
                onFocus={(e) => setFocus(e.target.name)}
              ></InputMask>
            </div>
            <div>
              <div style={{ display: "inline-block" }}>
                <InputMask
                  id="ExpiryDate"
                  mask="99/99"
                  value={expiry}
                  name="expiry"
                  placeholder="mm/yy"
                  onChange={(e) => setExpiry(e.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                ></InputMask>
              </div>
              <div style={{ display: "inline-block" }}>
                <input
                  id="cvc"
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                  maxLength={3}
                />
              </div>
              <div
                id="error"
                style={{
                  display: isValid ? "block" : "none",
                  fontSize: 12 + "px",
                  color: "red",
                }}
              >
                Invalid information
              </div>
            </div>
          </div>
        </div>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Pay ${checkoutToken.totalPrice.toFixed(2)}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
