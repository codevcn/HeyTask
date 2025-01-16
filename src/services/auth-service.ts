import type { TLoginPayload, TRegisterPayload } from "./types"
import type { TSuccess, TUser } from "../utils/types"
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

   async checkAuth(): Promise<TUser> {
      await perfomDelay(1000)
      const data = { id: 1, email: "demo-email@mail.ru", fullName: "demo name" }
      return data
   }
}

export const authService = new AuthService()
