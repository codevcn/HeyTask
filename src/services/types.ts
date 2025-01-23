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

export type TProjectData = {
   id: number
   title: string
}

export type TCustomizationData = {
   projectId: number
   background: string
}

export type TTaskMemberData = {
   id: number
   fullName: string
   avatar: string | null
}

export type TCommentData = {
   id: number
   content: string
   user: TTaskMemberData
   createdAt: string
}

export type TTaskData = {
   id: number
   title: string
   description: string
   members: TTaskMemberData[] | null
   comments: TCommentData[] | null
}

export type TTaskItemPreviewData = {
   id: number
   title: string
   hasDescription: boolean
   firstMember: TTaskMemberData | null
   position: number
}

export type TPhaseData = {
   id: number
   title: string
   taskPreviews: TTaskItemPreviewData[] | null
   position: number
}

export type TCommentFileData = {
   id: number
   fileName: string
   fileSize: string
   uploadedAt: string
   url: string
}

export type TUploadedFileData = {
   id: number
   url: string
}
