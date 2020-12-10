import { SAVE_USER_AAP } from "../Constant/action-types";

const iniState ={
    isLoggedIn: true,
    userAAP:{
    email: "a1@a.com",
    firstName:"ali",
    lastName:"ali",
    password:"1234"
    },
    isSignIn:false
}


const authAAPReducer=(state=iniState,action)=>{
  
    if (action.type ===SAVE_USER_AAP){
        return Object.assign({}, state, action.payload); 
    }
    return state;
}


export default authAAPReducer;