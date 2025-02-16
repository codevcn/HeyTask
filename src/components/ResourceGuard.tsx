import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect, useState } from "react"
import { EAuthStatus, EProjectRoles } from "../utils/enums"
import { RouteLoading } from "./Loadings"
import { useUser } from "../hooks/user"
import { authService } from "../services/auth-service"
import { setAuthStatus } from "../redux/auth/auth-slice"
import { setUser } from "../redux/user/user-slice"
import { toast } from "react-toastify"
import {
   checkAtLeastUserPermission,
   checkUserPermission,
   checkUserPermissions,
   type TAllPermissions,
} from "../configs/user-permissions"

type TGuardProps = {
   children: JSX.Element
   fallback?: JSX.Element
}

const AuthGuard = ({ children, fallback }: TGuardProps) => {
   const { authStatus } = useAppSelector(({ auth }) => auth)
   const user = useUser()
   const [isValid, setIsValid] = useState<boolean>(false)
   const navigate = useNavigate()
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (authStatus === EAuthStatus.IS_AUTHENTICATED && user) {
         setIsValid(true)
      } else if (authStatus === EAuthStatus.UNAUTHENTICATED) {
         setIsValid(false)
         toast.error("Phiên đăng nhập hết hạn hoặc người dùng không có quyền truy cập tài nguyên.")
         navigate("/login")
      } else {
         authService
            .checkAuth()
            .then((res) => {
               dispatch(setAuthStatus(EAuthStatus.IS_AUTHENTICATED))
               dispatch(setUser(res))
            })
            .catch(() => {
               dispatch(setAuthStatus(EAuthStatus.UNAUTHENTICATED))
            })
      }
   }, [authStatus, user])

   if (isValid) {
      return children
   }

   return fallback || <></>
}

type TResourceGuardProps = {
   children: JSX.Element
   nonGuardRoutes: string[]
}

export const RouteGuard = ({ children, nonGuardRoutes }: TResourceGuardProps) => {
   if (nonGuardRoutes.includes(useLocation().pathname)) {
      return children
   }
   return <AuthGuard fallback={<RouteLoading />}>{children}</AuthGuard>
}

type TProjectRoleGuardProps = {
   children: JSX.Element
   permissions: TAllPermissions[]
   userProjectRole: EProjectRoles
   fallback?: JSX.Element
   checkAtLeast?: boolean
}

export const ProjectRoleGuard = ({
   children,
   permissions,
   userProjectRole,
   fallback,
   checkAtLeast,
}: TProjectRoleGuardProps) => {
   if (permissions.length > 1) {
      if (checkAtLeast && checkAtLeastUserPermission(userProjectRole, ...permissions)) {
         return children
      } else if (checkUserPermissions(userProjectRole, ...permissions)) {
         return children
      }
   } else if (checkUserPermission(userProjectRole, permissions[0])) {
      return children
   }
   return fallback || <></>
}
