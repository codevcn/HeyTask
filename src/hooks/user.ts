import { useAppSelector } from "./redux"

export const useUser = () => {
   const { userData } = useAppSelector(({ user }) => user)
   return userData
}
