import {
  convertToApiTaskStatus,
  convertToTaskStatus,
  convertUndefinedFieldsToNull,
} from "../utils/helpers"
import type { TTaskFileData, TTaskData, TUploadedFileData, TTaskPreviewData } from "./types"
import type { TSuccess, TTaskStatus } from "../utils/types"
import {
  apiCreateTask,
  apiDeleteTask,
  apiGetTask,
  apiMoveTask,
  apiUpdateTask,
} from "./apis/task-apis"
import { apiGetCommentsByTask } from "./apis/comment-apis"
import { convertUserApiData } from "./helpers/convert-api-data"
import { apiGetUser } from "./apis/user-apis"
import { apiUploadTaskFile, apiGetFileDetails } from "./apis/file-apis"
import type { TTaskInput } from "./apis/types/input-types"
import { apiAddMemberToATask, apiRemoveMemberFromATask } from "./apis/member-apis"

class TaskService {
  async getTaskDetails(taskId: number): Promise<TTaskData> {
    const [taskResponse, commentsResponse] = await Promise.all([
      apiGetTask({ id: taskId }),
      apiGetCommentsByTask(taskId),
    ])
    const {
      data: { data: taskData },
    } = taskResponse
    const {
      data: { data: commentsData },
    } = commentsResponse
    if (!taskData) throw new Error("Task not found")
    const comments = await Promise.all(
      commentsData?.map(async (comment) => {
        const {
          data: { data: userData },
        } = await apiGetUser(comment.userId)
        if (!userData) throw new Error("User not found")
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          user: { ...convertUserApiData(userData), projectRole: comment.userRole },
          isTaskResult: false,
        }
      }) || [],
    )
    const fetchedTaskMember = taskData.assignedToId ? await apiGetUser(taskData.assignedToId) : null
    return {
      comments,
      status: convertToTaskStatus(taskData.status),
      description: taskData.description,
      dueDate: taskData.dueDate || null,
      id: taskData.id,
      members: fetchedTaskMember ? [convertUndefinedFieldsToNull(fetchedTaskMember.data.data)] : [],
      title: taskData.taskName,
    }
  }

  async uploadTaskFile(file: File, taskId: number, userId: number): Promise<TUploadedFileData> {
    const { data } = await apiUploadTaskFile({ file, taskId, userId })
    if (!data) throw new Error("File not uploaded")
    const fileData = data.data
    return {
      id: fileData.id,
      url: fileData.filePath,
    }
  }

  async getTaskFileDetails(fileId: TTaskFileData["id"]): Promise<TTaskFileData> {
    const {
      data: { data: fileData },
    } = await apiGetFileDetails(Number(fileId))
    if (!fileData) throw new Error("File not found")
    return {
      id: fileData.id.toString(),
      fileName: fileData.fileName,
      fileSize: fileData.fileSize.toString(),
      uploadedAt: fileData.createdAt,
    }
  }

  async handleMarkTaskComplete(taskId: number, newStatus: TTaskStatus): Promise<void> {
    await apiUpdateTask({ id: taskId }, { status: convertToApiTaskStatus(newStatus) })
  }

  async deleteTask(taskId: number): Promise<TSuccess> {
    await apiDeleteTask({ id: taskId })
    return { success: true }
  }

  async updateTaskForPreview(taskId: number, taskData: Partial<TTaskInput>): Promise<TSuccess> {
    await apiUpdateTask({ id: taskId }, taskData)
    return {
      success: true,
    }
  }

  async createNewTask(
    phaseId: number,
    taskName: string,
    orderIndex: number,
  ): Promise<TTaskPreviewData> {
    const {
      data: { data: task },
    } = await apiCreateTask(phaseId, taskName, orderIndex)
    if (!task) throw new Error("Task not created")
    return {
      id: task.id,
      title: task.taskName,
      hasDescription: !!task.description,
      taskMembers: task.assignedToId
        ? [convertUndefinedFieldsToNull(await apiGetUser(task.assignedToId))]
        : [],
      position: task.orderIndex,
      status: task.status as TTaskStatus,
      dueDate: task.dueDate || null,
    }
  }

  async updateTask(
    phaseId: number,
    taskId: number,
    taskData: Partial<TTaskData>,
  ): Promise<TSuccess> {
    await apiUpdateTask(
      { id: taskId },
      {
        taskName: taskData.title,
        description: taskData.description || "",
        dueDate: taskData.dueDate || undefined,
        orderIndex: 0,
        phase: {
          id: phaseId,
        },
      },
    )
    return {
      success: true,
    }
  }

  async addMemberToATask(taskId: number, userId: number, projectId: number): Promise<TSuccess> {
    await apiAddMemberToATask({ taskId, userId, projectId })
    return { success: true }
  }

  async removeMemberFromATask(taskId: number): Promise<TSuccess> {
    await apiRemoveMemberFromATask(taskId)
    return { success: true }
  }

  async moveTask(taskId: number, phaseId: number, position: number): Promise<TSuccess> {
    await apiMoveTask(taskId, phaseId, position)
    return { success: true }
  }
}

export const taskService = new TaskService()
