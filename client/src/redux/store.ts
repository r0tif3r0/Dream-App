import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";

const redusers = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: redusers
})