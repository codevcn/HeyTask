import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TUser } from "../../utils/types"

type TInitialState = {
   userData: TUser | null
}

const initialState: TInitialState = {
   userData: null,
}

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<TUser>) => {
         state.userData = action.payload
      },
   },
})

export const { setUser } = userSlice.actions
