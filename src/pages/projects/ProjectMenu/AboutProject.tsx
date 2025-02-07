import InfoIcon from "@mui/icons-material/Info"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import type { TProjectData, TProjectMemberData, TUserData } from "../../../services/types"
import { Avatar, AvatarGroup, styled, Tooltip } from "@mui/material"
import { useProjectMenuContext } from "./sharing"
import ReorderIcon from "@mui/icons-material/Reorder"
import { EProjectRoles } from "../../../utils/enums"
import { useMemo } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"

type TProjectAdminsProps = {
   projectMembers: TProjectMemberData[]
}

const ProjectAdmins = ({ projectMembers }: TProjectAdminsProps) => {
   const filteredAdmins = useMemo<TProjectMemberData[]>(() => {
      return projectMembers.filter((member) => member.projectRole === EProjectRoles.ADMIN)
   }, [projectMembers])

   const firstAdmin = filteredAdmins[0]

   const handleOpenUserPreview = (e: React.MouseEvent<HTMLElement>, userData: TUserData) => {
      eventEmitter.emit(EInternalEvents.OPEN_USER_PREVIEW, { anchorEle: e.currentTarget, userData })
   }

   return (
      <div>
         <div className="flex items-center gap-3">
            <AccountCircleIcon />
            <h2 className="font-bold text-base">Project Admins</h2>
         </div>
         <div className="mt-2 pl-1">
            {filteredAdmins.length > 1 ? (
               <StyledAvatarGroup spacing={5} max={100}>
                  {filteredAdmins.map((member) => (
                     <Tooltip key={member.id} title={member.fullName} arrow>
                        {member.avatar ? (
                           <Avatar
                              alt="User Avatar"
                              src={member.avatar}
                              onClick={(e) => handleOpenUserPreview(e, member)}
                           />
                        ) : (
                           <Avatar onClick={(e) => handleOpenUserPreview(e, member)}>
                              {member.fullName[0]}
                           </Avatar>
                        )}
                     </Tooltip>
                  ))}
               </StyledAvatarGroup>
            ) : (
               <div className="flex items-center gap-x-3">
                  <button className="flex">
                     {firstAdmin.avatar ? (
                        <Avatar
                           alt="User Avatar"
                           src={firstAdmin.avatar}
                           sx={{ height: 50, width: 50 }}
                           onClick={(e) => handleOpenUserPreview(e, firstAdmin)}
                        />
                     ) : (
                        <Avatar
                           sx={{ height: 50, width: 50 }}
                           onClick={(e) => handleOpenUserPreview(e, firstAdmin)}
                        >
                           {firstAdmin.fullName[0]}
                        </Avatar>
                     )}
                  </button>
                  <div>
                     <p className="text-base font-semibold">{firstAdmin.fullName}</p>
                     <p className="text-sm">{firstAdmin.email}</p>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

type TAboutProjectProps = {
   projectData: TProjectData
}

export const AboutProject = ({ projectData }: TAboutProjectProps) => {
   const { members } = projectData
   const { setMenuItemActive, menuItemActive } = useProjectMenuContext()
   const open = menuItemActive === "about-project"

   const handleOpen = (isOpen: boolean) => {
      if (isOpen) {
         setMenuItemActive("about-project")
      } else {
         setMenuItemActive(undefined)
      }
   }

   return (
      <>
         <button
            onClick={() => handleOpen(true)}
            className="flex items-center gap-x-3 p-2 hover:bg-modal-btn-hover-bgcl rounded w-full mt-1"
         >
            <InfoIcon fontSize="small" />
            <div>
               <p className="w-fit">About this project</p>
               <p className="text-xs font-light opacity-80">Add a description to this project</p>
            </div>
         </button>

         <section
            className={`${open ? "left-0" : "left-[105%]"} transition-[left] absolute z-20 top-0 px-4 py-2 h-full w-full bg-modal-board-bgcl`}
         >
            <ProjectAdmins projectMembers={members} />
            <div className="mt-8">
               <div className="flex items-center gap-3">
                  <ReorderIcon />
                  <h2 className="font-bold text-base">Project Description</h2>
               </div>
            </div>
         </section>
      </>
   )
}

const StyledAvatarGroup = styled(AvatarGroup)({
   "&.MuiAvatarGroup-root": {
      width: "fit-content",
      flexWrap: "wrap",
      flexDirection: "row",
      "& .MuiAvatarGroup-avatar": {
         cursor: "pointer",
         height: 32,
         width: 32,
         border: "none",
         "&:hover": {
            outline: "2px solid white",
         },
      },
   },
})
