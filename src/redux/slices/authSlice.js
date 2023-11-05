// authSlice.js
import { createSlice } from "@reduxjs/toolkit";;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { userId, accessToken } = action.payload
            state.userId = userId
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.userId = null
            state.token = null
        }
    },
});

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectData = state => state.auth

export const selectUserId = (state) => state.auth.userId
export const selectCurrentUser = (state) => state.auth.userId
export const selectAccessToken = (state) => state.auth.token
