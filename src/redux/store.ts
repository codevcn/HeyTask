import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth/auth-slice"
import { userSlice } from "./user/user-slice"
import { projectSlice } from "./project/project-slice"

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [projectSlice.name]: projectSlice.reducer,
   },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
