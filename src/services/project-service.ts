import axios from "axios"
import { perfomDelay, randomInteger } from "../utils/helpers"
import type {
   TTaskFileData,
   TCustomizationData,
   TPhaseData,
   TProjectData,
   TTaskData,
   TUploadedFileData,
   TTaskMemberData,
   TUserInProjectData,
   TProjectMemberData,
   TUserData,
   TCreateNewShareLinkData,
} from "./types"
import { EProjectRoles, EUserRoles } from "../utils/enums"
import type { TTaskStatus } from "../utils/types"

export const projectMembers: TProjectMemberData[] = [
   {
      id: 1,
      avatar: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
      fullName: "full codevcn",
      email: "demo-email@mail.ru",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.ADMIN,
   },
   {
      id: 2,
      avatar: null,
      fullName: "Lala",
      email: "demo-email@maim.rv",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 3,
      avatar: null,
      fullName: "Lulu",
      email: "demo-email@main.rw",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 4,
      avatar:
         "https://trello-members.s3.amazonaws.com/65b078657d14de9327fcae56/a0cea1a61f9f6f57630a7aeb1f97f679/170.png",
      fullName: "lele vcn",
      email: "demo-email@maio.rx",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 5,
      avatar: null,
      fullName: "Thu Quan Hong Quan",
      email: "demo-email@maip.ry",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 6,
      avatar:
         "https://trello-members.s3.amazonaws.com/65b078657d14de9327fcae56/ca97615375a67bd83bbca24966bf87e7/170.png",
      fullName: "Lam Chan Anh",
      email: "demo-email@maiq.rz",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 7,
      avatar: null,
      fullName: "Baba",
      email: "demo-email@mair.sa",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 8,
      avatar: null,
      fullName: "Baba 2",
      email: "demo-email@mais.sb",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
   {
      id: 9,
      avatar: null,
      fullName: "Bimmmmmmmmmmmmm 123",
      email: "demo-email@mait.sc",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
   },
]

export const taskMembers: TTaskMemberData[] = projectMembers

class ProjectService {
   async getUserInfoInProject(userId: number): Promise<TUserInProjectData> {
      await perfomDelay(1000)
      const data: TUserInProjectData = {
         projectRole: EProjectRoles.ADMIN,
      }
      return data
   }

   async getProjectData(projectId: number): Promise<TProjectData> {
      await perfomDelay(1000)
      const data: TProjectData = {
         title: "VCN Project",
         id: projectId,
         members: projectMembers,
         shareLink: "http://localhost:5173/projects/1",
         description: "",
         starred: false,
      }
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
            description: "desc 1",
            taskPreviews: [
               {
                  id: 1,
                  title: "Lời mở đầu 1",
                  hasDescription: true,
                  position: 0,
                  taskMembers: taskMembers.slice(0, 5),
                  status: "uncomplete",
                  dueDate: "2025-02-14T09:45:11.925653Z",
               },
               {
                  id: 3,
                  title: "Mẫu giao diện 1",
                  hasDescription: true,
                  position: 1,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-02-16T09:45:11.925653Z",
               },
            ],
         },
         {
            id: 2,
            title: "In Progress",
            position: 2,
            description: "desc 2",
            taskPreviews: [
               {
                  id: 4,
                  title: "Lời mở đầu 2",
                  hasDescription: true,
                  position: 0,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: null,
               },
               {
                  id: 5,
                  title: "Web to do okay? vcn",
                  hasDescription: true,
                  position: 1,
                  taskMembers: taskMembers.slice(0, 4),
                  status: "uncomplete",
                  dueDate: "2025-02-14T09:45:11.925653Z",
               },
               {
                  id: 6,
                  title: "Mẫu giao diện 2",
                  hasDescription: true,
                  position: 2,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-01-05T08:39:41.890Z",
               },
               {
                  id: 99,
                  title: "Mẫu giao diện 3",
                  hasDescription: true,
                  position: 3,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-03-15T09:45:11.925653Z",
               },
               {
                  id: 101,
                  title: "Mẫu giao diện 4",
                  hasDescription: true,
                  position: 4,
                  taskMembers: taskMembers.slice(5, 8),
                  status: "uncomplete",
                  dueDate: "2025-01-07T08:39:41.890Z",
               },
               {
                  id: 105,
                  title: "Mẫu giao diện 5",
                  hasDescription: true,
                  position: 5,
                  taskMembers: taskMembers.slice(3, 6),
                  status: "uncomplete",
                  dueDate: "2025-02-16T09:45:11.925653Z",
               },
               {
                  id: 102,
                  title: "Mẫu giao diện 6",
                  hasDescription: true,
                  position: 6,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-03-15T09:45:11.925653Z",
               },
               {
                  id: 103,
                  title: "Mẫu giao diện 7",
                  hasDescription: true,
                  position: 7,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-02-16T09:45:11.925653Z",
               },
            ],
         },
         {
            id: 3,
            title: "Complete",
            position: 3,
            description: "desc 3",
            taskPreviews: [
               {
                  id: 11,
                  title: "Lời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầuLời mở đầu",
                  hasDescription: true,
                  position: 0,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: null,
               },
            ],
         },
         {
            id: 4,
            title: "Done",
            position: 4,
            description: "desc 4",
            taskPreviews: [
               {
                  id: 9,
                  title: "Lời mở đầu 3",
                  hasDescription: true,
                  position: 0,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-01-12T08:39:41.890Z",
               },
            ],
         },
         {
            id: 5,
            title: "Need Help",
            position: 5,
            description: "desc 5",
            taskPreviews: [
               {
                  id: 10,
                  title: "Lời mở đầu 4",
                  hasDescription: true,
                  position: 0,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: null,
               },
               {
                  id: 20,
                  title: "Phân tích & Thiết kế",
                  hasDescription: true,
                  position: 1,
                  taskMembers: null,
                  status: "uncomplete",
                  dueDate: "2025-02-20T09:45:11.925653Z",
               },
            ],
         },
      ]
      return data
   }

   async getTaskDetails(taskId: number): Promise<TTaskData> {
      await perfomDelay(1000)
      const data: TTaskData = {
         description: `<p><span style="color: #ced4d9;">oke lala</span><span style="color: #3598db;"><em><strong> vcn! no no no.<a title="Gardfield and friends Cartoon!!!" href="https://www.imdb.com/title/tt0094469/" target="_blank" rel="noopener">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</a></strong></em></span></p><h1><span style="color: #ced4d9;">aaadadadda</span></h1><ol><li><span style="color: #ced4d9;">aaaa</span></li><li><span style="color: #ced4d9;">bbbb</span></li><li><span style="color: #ced4d9;">cc</span></li></ol><p style="text-align: center;"><span style="color: #ced4d9;">T.T</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><ul><li style="text-align: left;"><span style="color: #ced4d9;">1111</span></li><li style="text-align: left;"><span style="color: #ced4d9;">222</span></li><li style="text-align: left;"><span style="color: #ced4d9;">333</span></li><li style="text-align: left;"><span style="color: #ced4d9;">4</span></li><li style="text-align: left;">&nbsp;</li></ul>`,
         id: taskId,
         members: null,
         title: "Web to do okay? vcn",
         comments: null,
         dueDate: "2025-01-30T08:39:41.890Z",
         status: "uncomplete",
      }
      return data
   }

   async uploadTaskFile(file: File): Promise<TUploadedFileData> {
      const formData = new FormData()
      formData.append("file", file)
      await perfomDelay(1000)
      const data = {
         id: 1,
         // url: "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=ekgd62lu&dl=0",
         url:
            randomInteger(1, 2) % 2 === 0
               ? "https://res.cloudinary.com/doe8ogwij/image/upload/v1734920687/web-xem-phim/images/odlhurychbvf3iukjzkg.jpg"
               : "https://res.cloudinary.com/doe8ogwij/image/upload/v1734891046/web-xem-phim/images/dg0whhotakygd4cja442.png",
      }
      return data
   }

   async getTaskFileDetails(fileId: TTaskFileData["id"]): Promise<TTaskFileData> {
      await perfomDelay(1000)
      const data: TTaskFileData = {
         id: fileId,
         fileName: "file cua loi",
         fileSize: "111KB",
         uploadedAt: "2025-01-21T15:21:45.219Z",
         downloadUrl:
            "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=ekgd62lu&dl=1",
      }
      return data
   }

   async downloadTaskFile(): Promise<void> {
      await perfomDelay(1000)
      const { data } = await axios.get(
         "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=3yzhcmdq&dl=1",
         { responseType: "blob" },
      )
      console.log(">>> data:", data)
   }

   async leaveProject(): Promise<void> {
      await perfomDelay(1000)
   }

   async sendProjectInvitations(...userIds: TUserData["id"][]): Promise<void> {
      await perfomDelay(1000)
   }

   async joinProject(projectId: number): Promise<void> {
      await perfomDelay(1000)
   }

   async markAsCompleteTask(taskId: number, taskStatus: TTaskStatus): Promise<void> {
      await perfomDelay(1000)
   }

   async createNewShareLink(projectId: number): Promise<TCreateNewShareLinkData> {
      await perfomDelay(1000)
      const data: TCreateNewShareLinkData = {
         newshareLink: "https://codevcn.net",
      }
      return data
   }

   async deleteShareLink(projectId: number): Promise<void> {
      await perfomDelay(1000)
   }
}

export const projectService = new ProjectService()
