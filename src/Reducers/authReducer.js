import { SAVE_USER } from "../Constant/action-types";

const iniState ={
    isLoggedIn: false,
    user:{
    avatar: "asdasd",
    email: "a1@a.com",
    roleEnum: "ADMIN",
    username: "ali null"
    }
}
//fpor user!!

const authReducer=(state=iniState,action)=>{
  
    if (action.type ===SAVE_USER){
        return Object.assign({}, state, action.payload); 
    }
    return state;
}


export default authReducer;

