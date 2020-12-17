import { SAVE_PERSONAL_INFO } from "../Constant/action-types";

const iniState = {
  isPersonalInfoExist: false,
  personalInfo: {
    address: "null",
    country: "null",
    city: "null",
    phone: "null",
    avatar: "null",
    firstName: "null",
    lastName: "null",
  },
  billingInfos: {
    billingAdress: "null",
    creditCardID: "null",
    billDate: "null",
    creditCardEXPDate: "null",
    creditCardPIN: "null",
    creditCardNo: "null",
  },
};

const personalInfoReducer = (state = iniState, action) => {
  if (action.type === SAVE_PERSONAL_INFO) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default personalInfoReducer;
