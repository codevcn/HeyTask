import { clientAxios } from "../../configs/api-configs"
import type { TProjectInput, TProjectIdParam } from "./types/input-types"
import type { TProjectResponse, TProjectsResponse, TMessageResponse } from "./types/output-types"

export const apiGetProjects = async (): Promise<TProjectsResponse> => clientAxios.get("/projects")

export const apiGetProject = async ({ projectId }: TProjectIdParam): Promise<TProjectResponse> =>
  clientAxios.get(`/projects/${projectId}`)

export const apiCreateProject = async (payload: TProjectInput): Promise<TProjectResponse> =>
  clientAxios.post("/projects", payload)

export const apiUpdateProject = async (
  { projectId }: TProjectIdParam,
  payload: Partial<TProjectInput>,
): Promise<TProjectResponse> => clientAxios.put(`/projects/${projectId}`, payload)

export const apiDeleteProject = async ({ projectId }: TProjectIdParam): Promise<TMessageResponse> =>
  clientAxios.delete(`/projects/${projectId}`)

export const apiLeaveProject = async ({ projectId }: TProjectIdParam): Promise<TMessageResponse> =>
  clientAxios.delete(`/projects/${projectId}/leave`)
