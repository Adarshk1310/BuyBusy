import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     isLoggedIn:false,userId:null
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsLoggedIn:(state,action)=>{
            state.isLoggedIn=action.payload
        },
        setUserId:(state,action)=>{
            state.userId=action.payload
        }
    }
})




export const authReducer= authSlice.reducer;
export const authActions =authSlice.actions;
export const authSelector = (state)=>state.authReducer;