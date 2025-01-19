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
   title: string
}

export type TCustomizationData = {
   background: string
}

export type TTaskMemberData = {
   fullName: string
   avatar: string | null
}

export type TTaskData = {
   title: string
   description: string
   members: TTaskMemberData[] | null
}

export type TTaskItemPreviewData = {
   id: number
   title: string
   hasDescription: boolean
   firstMember: TTaskMemberData | null
}

export type TPhaseData = {
   id: number
   title: string
   taskPreviews: TTaskItemPreviewData[] | null
}
