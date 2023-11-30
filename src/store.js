import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./reducers";
import { authReducer } from "./authReducer";
import { NotificationReducer } from "./notificationReducer";
export const store = configureStore({
    reducer:{
        itemReducer,
        authReducer,
        NotificationReducer
    }
})