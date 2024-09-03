import { configureStore } from '@reduxjs/toolkit'
import navbarReducer from './navbarSlice'
import isAdminReducer from './isAdminSlice'

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    isAdmin: isAdminReducer
  }
})