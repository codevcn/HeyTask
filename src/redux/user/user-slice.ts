import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { TUserInProjectData, TUserData } from "../../services/types"

type TInitialState = {
   userData: TUserData | null
   userInProject: TUserInProjectData | null
}

const initialState: TInitialState = {
   userData: null,
   userInProject: null,
}

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<TUserData>) => {
         state.userData = action.payload
      },
      setUserInProject: (state, action: PayloadAction<TUserInProjectData>) => {
         state.userInProject = action.payload
      },
      updateUserInProject: (state, action: PayloadAction<Partial<TUserInProjectData>>) => {
         const currentData = state.userInProject
         if (currentData) {
            Object.assign(currentData, action.payload)
         }
      },
   },
})

export const { setUser, setUserInProject, updateUserInProject } = userSlice.actions
