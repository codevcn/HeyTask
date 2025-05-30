import { clientAxios } from "../../configs/api-configs"
import type { TTaskInput, TTaskIdParam } from "./types/input-types"
import type {
  TTaskResponse,
  TTasksResponse,
  TMessageResponse,
  TMsgApiResponse,
} from "./types/output-types"

export const apiGetTasksByPhase = async (phaseId: number): Promise<TTasksResponse> =>
  clientAxios.get(`/tasks/phase/${phaseId}`)

export const apiGetTask = async ({ id }: TTaskIdParam): Promise<TTaskResponse> =>
  clientAxios.get(`/tasks/${id}`)

export const apiCreateTask = async (
  phaseId: number,
  taskName: TTaskInput["taskName"],
  orderIndex: number,
): Promise<TTaskResponse> =>
  clientAxios.post("/tasks", { phase: { id: phaseId }, taskName, orderIndex })

export const apiUpdateTask = async (
  { id }: TTaskIdParam,
  payload: Partial<TTaskInput>,
): Promise<TMsgApiResponse> => clientAxios.put(`/tasks/${id}`, payload)

export const apiDeleteTask = async ({ id }: TTaskIdParam): Promise<TMessageResponse> =>
  clientAxios.delete(`/tasks/${id}`)

export const apiMoveTask = async (
  taskId: number,
  phaseId: number,
  position: number,
): Promise<TMsgApiResponse> =>
  clientAxios.put(`/tasks/${taskId}/move`, {}, { params: { phaseId, position } })
