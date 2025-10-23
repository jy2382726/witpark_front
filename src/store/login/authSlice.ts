import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || null,
        username: sessionStorage.getItem("username") || null,
        menuList: []
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            sessionStorage.setItem("token", action.payload)
        },
        setUsername: (state, action) => {
            state.username = action.payload
            sessionStorage.setItem("username", action.payload)
        },
        setMenuList: (state, action) => {
            state.menuList = action.payload
        },
        clearAuth: (state) => {
            state.token = null
            state.username = null
            state.menuList = []
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
        }
    },
})

export const { setToken, setUsername, clearAuth, setMenuList } = authSlice.actions
export default authSlice.reducer