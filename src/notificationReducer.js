import { createSlice } from "@reduxjs/toolkit";
import { actions } from "./reducers";
import {  toast } from "react-toastify";


const initialState ={
    message:''
}

const notification = createSlice({
    name:'notify',
    initialState,
    reducers:{
        reset:(state,action)=>{
            state.message=""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actions.setAddToBag,(state,action)=>{
            state.message= `${action.payload.name} added to cart successfully!!`;
            toast.success(state.message);
        });

     
    }

})

export const NotificationReducer = notification.reducer;
export const notifyActions =notification.actions;
export const notificationSelector =(state)=>state.NotificationReducer;