import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import type { TProjectPreviewData } from "../../services/types"
import { projectService } from "../../services/project-service"
import { EInternalEvents, eventEmitter } from "../../utils/events"
import { SpaceDashboard } from "@mui/icons-material"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"

type TProjectItemProps = {
  project: TProjectPreviewData
}

const ProjectItem = ({ project }: TProjectItemProps) => {
  const { id, title, background } = project

  return (
    <NavLink
      style={{
        backgroundImage: background
          ? `url(${background})`
          : "linear-gradient(to bottom, var(--ht-purple-from-ligr), var(--ht-pink-to-ligr))",
      }}
      to={`/projects/${id}`}
      className="group/root relative p-2 h-[100px] bg-cover bg-center rounded overflow-hidden cursor-pointer"
    >
      <span className="bg-fade-layer-bgcl absolute inset-0 z-10 group-hover/root:bg-[#00000066]"></span>
      <div className="relative z-20 h-full w-full">
        <span className="text-white font-semibold">{title}</span>
      </div>
      {/* <button
            onClick={handleMarkStarred}
            className={`${starred ? "right-2" : "-right-[25px] group-hover/root:right-2"} absolute bottom-2 hover:scale-125 text-starred-cl z-30 transition-[right,transform]`}
         >
            {starred ? (
               <StarIcon sx={{ height: 20, width: 20 }} color="inherit" />
            ) : (
               <StarOutlineIcon sx={{ height: 20, width: 20 }} color="inherit" />
            )}
         </button> */}
    </NavLink>
  )
}

export const JoinedProjects = () => {
  const [joinedProjects, setJoinedProjects] = useState<TProjectPreviewData[]>([])

  const fetchJoinedProjects = () => {
    projectService
      .getJoinedProjects()
      .then((projects) => {
        setJoinedProjects(projects)
      })
      .catch((error) => {
        toast.error(axiosErrorHandler.handleHttpError(error).message)
      })
  }

  useEffect(() => {
    fetchJoinedProjects()
    eventEmitter.on(EInternalEvents.REFRESH_JOINED_PROJECTS, () => {
      fetchJoinedProjects()
    })
    return () => {
      eventEmitter.off(EInternalEvents.REFRESH_JOINED_PROJECTS)
    }
  }, [])

  return (
    <section className="w-full">
      <hr className="my-6" />
      <a
        id="joined-projects-list"
        href="#joined-projects-list"
        className="flex items-center gap-2 mb-3"
      >
        <SpaceDashboard fontSize="small" />
        <h2 className="text-lg font-semibold">Joined Projects</h2>
      </a>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {joinedProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
