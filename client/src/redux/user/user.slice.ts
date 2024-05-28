import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

export type IUserSlice =  {
    isAuth: boolean,
    user: IUser
}


const initialState: IUserSlice = {
    isAuth: false,
    user: {} as IUser
}

const userSlice = createSlice({
    name: 'userSlice', 
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuth = true
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.isAuth = false
            state.user = {} as IUser
        }
    }
})

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;