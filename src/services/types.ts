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

export type TWorkspaceData = {
   title: string
}

export type TCustomizationData = {
   background: string
}

export type TCardMemberData = {
   fullName: string
   avatar: string | null
}

export type TCardItemPreviewData = {
   id: number
   title: string
   hasDescription: boolean
   firstMember: TCardMemberData | null
}

export type TListData = {
   id: number
   title: string
   cards: TCardItemPreviewData[] | null
}
