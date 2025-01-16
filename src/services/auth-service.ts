import type { TLoginPayload, TRegisterPayload } from "./types"
import type { TSuccess, TUserData } from "../utils/types"
// import { clientAxios } from "../configs/api-configs"
import { perfomDelay } from "../utils/helpers"

class AuthService {
   async login(payload: TLoginPayload): Promise<TSuccess> {
      await perfomDelay(3000)
      const data = { success: true }
      return data
   }

   async register(payload: TRegisterPayload): Promise<TSuccess> {
      await perfomDelay(3000)
      const data = { success: true }
      return data
   }

   async checkAuth(): Promise<TUserData> {
      await perfomDelay(1000)
      const data = {
         id: 1,
         email: "demo-email@mail.ru",
         fullName: "demo name",
         avatar: "https://trello-logos.s3.amazonaws.com/7c17ee5f87fa99637dce66430e395d97/170.png",
      }
      return data
   }
}

export const authService = new AuthService()
