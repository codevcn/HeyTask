import type { TSuccess } from "../utils/types"
import { apiUploadUserAvatar } from "./apis/file-apis"
import { apiSearchUsers, apiUpdateUserPassword, apiUpdateUserProfile } from "./apis/user-apis"
import { convertUserApiData } from "./helpers/convert-api-data"
import type { TSearchUserData, TUploadImageData, TUserProfileData } from "./types"

class UserService {
  async searchUsers(keyword: string): Promise<TSearchUserData[]> {
    const { data } = await apiSearchUsers(keyword)
    const users = data?.data
    return users?.map((user) => convertUserApiData(user)) || []
  }

  async updateProfile(profilePayload: Partial<TUserProfileData>): Promise<TSuccess> {
    await apiUpdateUserProfile({
      avatar: profilePayload.avatar || undefined,
      fullName: profilePayload.fullName || undefined,
    })
    return { success: true }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<TSuccess> {
    await apiUpdateUserPassword({
      oldPassword: currentPassword,
      newPassword,
    })
    return { success: true }
  }

  async uploadImage(image: File): Promise<TUploadImageData> {
    const { data } = await apiUploadUserAvatar(image)
    if (!data) throw new Error("File not uploaded")
    const fileData = data.data
    return {
      imageURL: fileData.filePath,
    }
  }
}

export const userService = new UserService()
