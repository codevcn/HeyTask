import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { TCustomizationData, TListData, TWorkspaceData } from "../../services/types"

type TLoading = "getting-workspace-data" | null

type TInitialState = {
   workspace: TWorkspaceData | null
   loading: TLoading
   customization: TCustomizationData | null
   lists: TListData[] | null
}

const initialState: TInitialState = {
   workspace: null,
   loading: null,
   customization: null,
   lists: null,
}

export const workspaceSlice = createSlice({
   name: "workspace",
   initialState,
   reducers: {
      setWorkspace: (state, action: PayloadAction<TWorkspaceData>) => {
         state.workspace = action.payload
      },
      setLoading: (state, action: PayloadAction<TLoading>) => {
         state.loading = action.payload
      },
      setCustomization: (state, action: PayloadAction<TCustomizationData>) => {
         state.customization = action.payload
      },
      setLists: (state, action: PayloadAction<TListData[]>) => {
         state.lists = action.payload
      },
   },
})

export const { setWorkspace, setLoading, setCustomization, setLists } = workspaceSlice.actions
