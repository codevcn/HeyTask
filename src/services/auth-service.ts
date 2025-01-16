import type { TLoginPayload, TRegisterPayload } from "./types"
import type { TSuccess } from "../utils/types"
// import { clientAxios } from "../configs/api-configs"
import { perfomDelay } from "../utils/helpers"

class AuthService {
   async login(payload: TLoginPayload): Promise<TSuccess> {
      // const { data } = await clientAxios.post<TSuccess>("/login", payload)
      await perfomDelay(3000)
      const data = { success: true }
      return data
   }

   async register(payload: TRegisterPayload): Promise<TSuccess> {
      await perfomDelay(3000)
      const data = { success: true }
      return data
   }
}

export const authService = new AuthService()
