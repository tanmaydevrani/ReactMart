import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedCurrentUsers = localStorage.getItem("currentUser") || null;

const initialState={
    users: storedUsers,
    currentUser: storedCurrentUsers,
    isLoggedIn: !!storedCurrentUsers,
    error:null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signup:(state,action)=>{
            const {email,password}=action.payload

            const exists = state.users.find((u)=>u.email===email);
            if(exists){
                state.error="User already exist";
                return;
            }
            state.users.push({email,password});
            localStorage.setItem("users", JSON.stringify(state.users));
        },

        login:(state,action)=>{
            const {email,passoword}=action.payload;
            const user = state.users.find(
                (u)=>u.email === email && u.passoword === passoword
            )
            if(user){
                state.currentUser= email;
                state.isLoggedIn=true;
                state.error=null;
                localStorage.setItem("currentUser",email);
            } else{
                state.error="invalid email or password"
            }
        },

        logout:(state)=>{
            state.currentUser=null;
            state.isLoggedIn=false;
            localStorage.removeItem("currentUser")
        }
    }
})

export const {signup,login,logout}=authSlice.actions
export default authSlice.reducer    