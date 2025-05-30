import { projectService } from "./project-service"
import { TProjectPreviewData } from "./types"

class WorkspaceService {
  async getProjects(): Promise<TProjectPreviewData[]> {
    const projects = await projectService.getProjects()
    if (!projects) throw new Error("Projects not found")
    return projects
  }
}

export const workspaceService = new WorkspaceService()
