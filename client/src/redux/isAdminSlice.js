import { createSlice } from "@reduxjs/toolkit";

export const isAdminSlice = createSlice({
    name: "isAdmin",

    initialState: {
        value: false
    },
    reducers: {
        isAdmin:(state) => {
            state.value = true
        },
        notAdmin:(state) =>{
            state.value = false
        }
    }
})

export const {isAdmin, notAdmin} = isAdminSlice.actions


export default isAdminSlice.reducer