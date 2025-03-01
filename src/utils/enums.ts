export enum EAuthStatus {
   IS_AUTHENTICATED = "IS_AUTHENTICATED",
   UNAUTHENTICATED = "UNAUTHENTICATED",
   UNKNOWN = "UNKNOWN",
}

export enum EProjectRoles {
   ADMIN = "PROJECT_ROLE_ADMIN",
   LEADER = "PROJECT_ROLE_LEADER",
   MEMBER = "PROJECT_ROLE_MEMBER",
}

export enum EUserRoles {
   ADMIN = "USER_ROLE_ADMIN",
   USER = "USER_ROLE_USER",
}

export enum EGenders {
   MALE = "MALE",
   FEMALE = "FEMALE",
   OTHERS = "OTHERS",
}

export enum EAppMessageTypes {
   OAUTH_SUCCESS = "APP_MSG_OAUTH_SUCCESS",
   OAUTH_ERROR = "APP_MSG_OAUTH_ERROR",
}

export enum EProjectInvitationStatus {
   PENDING = "PENDING",
   ACCEPTED = "ACCEPTED",
   DECLINED = "DECLINED",
}

export enum EProjectRequestStatus {
   PENDING = "PENDING",
   ACCEPTED = "ACCEPTED",
   DECLINED = "DECLINED",
}

export enum EQueryStringKeys {
   TASK_ID = "task-id",
   PHASE_ID = "phase-id",
}

export enum ENavigateStates {
   GENERAL_SEARCH_NAVIGATE = "GENERAL_SEARCH_NAVIGATE",
}
