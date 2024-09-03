import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
    name: "navbar",

    initialState: {
        value: false
    },
    reducers: {
        onNavbar:(state) => {
            state.value = true
        },
        offNavbar:(state) => {
            state.value =false
        }
    }
})

export const {onNavbar, offNavbar} = navbarSlice.actions


export default navbarSlice.reducer