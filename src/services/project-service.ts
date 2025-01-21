import { perfomDelay } from "../utils/helpers"
import type { TCustomizationData, TPhaseData, TProjectData, TTaskData } from "./types"

class ProjectService {
   async getProjectData(projectId: number): Promise<TProjectData> {
      await perfomDelay(1000)
      const data = { title: "VCN Project" }
      return data
   }

   async getCustomization(projectId: number): Promise<TCustomizationData> {
      await perfomDelay(1000)
      const data = {
         background:
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2401x1600/ceca11e134be93c2bf61b61bd285fc6f/photo-1691929601779-ead6aeb78d1b.jpg",
      }
      return data
   }

   async getPhases(): Promise<TPhaseData[]> {
      await perfomDelay(1000)
      const data: TPhaseData[] = [
         {
            id: 1,
            title: "Todo",
            position: 1,
            taskPreviews: [
               {
                  id: 1,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  position: 1,
                  firstMember: {
                     id: 1,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 3,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 2,
                  firstMember: {
                     id: 2,
                     avatar: null,
                     fullName: "codevcn",
                  },
               },
            ],
         },
         {
            id: 2,
            title: "In Progress",
            position: 2,
            taskPreviews: [
               {
                  id: 4,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  position: 3,
                  firstMember: {
                     id: 3,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 5,
                  title: "Phân tích & Thiết kế",
                  hasDescription: true,
                  position: 4,
                  firstMember: {
                     id: 4,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 6,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 5,
                  firstMember: {
                     id: 5,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 99,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 6,
                  firstMember: {
                     id: 6,
                     avatar: null,
                     fullName: "Haha vcn",
                  },
               },
               {
                  id: 101,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 7,
                  firstMember: {
                     id: 7,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "mot vo troi giang troi oi",
                  },
               },
               {
                  id: 105,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 8,
                  firstMember: {
                     id: 8,
                     avatar: null,
                     fullName: "1112",
                  },
               },
               {
                  id: 102,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 9,
                  firstMember: {
                     id: 9,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "mot vo troi giang troi oi",
                  },
               },
               {
                  id: 103,
                  title: "Mẫu giao diện",
                  hasDescription: true,
                  position: 10,
                  firstMember: {
                     id: 10,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "mot vo troi giang troi oi",
                  },
               },
            ],
         },
         {
            id: 3,
            title: "Complete",
            position: 3,
            taskPreviews: [
               {
                  id: 11,
                  title: "Lời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầu",
                  hasDescription: true,
                  position: 11,
                  firstMember: {
                     id: 11,
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
            position: 4,
            taskPreviews: [
               {
                  id: 9,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  position: 12,
                  firstMember: {
                     id: 12,
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
            position: 5,
            taskPreviews: [
               {
                  id: 10,
                  title: "Lời mở đầu",
                  hasDescription: true,
                  position: 13,
                  firstMember: {
                     id: 13,
                     avatar:
                        "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
                     fullName: "codevcn",
                  },
               },
               {
                  id: 20,
                  title: "Phân tích & Thiết kế",
                  hasDescription: true,
                  position: 14,
                  firstMember: {
                     id: 14,
                     avatar: null,
                     fullName: "Tiên Tiên",
                  },
               },
            ],
         },
      ]
      // sort data
      data.sort((a, b) => a.position - b.position)
      return data
   }

   async getTaskDetails(taskId: number): Promise<TTaskData> {
      await perfomDelay(1000)
      const data: TTaskData = {
         description: `<p><span style="color: #ced4d9;">oke lala</span><span style="color: #e03e2d;"><em><strong> vcn! no no no.</strong></em></span></p><p><span style="color: #ced4d9;">aa</span></p>`,
         id: taskId,
         members: [
            {
               id: 1,
               avatar:
                  "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
               fullName: "full codevcn",
            },
            {
               id: 2,
               avatar: null,
               fullName: "Lala",
            },
         ],
         title: "Web do homework okay?",
         comments: [
            {
               id: 1,
               content: `<p><span style="color: #ced4d9;">oke lala</span><span style="color: #e03e2d;"><em><strong> vcn! no no no.</strong></em></span></p><p><span style="color: #ced4d9;">aa</span></p>`,
               createdAt: "2025-01-21T15:21:45.219Z",
               user: {
                  id: 1,
                  avatar: null,
                  fullName: "Luu Thien Thien",
               },
            },
            {
               id: 2,
               content: `<p><span style="color: #ced4d9;">oke lala</span><span style="color: #e03e2d;"><em><strong> vcn! no no no.</strong></em></span></p><p><span style="color: #ced4d9;">aa</span></p>`,
               createdAt: "2025-01-21T15:21:45.219Z",
               user: {
                  id: 2,
                  avatar: null,
                  fullName: "Luu Thien Thien",
               },
            },
         ],
      }
      return data
   }
}

export const projectService = new ProjectService()
