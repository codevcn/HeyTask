import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth/auth-slice"
import { userSlice } from "./user/user-slice"
import { workspaceSlice } from "./workspace/workspace-slice"

export const store = configureStore({
   reducer: {
      [authSlice.name]: authSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [workspaceSlice.name]: workspaceSlice.reducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
