import { perfomDelay } from "../utils/helpers"
import type { TCustomizationData, TListData, TWorkspaceData } from "./types"

class WorkspaceService {
   async getWorkspaceData(workspaceId: number): Promise<TWorkspaceData> {
      await perfomDelay(1000)
      const data = { title: "VCN Workspace" }
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

   async getLists(): Promise<TListData[]> {
      await perfomDelay(1000)
      const data: TListData[] = [
         {
            id: 1,
            title: "Todo",
            cards: [
               {
                  id: 1,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 3,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  firstMember: {
                     avatar: null,
                     fullName: "codevcn",
                  },
               },
            ],
         },
         {
            id: 2,
            title: "In Progress",
            cards: [
               {
                  id: 4,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 5,
                  title: "Phân tích & Thiết kế",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 6,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
            ],
         },
         {
            id: 3,
            title: "Complete",
            cards: [
               {
                  id: 11,
                  title: "Lời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầu",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
            ],
         },
         {
            id: 4,
            title: "Done",
            cards: [
               {
                  id: 9,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
            ],
         },
         {
            id: 5,
            title: "Need Help",
            cards: [
               {
                  id: 10,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  firstMember: {
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 20,
                  title: "Phân tích & Thiết kế",
                  hasDescription: true,
                  firstMember: {
                     avatar: null,
                     fullName: "Tiên Tiên",
                  },
               },
            ],
         },
      ]
      return data
   }
}

export const workspaceService = new WorkspaceService()
