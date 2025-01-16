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
   name: string
}

export type TCustomizationData = {
   background: string
}
