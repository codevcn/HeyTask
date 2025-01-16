import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EAuthStatus } from "../../utils/enums"

type TInitialState = {
   authStatus: EAuthStatus
}

const initialState: TInitialState = {
   authStatus: EAuthStatus.UNKNOWN,
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setAuthStatus: (state, action: PayloadAction<EAuthStatus>) => {
         state.authStatus = action.payload
      },
   },
})

export const { setAuthStatus } = authSlice.actions
