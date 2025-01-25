import { TUserData } from "../services/types"
import { useAppSelector } from "./redux"

export const useUser = (): TUserData | null => {
   const { userData } = useAppSelector(({ user }) => user)
   return userData
}
