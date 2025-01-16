import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { TUserData } from "../../utils/types"

type TInitialState = {
   userData: TUserData | null
}

const initialState: TInitialState = {
   userData: null,
}

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<TUserData>) => {
         state.userData = action.payload
      },
   },
})

export const { setUser } = userSlice.actions
