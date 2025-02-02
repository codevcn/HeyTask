import type { TLoginPayload, TRegisterPayload, TUserData } from "./types"
import type { TSuccess } from "../utils/types"
// import { clientAxios } from "../configs/api-configs"
import { perfomDelay } from "../utils/helpers"
import { EUserRoles } from "../utils/enums"

class AuthService {
   async login(payload: TLoginPayload): Promise<TSuccess> {
      await perfomDelay(3000)
      const data: TSuccess = { success: true }
      return data
   }

   async register(payload: TRegisterPayload): Promise<TSuccess> {
      await perfomDelay(3000)
      const data: TSuccess = { success: true }
      return data
   }

   async checkAuth(): Promise<TUserData> {
      await perfomDelay(1000)
      const data: TUserData = {
         id: 1,
         email: "demo-email@mail.ru",
         fullName: "demo name",
         avatar: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
         role: EUserRoles.USER,
      }
      return data
   }
}

export const authService = new AuthService()
