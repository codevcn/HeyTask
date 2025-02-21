import type { EGenders, EProjectRoles, EUserRoles } from "../utils/enums"
import type { TTaskStatus } from "../utils/types"

export type TUserProfileData = {
   fullName: string
   bio: string | null
   birthday: string | null
   gender: EGenders
   socialLink: string | null
   avatar: string | null
}

export type TUserData = TUserProfileData & {
   id: number
   email: string
   role: EUserRoles
}

export type TLoginPayload = {
   email: string
   password: string
}

export type TRegisterPayload = {
   fullName: string
   email: string
   password: string
   reTypePassword: string
}

export type TUserInProjectData = {
   projectRole: EProjectRoles
}

export type TProjectMemberData = TUserData & TUserInProjectData

export type TProjectData = {
   id: number
   title: string
   members: TProjectMemberData[]
   shareLink: string | null
   description: string | null
   background: string | null
   starred: boolean
}

export type TTaskMemberData = TUserData & TUserInProjectData

export type TCommentData = {
   id: number
   content: string
   user: TTaskMemberData
   createdAt: string
   isTaskResult: boolean
}

export type TTaskData = {
   id: number
   title: string
   description: string | null
   members: TTaskMemberData[] | null
   comments: TCommentData[] | null
   dueDate: string | null
   status: TTaskStatus
}

export type TTaskPreviewData = {
   id: number
   title: string
   hasDescription: boolean
   taskMembers: TTaskMemberData[] | null
   position: number
   status: TTaskStatus
   dueDate: string | null
}

export type TPhaseData = {
   id: number
   title: string
   taskPreviews: TTaskPreviewData[] | null
   position: number
   description: string | null
}

export type TTaskFileData = {
   id: string
   fileName: string
   fileSize: string
   uploadedAt: string
   downloadUrl: string
}

export type TUploadedFileData = {
   id: number
   url: string
}

export type TCreateNewShareLinkData = {
   newshareLink: string
}

export type TProjectPreviewData = {
   id: number
   title: string
   background: string | null
   starred: boolean
}

export type TSearchUserData = {
   id: number
   fullName: string
   email: string
   avatar: string | null
   role: EUserRoles
}

export type TUploadPhotoData = {
   imageURL: string
}

export type TGoogleOAuthData = {
   clientId: string
   redirectURI: string
   scope: string
}
