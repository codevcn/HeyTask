import { EUserRoles } from "../utils/enums"
import { perfomDelay } from "../utils/helpers"
import { TSuccess } from "../utils/types"
import type { TSearchUserData, TUploadImageData, TUserProfileData } from "./types"

export const staticUsers: TSearchUserData[] = [
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
      avatar: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
      fullName: "UUU",
      email: "UUU@xxx.ssss",
      role: EUserRoles.USER,
   },
]

class UserService {
   async searchUsers(keyword: string): Promise<TSearchUserData[]> {
      await perfomDelay(1000)
      const data: TSearchUserData[] = staticUsers
      return data
   }

   async updateProfile(profilePayload: Partial<TUserProfileData>): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }

   async updatePassword(currentPassword: string, newPassword: string): Promise<TSuccess> {
      await perfomDelay(1000)
      return { success: true }
   }

   async uploadImage(image: Blob): Promise<TUploadImageData> {
      await perfomDelay(1000)
      return {
         imageURL: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
      }
   }
}

export const userService = new UserService()
