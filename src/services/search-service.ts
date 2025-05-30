// đã sửa xong file này

import { projectBackgrounds } from "../lib/project-static-data"
import { apiGeneralSearch } from "./apis/search-apis"
import type { TGeneralSearchData } from "./types"

class SearchService {
  async generalSearch(keyword: string): Promise<TGeneralSearchData> {
    const { data } = await apiGeneralSearch(keyword)
    if (!data)
      return {
        projects: [],
        phases: [],
        tasks: [],
      }
    const searchData = data.data
    return {
      projects: searchData.projects.map((project) => {
        return {
          id: project.id,
          title: project.projectName,
          background: projectBackgrounds[0],
        }
      }),
      phases: searchData.phases.map((phase) => {
        const project = searchData.projects.find((project) => project.id === phase.projectId)
        if (!project) throw new Error("Project not found")
        return {
          id: phase.id,
          title: phase.phaseName,
          project: {
            id: project.id,
            title: project.projectName,
          },
        }
      }),
      tasks: searchData.tasks.map((task) => {
        const phase = searchData.phases.find((phase) => phase.id === task.phaseId)
        if (!phase) throw new Error("Phase not found")
        const project = searchData.projects.find((project) => project.id === phase.projectId)
        if (!project) throw new Error("Project not found")
        return {
          id: task.id,
          title: task.taskName,
          project: {
            id: project.id,
            title: project.projectName,
          },
          phase: {
            id: task.phaseId,
            title: phase.phaseName,
          },
        }
      }),
    }
  }
}

export const searchService = new SearchService()
