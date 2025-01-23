import { perfomDelay } from "../utils/helpers"
import type {
   TCommentFileData,
   TCustomizationData,
   TPhaseData,
   TProjectData,
   TTaskData,
   TUploadedFileData,
} from "./types"

class ProjectService {
   async getProjectData(projectId: number): Promise<TProjectData> {
      await perfomDelay(1000)
      const data: TProjectData = { title: "VCN Project", id: projectId }
      return data
   }

   async getCustomization(projectId: number): Promise<TCustomizationData> {
      await perfomDelay(1000)
      const data = {
         projectId,
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
         description: `<p><span style="color: #ced4d9;">oke lala</span><span style="color: #3598db;"><em><strong> vcn! no no no.<a title="Gardfield and friends Cartoon!!!" href="https://www.imdb.com/title/tt0094469/" target="_blank" rel="noopener">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</a></strong></em></span></p><h1><span style="color: #ced4d9;">aaadadadda</span></h1><ol><li><span style="color: #ced4d9;">aaaa</span></li><li><span style="color: #ced4d9;">bbbb</span></li><li><span style="color: #ced4d9;">cc</span></li></ol><p style="text-align: center;"><span style="color: #ced4d9;">T.T</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><ul><li style="text-align: left;"><span style="color: #ced4d9;">1111</span></li><li style="text-align: left;"><span style="color: #ced4d9;">222</span></li><li style="text-align: left;"><span style="color: #ced4d9;">333</span></li><li style="text-align: left;"><span style="color: #ced4d9;">4</span></li><li style="text-align: left;">&nbsp;</li></ul>`,
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
            {
               id: 3,
               content: `<p>dadadada<span class="css-rich-file-title-template" data-ht-file-url="https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&amp;st=ekgd62lu&amp;dl=0" data-ht-file-id="1">Danh_s&aacute;ch_lớp_D21CQCN01-N.xlsx</span></p>`,
               createdAt: "2025-01-22T10:21:45.219Z",
               user: {
                  id: 3,
                  avatar: null,
                  fullName: "Luu Thien Thien",
               },
            },
         ],
      }
      return data
   }

   async uploadTaskFile(file: File): Promise<TUploadedFileData> {
      const formData = new FormData()
      formData.append("file", file)
      await perfomDelay(1000)
      const data = {
         id: 1,
         url: "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=ekgd62lu&dl=0",
      }
      return data
   }

   async getCommentFileDetails(fileId: number): Promise<TCommentFileData> {
      await perfomDelay(1000)
      const data: TCommentFileData = {
         id: fileId,
         fileName: "file cua loi",
         fileSize: "111KB",
         uploadedAt: "2025-01-21T15:21:45.219Z",
         url: "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=ekgd62lu&dl=0",
      }
      return data
   }
}

export const projectService = new ProjectService()
