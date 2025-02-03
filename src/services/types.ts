import type { EProjectRoles, EUserRoles } from "../utils/enums"

export type TUserData = {
   id: number
   fullName: string
   email: string
   avatar: string | null
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
   invitationLink: string
}

export type TCustomizationData = {
   projectId: number
   background: string | null
}

export type TTaskMemberData = TProjectMemberData

export type TCommentData = {
   id: number
   content: string
   user: TTaskMemberData
   createdAt: string
}

export type TTaskData = {
   id: number
   title: string
   description: string | null
   members: TTaskMemberData[] | null
   comments: TCommentData[] | null
   dueDate: string | null
}

export type TTaskPreviewData = {
   id: number
   title: string
   hasDescription: boolean
   taskMembers: TTaskMemberData[] | null
   position: number
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
