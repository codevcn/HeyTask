import { EGenders } from "../../utils/enums"
import { EUserRoles } from "../../utils/enums"
import type { TUser } from "../apis/types/output-types"
import type { TUserData } from "../types"

export const convertUserApiData = (apiData: TUser): TUserData => ({
  id: apiData.id,
  socialLinks: apiData.socialLinks || null,
  email: apiData.email,
  fullName: apiData.fullname,
  avatar: apiData.avatar || null,
  role: EUserRoles.USER,
  birthday: apiData.birthday || null,
  gender: apiData.gender || EGenders.MALE,
  bio: apiData.bio || null,
  emailVerified: apiData.emailVerified || false,
})
