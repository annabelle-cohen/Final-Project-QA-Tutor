import React, { useState, useEffect } from "react";
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
  personalInfo,
  bugsList,
  backStep,
  nextStep,
}) => {
  const [number, setNumber] = useState(personalInfo.billingInfos.creditCardNo);
  const [name, setName] = useState(
    personalInfo.personalInfo.firstName +
      " " +
      personalInfo.personalInfo.lastName
  );
  const [id, setId] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryForCheck, setExpiryForCheck] = useState("");
  const [cvc, setCvc] = useState(personalInfo.billingInfos.creditCardPIN);
  const [Focus, setFocus] = useState("");
  const [isValid, setValid] = useState("");
  const [isFirst, setFirst] = useState(true);
  const [isFirst2, setFirst2] = useState(true);
  const [isAllFieldEmptyBug, setIsAllFieldBug] = useState(false);
  const [isCvvBug, setCvvBug] = useState(false);

  useEffect(() => {
    var res = personalInfo.billingInfos.creditCardEXPDate.split("/");
    var str1_month = "";
    var str2_month = "";
    var final_month = "";
    var final_year = "";

    var isAllFieldsBug = bugsList.some((b) => b.bugName === "Credit Bug");
    console.log("is all fields bug" + isAllFieldsBug);
    setIsAllFieldBug(isAllFieldsBug);
    if (isFirst2 && isAllFieldsBug) {
      setIsAllFieldBug(true);
      setFirst2(false);
    }
    var isCVVbug = bugsList.some((b) => b.bugName === "CVV Bug");
    console.log("is CVV bug" + isCVVbug);
    if (isCVVbug && isFirst) {
      var cvv = Math.floor(Math.random() * 1000) + 100;
      if (cvv !== parseInt(personalInfo.billingInfos.creditCardPIN)) {
        setCvc(cvv);
        setCvvBug(true);
        setFirst(false);
      }
    }

    if (isAllFieldsBug) {
      setValid(false);
    }
    var isDateBug = bugsList.some((b) => b.bugName === "Date Bug");
    console.log("is Date bug" + isDateBug);

    if (res[0] < 10) {
      str1_month = "0";
      str2_month = res[0];
      final_month = str1_month.concat(str2_month);
      console.log(final_month);
    } else {
      final_month = res[0];
    }

    var temp = res[1].split("");
    var final_year = temp[2].concat(temp[3]);
    setExpiryForCheck(final_month.concat(final_year));

    if (isDateBug) {
      var temp = final_year;
      final_year = temp - 5;
    }
    setExpiry(final_month.concat(final_year));
  });

  const handleSubmit = async (e) => {
    var isPurchaseBug = bugsList.some((b) => b.bugName === "Purchase Bug");
    console.log("in handle submit");
    e.preventDefault();
    if (
      number === "" ||
      name === "" ||
      id === "" ||
      expiry === "" ||
      cvc === ""
    ) {
      if (isAllFieldEmptyBug) {
        setValid(false);
        const billingInfObj = {
          number: number,
          name: name,
          id: id,
          expiry: expiry,
          cvc: cvc,
        };
        billingInfo(billingInfObj);
        nextStep();
      } else {
        setValid(true);
      }
    } else {
      var nameToCheck =
        personalInfo.personalInfo.firstName +
        " " +
        personalInfo.personalInfo.lastName;
      setValid(false);
      const billingInfObj = {
        number: number,
        name: name,
        id: id,
        expiry: expiry,
        cvc: cvc,
      };

      var isValid2 = true;

      if (number !== personalInfo.billingInfos.creditCardNo) {
        isValid2 = false;
      }

      if (name !== nameToCheck) {
        isValid2 = false;
      }

      if (cvc !== personalInfo.billingInfos.creditCardPIN && !isCvvBug) {
        isValid2 = false;
      }

      if (expiry !== expiryForCheck) {
        isValid2 = false;
      }

      if (id.length !== 9) {
        isValid2 = false;
      }

      if (isPurchaseBug) {
        backStep();
      } else {
        if (isValid2) {
          billingInfo(billingInfObj);
          setValid(false);
          nextStep();
        } else {
          setValid(true);
        }
      }
    }
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
                placeholder={number}
                onChange={(e) => setNumber(number)}
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
                  placeholder={"mm/yy"}
                  disabled={false}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Pay ${checkoutToken.totalPrice.toFixed(2)}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
