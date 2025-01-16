import { perfomDelay } from "../utils/helpers"
import type { TCustomizationData, TWorkspaceData } from "./types"

class WorkspaceService {
   async getWorkspaceData(workspaceId: number): Promise<TWorkspaceData> {
      await perfomDelay(1000)
      const data = { name: "VCN Workspace" }
      return data
   }

   async getCustomization(workspaceId: number): Promise<TCustomizationData> {
      await perfomDelay(1000)
      const data = {
         background:
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2401x1600/ceca11e134be93c2bf61b61bd285fc6f/photo-1691929601779-ead6aeb78d1b.jpg",
      }
      return data
   }
}

export const workspaceService = new WorkspaceService()
