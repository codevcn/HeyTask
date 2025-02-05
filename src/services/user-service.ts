import { EUserRoles } from "../utils/enums"
import { perfomDelay } from "../utils/helpers"
import type { TUserData } from "./types"

export const staticUsers: TUserData[] = [
   {
      id: 9,
      avatar: null,
      fullName: "Bimmmmmmmmmmmmm 123",
      email: "demo-email@mait.sc",
      role: EUserRoles.USER,
   },
   {
      id: 10,
      avatar: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
      fullName: "Lala 123",
      email: "email222@mail.ru",
      role: EUserRoles.ADMIN,
   },
   {
      id: 11,
      avatar: null,
      fullName: "Bimmmmmmmmmmmmm 123",
      email: "demo-email@mait.sc",
      role: EUserRoles.USER,
   },
   {
      id: 12,
      avatar:
         "https://trello-members.s3.amazonaws.com/65b078657d14de9327fcae56/a0cea1a61f9f6f57630a7aeb1f97f679/170.png",
      fullName: "UUU",
      email: "UUU@xxx.ssss",
      role: EUserRoles.USER,
   },
]

class UserService {
   async searchUsers(keyword: string): Promise<TUserData[]> {
      await perfomDelay(1000)
      const data: TUserData[] = staticUsers
      return data
   }
}

export const userService = new UserService()
