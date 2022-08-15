import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Authorization/AuthSlice";

export const store=configureStore({
    reducer:{
        Authorization:AuthReducer
    }
});