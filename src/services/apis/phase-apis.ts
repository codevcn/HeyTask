import { clientAxios } from "../../configs/api-configs"
import type { TPhaseInput, TPhaseIdParam, TProjectIdParam } from "./types/input-types"
import type { TPhaseResponse, TPhasesResponse, TMessageResponse } from "./types/output-types"

export const apiGetPhasesByProject = async ({
  projectId,
}: TProjectIdParam): Promise<TPhasesResponse> => clientAxios.get(`/phases/project/${projectId}`)

export const apiGetPhase = async ({ id }: TPhaseIdParam): Promise<TPhaseResponse> =>
  clientAxios.get(`/phases/${id}`)

export const apiCreatePhase = async (payload: TPhaseInput): Promise<TPhaseResponse> =>
  clientAxios.post("/phases", payload)

export const apiUpdatePhase = async (
  { id }: TPhaseIdParam,
  payload: TPhaseInput,
): Promise<TPhaseResponse> => clientAxios.put(`/phases/${id}`, payload)

export const apiDeletePhase = async ({ id }: TPhaseIdParam): Promise<TMessageResponse> =>
  clientAxios.delete(`/phases/${id}`)
