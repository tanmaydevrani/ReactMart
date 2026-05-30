import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedCurrentUsers = localStorage.getItem("currentUser") || null;

if (storedUsers.length === 0) {
    storedUsers.push({ email: "demo@reactmart.com", password: "demo123" });
    localStorage.setItem("users", JSON.stringify(storedUsers));
}

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
                state.error="User already exists";
                return;
            }
            state.users.push({email,password});
            localStorage.setItem("users", JSON.stringify(state.users));
        },

        login:(state,action)=>{
            const {email,password}=action.payload;
            const user = state.users.find(
                (u)=>u.email === email && u.password === password
            )
            if(user){
                state.currentUser= email;
                state.isLoggedIn=true;
                state.error=null;
                localStorage.setItem("currentUser",email);
            } else{
                state.error="Invalid email or password"
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