// đã sửa xong file này

import { convertToTaskStatus, convertUndefinedFieldsToNull } from "../utils/helpers"
import type { TSuccess } from "../utils/types"
import {
  apiCreatePhase,
  apiDeletePhase,
  apiGetPhasesByProject,
  apiUpdatePhase,
} from "./apis/phase-apis"
import { apiGetTasksByPhase } from "./apis/task-apis"
import type { TPhaseData } from "./types"
import { apiGetUser } from "./apis/user-apis"
import type { TPhaseInput } from "./apis/types/input-types"

class PhaseService {
  async getPhases(projectId: number): Promise<TPhaseData[]> {
    const { data } = await apiGetPhasesByProject({ projectId })
    if (!data) throw new Error("No phases found")
    const phasesData: TPhaseData[] = []
    const phases = data.data
    for (const phase of phases) {
      const {
        data: { data: tasks },
      } = await apiGetTasksByPhase(phase.id)
      if (!tasks) throw new Error("No tasks found")
      phasesData.push({
        id: phase.id,
        title: phase.phaseName,
        position: phase.orderIndex,
        description: phase.description,
        taskPreviews: await Promise.all(
          tasks.map(async (task) => {
            const userApiRes = task.assignedToId ? await apiGetUser(task.assignedToId) : null
            return {
              id: task.id,
              title: task.taskName,
              hasDescription: !!task.description,
              position: task.orderIndex,
              taskMembers: userApiRes ? [convertUndefinedFieldsToNull(userApiRes.data.data)] : [],
              status: convertToTaskStatus(task.status),
              dueDate: task.dueDate ?? null,
            }
          }),
        ),
      })
    }
    return phasesData
  }

  async createPhase(projectId: number, phase: TPhaseInput): Promise<TPhaseData> {
    const { phaseName, description, orderIndex, status, startDate } = phase
    const { data } = await apiCreatePhase({
      project: { id: projectId },
      phaseName,
      description: description || "",
      orderIndex,
      status,
      startDate: startDate || new Date().toISOString(),
    })
    if (!data) throw new Error("No phase created")
    const phaseData = data.data
    return {
      id: phaseData.id,
      title: phaseData.phaseName,
      position: phaseData.orderIndex,
      description: phaseData.description,
      taskPreviews: [],
    }
  }

  async updatePhase(projectId: number, phase: TPhaseData): Promise<TPhaseData> {
    const { data } = await apiUpdatePhase(
      { id: phase.id },
      {
        phaseName: phase.title,
        description: phase.description || "",
        orderIndex: phase.position,
        status: "NOT_STARTED",
        startDate: new Date().toISOString(),
        project: { id: projectId },
      },
    )
    if (!data) throw new Error("No phase updated")
    const phaseData = data.data
    return {
      id: phaseData.id,
      title: phaseData.phaseName,
      position: phaseData.orderIndex,
      description: phaseData.description,
      taskPreviews: [],
    }
  }

  async copyPhase(projectId: number, phase: TPhaseInput): Promise<TPhaseData> {
    return await this.createPhase(projectId, phase)
  }

  async deletePhase(phaseId: number): Promise<TSuccess> {
    await apiDeletePhase({ id: phaseId })
    return { success: true }
  }

  async movePhase(projectId: number, phase: TPhaseData): Promise<TSuccess> {
    await this.updatePhase(projectId, phase)
    return { success: true }
  }
}

export const phaseService = new PhaseService()
