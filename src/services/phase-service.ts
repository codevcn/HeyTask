import { EGenders, EProjectRoles, EUserRoles } from "../utils/enums"
import { perfomDelay } from "../utils/helpers"
import { TSuccess } from "../utils/types"
import type { TPhaseData, TTaskMemberData } from "./types"

const taskMembers: TTaskMemberData[] = [
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
]

const phases: TPhaseData[] = [
   {
      id: 1,
      title: "Todo",
      position: 0,
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
      position: 1,
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
      position: 2,
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
      position: 3,
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
      position: 4,
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

class PhaseService {
   async getPhases(): Promise<TPhaseData[]> {
      await perfomDelay(1000)
      return phases
   }

   async copyPhase(phaseId: number): Promise<TPhaseData> {
      await perfomDelay(1000)
      return phases.find(({ id }) => id === phaseId)!
   }

   async deletePhase(phaseId: number): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }

   async movePhase(projectId: number, phaseId: number, position: number): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }
}

export const phaseService = new PhaseService()
