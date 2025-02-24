import { perfomDelay } from "../utils/helpers"
import type {
   TProjectData,
   TUserInProjectData,
   TProjectMemberData,
   TUserData,
   TCreateNewShareLinkData,
   TProjectInvitationData,
   TProjectRequestData,
} from "./types"
import {
   EGenders,
   EProjectInvitationStatus,
   EProjectRequestStatus,
   EProjectRoles,
   EUserRoles,
} from "../utils/enums"
import type { TSuccess, TTaskStatus } from "../utils/types"

const projectMembers: TProjectMemberData[] = [
   {
      id: 1,
      avatar: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
      fullName: "full codevcn",
      email: "demo-email@mail.ru",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.ADMIN,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 2,
      avatar: null,
      fullName: "Lala",
      email: "demo-email@maim.rv",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 3,
      avatar: null,
      fullName: "Lulu",
      email: "demo-email@main.rw",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 4,
      avatar:
         "https://trello-members.s3.amazonaws.com/65b078657d14de9327fcae56/a0cea1a61f9f6f57630a7aeb1f97f679/170.png",
      fullName: "lele vcn",
      email: "demo-email@maio.rx",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 5,
      avatar: null,
      fullName: "Thu Quan Hong Quan",
      email: "demo-email@maip.ry",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 6,
      avatar:
         "https://trello-members.s3.amazonaws.com/65b078657d14de9327fcae56/ca97615375a67bd83bbca24966bf87e7/170.png",
      fullName: "Lam Chan Anh",
      email: "demo-email@maiq.rz",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 7,
      avatar: null,
      fullName: "Baba",
      email: "demo-email@mair.sa",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 8,
      avatar: null,
      fullName: "Baba 2",
      email: "demo-email@mais.sb",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
   {
      id: 9,
      avatar: null,
      fullName: "Bimmmmmmmmmmmmm 123",
      email: "demo-email@mait.sc",
      role: EUserRoles.USER,
      projectRole: EProjectRoles.MEMBER,
      bio: "A full-stack developer passionate about minimalism and efficiency. Always looking for ways to optimize workflows for maximum productivity!",
      birthday: "2000-02-02",
      gender: EGenders.MALE,
      socialLink: "github.com/minhhuydev",
   },
]

const projectInvitations: TProjectInvitationData[] = [
   {
      id: 1,
      projectId: 101,
      sender: { id: 1001 },
      receiver: {
         id: 2001,
         fullName: "Nguyễn Văn A",
         email: "nguyenvana@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.PENDING,
      sendAt: "2025-02-24T10:30:00Z",
   },
   {
      id: 2,
      projectId: 102,
      sender: { id: 1002 },
      receiver: {
         id: 2002,
         fullName: "Trần Thị B",
         email: "tranthib@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.ACCEPTED,
      sendAt: "2025-02-23T14:15:00Z",
   },
   {
      id: 3,
      projectId: 103,
      sender: { id: 1003 },
      receiver: {
         id: 2003,
         fullName: "Lê Văn C",
         email: "levanc@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.DECLINED,
      sendAt: "2025-02-22T08:45:00Z",
   },
   {
      id: 4,
      projectId: 104,
      sender: { id: 1004 },
      receiver: {
         id: 2004,
         fullName: "Phạm Thị D",
         email: "phamthid@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.PENDING,
      sendAt: "2025-02-21T12:00:00Z",
   },
   {
      id: 5,
      projectId: 105,
      sender: { id: 1005 },
      receiver: {
         id: 2005,
         fullName: "Hoàng Văn E",
         email: "hoangvane@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.ACCEPTED,
      sendAt: "2025-02-20T09:20:00Z",
   },
   {
      id: 6,
      projectId: 106,
      sender: { id: 1006 },
      receiver: {
         id: 2006,
         fullName: "Đỗ Thị F",
         email: "dothif@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.DECLINED,
      sendAt: "2025-02-19T16:40:00Z",
   },
   {
      id: 7,
      projectId: 107,
      sender: { id: 1007 },
      receiver: {
         id: 2007,
         fullName: "Ngô Văn G",
         email: "ngovang@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.PENDING,
      sendAt: "2025-02-18T11:10:00Z",
   },
   {
      id: 8,
      projectId: 108,
      sender: { id: 1008 },
      receiver: {
         id: 2008,
         fullName: "Bùi Thị H",
         email: "buithih@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.ACCEPTED,
      sendAt: "2025-02-17T13:25:00Z",
   },
   {
      id: 9,
      projectId: 109,
      sender: { id: 1009 },
      receiver: {
         id: 2009,
         fullName: "Dương Văn I",
         email: "duongvani@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.DECLINED,
      sendAt: "2025-02-16T15:55:00Z",
   },
   {
      id: 10,
      projectId: 110,
      sender: { id: 1010 },
      receiver: {
         id: 2010,
         fullName: "Vũ Thị J",
         email: "vuthij@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectInvitationStatus.PENDING,
      sendAt: "2025-02-15T07:30:00Z",
   },
]

const projectRequests: TProjectRequestData[] = [
   {
      id: 1,
      projectId: 101,
      sender: {
         id: 1001,
         fullName: "Nguyễn Văn A",
         email: "nguyenvana@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.PENDING,
      sendAt: "2025-02-24T10:30:00Z",
   },
   {
      id: 2,
      projectId: 102,
      sender: {
         id: 1002,
         fullName: "Trần Thị B",
         email: "tranthib@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.ACCEPTED,
      sendAt: "2025-02-23T14:15:00Z",
   },
   {
      id: 3,
      projectId: 103,
      sender: {
         id: 1003,
         fullName: "Lê Văn C",
         email: "levanc@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.DECLINED,
      sendAt: "2025-02-22T08:45:00Z",
   },
   {
      id: 4,
      projectId: 104,
      sender: {
         id: 1004,
         fullName: "Phạm Thị D",
         email: "phamthid@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.PENDING,
      sendAt: "2025-02-21T12:00:00Z",
   },
   {
      id: 5,
      projectId: 105,
      sender: {
         id: 1005,
         fullName: "Hoàng Văn E",
         email: "hoangvane@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.ACCEPTED,
      sendAt: "2025-02-20T09:20:00Z",
   },
   {
      id: 6,
      projectId: 106,
      sender: {
         id: 1006,
         fullName: "Đỗ Thị F",
         email: "dothif@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.DECLINED,
      sendAt: "2025-02-19T16:40:00Z",
   },
   {
      id: 7,
      projectId: 107,
      sender: {
         id: 1007,
         fullName: "Ngô Văn G",
         email: "ngovang@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.PENDING,
      sendAt: "2025-02-18T11:10:00Z",
   },
   {
      id: 8,
      projectId: 108,
      sender: {
         id: 1008,
         fullName: "Bùi Thị H",
         email: "buithih@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.ACCEPTED,
      sendAt: "2025-02-17T13:25:00Z",
   },
   {
      id: 9,
      projectId: 109,
      sender: {
         id: 1009,
         fullName: "Dương Văn I",
         email: "duongvani@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.DECLINED,
      sendAt: "2025-02-16T15:55:00Z",
   },
   {
      id: 10,
      projectId: 110,
      sender: {
         id: 1010,
         fullName: "Vũ Thị J",
         email: "vuthij@example.com",
         avatar:
            "https://gravatar.com/avatar/ae1a3a4e0759ad91eafc212b7f887ab7?s=400&d=robohash&r=x",
      },
      status: EProjectRequestStatus.PENDING,
      sendAt: "2025-02-15T07:30:00Z",
   },
]

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
         background:
            "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2401x1600/ceca11e134be93c2bf61b61bd285fc6f/photo-1691929601779-ead6aeb78d1b.jpg",
      }
      return data
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

   async createNewProject(projectTitle: string): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }

   async getProjectInvitations(projectId: number): Promise<TProjectInvitationData[]> {
      await perfomDelay(1000)
      return projectInvitations
   }

   async getProjectRequests(projectId: number): Promise<TProjectRequestData[]> {
      await perfomDelay(1000)
      return projectRequests
   }

   async acceptDeclineRequest(requestId: number, isAccept: boolean): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }
}

export const projectService = new ProjectService()
