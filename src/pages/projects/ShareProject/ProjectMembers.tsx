import { Avatar, styled, Tabs, Tab, Popover } from "@mui/material"
import type { TProjectMemberData } from "../../../services/types"
import { useMemo, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { useUserInProject } from "../../../hooks/user"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import { displayProjectRole, openFixedLoadingHandler, pureNavigator } from "../../../utils/helpers"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { EProjectRoles } from "../../../utils/enums"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAppDispatch } from "../../../hooks/redux"
import {
   removeMemberFromProject,
   updateMemberInProject,
} from "../../../redux/project/project-slice"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { checkUserPermission } from "../../../configs/user-permissions"

type TRolesProps = {
   selectedMember: TProjectMemberData
   adminsCount: number
   userInProject: TProjectMemberData
}

type TEditAuthorizationProps = {
   anchorEle: HTMLElement | null
   selectedMember: TProjectMemberData | undefined
   userInProject: TProjectMemberData
   projectMembers: TProjectMemberData[]
   onClose: () => void
}

const EditAuthorization = ({
   anchorEle,
   selectedMember,
   userInProject,
   projectMembers,
   onClose,
}: TEditAuthorizationProps) => {
   const leaveProject = () => {
      openFixedLoadingHandler(true)
      projectService
         .leaveProject()
         .then(() => {
            pureNavigator("", true)
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   const currentAdmins = useMemo(() => {
      if (projectMembers && projectMembers.length > 0) {
         return projectMembers.filter((member) => member.projectRole === EProjectRoles.ADMIN)
      }
      return []
   }, [projectMembers])

   const Roles = ({ selectedMember, adminsCount, userInProject }: TRolesProps) => {
      const userProjectRole = userInProject.projectRole
      const selectedMemberId = selectedMember.id
      const inactiveClass: string = "opacity-60 pointer-events-none"
      const hasPermission = checkUserPermission(userProjectRole, "assign-project-role")
      const leastAdmin = adminsCount < 2
      const selectedMemberIsAdmin = userProjectRole === EProjectRoles.ADMIN

      const dispatch = useAppDispatch()

      const assignUserProjectRole = (role: EProjectRoles, memberId: number) => {
         if (selectedMember.projectRole !== role) {
            dispatch(updateMemberInProject({ projectRole: role, id: memberId }))
         }
         onClose()
      }

      const removeFromProject = (memberId: number) => {
         dispatch(removeMemberFromProject(memberId))
         onClose()
      }

      const pickingClassForAdmin = (): string => {
         if (hasPermission) {
            if (selectedMemberIsAdmin && leastAdmin) {
               return inactiveClass
            }
            return ""
         }
         return inactiveClass
      }

      return (
         <ul className="mt-1 text-modal-text-cl">
            <li
               onClick={() => assignUserProjectRole(EProjectRoles.ADMIN, selectedMemberId)}
               className={`${hasPermission ? "" : inactiveClass} cursor-pointer hover:bg-hover-silver-bgcl py-2 px-3 text-sm font-medium`}
            >
               Admin
            </li>
            <li
               onClick={() => assignUserProjectRole(EProjectRoles.LEADER, selectedMemberId)}
               className={`${pickingClassForAdmin()} cursor-pointer hover:bg-hover-silver-bgcl py-2 px-3 text-sm font-medium`}
            >
               <p>Leader</p>
               {leastAdmin && <p className="text-xs">Projects must have at least one admin.</p>}
            </li>
            <li
               onClick={() => assignUserProjectRole(EProjectRoles.MEMBER, selectedMemberId)}
               className={`${pickingClassForAdmin()} cursor-pointer hover:bg-hover-silver-bgcl py-2 px-3 text-sm font-medium`}
            >
               <p>Member</p>
               {leastAdmin && <p className="text-xs">Projects must have at least one admin.</p>}
            </li>
            {selectedMemberId === userInProject.id ? (
               <li
                  onClick={leaveProject}
                  className={`${leastAdmin ? inactiveClass : ""} cursor-pointer hover:bg-hover-silver-bgcl py-2 px-3 text-sm font-medium`}
               >
                  <div className="flex items-center justify-between gap-x-3">
                     <span>Leave project</span>
                     <LogoutIcon fontSize="small" />
                  </div>
                  {leastAdmin && <p className="text-xs">Projects must have at least one admin.</p>}
               </li>
            ) : (
               <li
                  onClick={() => removeFromProject(selectedMemberId)}
                  className={`${checkUserPermission(userProjectRole, "add-remove-project-member") ? "" : inactiveClass} cursor-pointer hover:bg-hover-silver-bgcl py-2 px-3 text-sm font-medium`}
               >
                  <div className="flex items-center justify-between gap-x-3">
                     <span>Remove from project</span>
                     <LogoutIcon fontSize="small" />
                  </div>
               </li>
            )}
         </ul>
      )
   }

   return (
      <StyledPopover
         open={!!anchorEle}
         anchorEl={anchorEle}
         onClose={onClose}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
         }}
         transformOrigin={{
            vertical: "top",
            horizontal: "right",
         }}
      >
         <div className="bg-transparent min-w-52 py-1 pb-3 relative">
            <header className="flex py-1 px-2 items-center">
               <h3 className="grow text-regular-text-cl font-semibold text-sm text-center">
                  Authorization
               </h3>
               <button
                  onClick={onClose}
                  className="flex h-8 w-8 hover:bg-hover-silver-bgcl rounded"
               >
                  <CloseIcon fontSize="small" className="text-regular-text-cl m-auto" />
               </button>
            </header>
            {selectedMember && (
               <Roles
                  selectedMember={selectedMember}
                  adminsCount={currentAdmins.length}
                  userInProject={userInProject}
               />
            )}
         </div>
      </StyledPopover>
   )
}

enum EMembersTabTypes {
   PROJECT_MEMBERS = "PROJECT_MEMBERS",
   JOIN_REQUESTS = "JOIN_REQUESTS",
}

type TProjectMembersProps = {
   projectMembers: TProjectMemberData[]
}

export const ProjectMembers = ({ projectMembers }: TProjectMembersProps) => {
   const userInProject = useUserInProject()!
   const [activeTab, setActiveTab] = useState<EMembersTabTypes>(EMembersTabTypes.PROJECT_MEMBERS)
   const [anchorEle, setAnchorEle] = useState<HTMLElement | null>(null)
   const [selectedMember, setSelectedMember] = useState<TProjectMemberData>()

   const changeTab = (_: React.SyntheticEvent, newValue: EMembersTabTypes) => {
      setActiveTab(newValue)
   }

   const handleOpenAuthorization = (
      e?: React.MouseEvent<HTMLButtonElement>,
      member?: TProjectMemberData,
   ) => {
      setSelectedMember(member)
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   return (
      <div className="mt-5 text-modal-text-cl">
         <StyledTabsList value={activeTab} onChange={changeTab}>
            <Tab
               label="Project members"
               value={EMembersTabTypes.PROJECT_MEMBERS}
               icon={<div className="members-count">{projectMembers.length || 0}</div>}
               iconPosition="end"
            />
            <Tab label="Join requests" value={EMembersTabTypes.JOIN_REQUESTS} />
         </StyledTabsList>
         <div
            className="pt-4 space-y-1 overflow-y-auto css-styled-vt-scrollbar h-[230px] pr-1"
            hidden={!(activeTab === EMembersTabTypes.PROJECT_MEMBERS)}
         >
            {projectMembers.map(({ id, avatar, email, fullName, projectRole, role }) => (
               <div
                  key={id}
                  className={`${selectedMember?.id === id ? "bg-[#1C2B41]" : ""} flex items-center justify-between py-2 px-1 rounded`}
               >
                  <div className="flex items-center gap-x-3">
                     {avatar ? (
                        <Avatar src={avatar} alt="User Avatar" sx={{ height: 32, width: 32 }} />
                     ) : (
                        <Avatar sx={{ height: 32, width: 32 }}>{avatar}</Avatar>
                     )}
                     <div
                        className={`${selectedMember?.id === id ? "text-confirm-btn-bgcl" : ""} text-sm`}
                     >
                        <p className="font-medium leading-tight">
                           {userInProject.id === id ? `${fullName} (You)` : fullName}
                        </p>
                        <p className="text-xs leading-tight">{email}</p>
                     </div>
                  </div>
                  <button
                     onClick={(e) =>
                        handleOpenAuthorization(e, {
                           id,
                           avatar,
                           email,
                           fullName,
                           projectRole,
                           role,
                        })
                     }
                     className="flex items-center gap-x-1 px-3 py-1 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl"
                  >
                     <span className="text-sm">{displayProjectRole(projectRole)}</span>
                     <KeyboardArrowDownIcon fontSize="small" className="text-modal-text-cl" />
                  </button>
               </div>
            ))}
         </div>
         <div
            className="flex flex-col items-center justify-center h-[230px]"
            hidden={!(activeTab === EMembersTabTypes.JOIN_REQUESTS)}
         >
            <div className="p-2 rounded-full bg-modal-btn-bgcl w-fit">
               <PersonOutlineIcon className="text-modal-text-cl" />
            </div>
            <p className="mt-2 text-sm">There are no requests to join this project.</p>
         </div>

         <EditAuthorization
            anchorEle={anchorEle}
            onClose={() => handleOpenAuthorization()}
            projectMembers={projectMembers}
            selectedMember={selectedMember}
            userInProject={userInProject}
         />
      </div>
   )
}

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 8,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-regular-border-cl) solid",
   },
})

const StyledTabsList = styled(Tabs)({
   "&.MuiTabs-root": {
      minHeight: "unset",
      zIndex: 10,
      position: "relative",
      "& .MuiTabs-flexContainer": {
         borderBottom: "2px var(--ht-divider-cl) solid",
         columnGap: 10,
         "& .MuiTab-root": {
            padding: "8px 8px 6px 8px",
            textTransform: "unset",
            minHeight: "unset",
            color: "var(--ht-modal-text-cl)",
            fontWeight: 500,
            "& .members-count": {
               color: "var(--ht-regular-text-cl)",
               padding: 3,
               backgroundColor: "var(--ht-modal-btn-bgcl)",
               lineHeight: 1,
               borderRadius: "50%",
               marginLeft: 5,
               height: 20,
               width: 20,
            },
            "&:hover": {
               color: "var(--ht-confirm-btn-bgcl)",
               "& .members-count": {
                  color: "var(--ht-confirm-btn-bgcl)",
               },
            },
            "&.Mui-selected": {
               color: "var(--ht-confirm-btn-bgcl)",
               "& .members-count": {
                  color: "var(--ht-confirm-btn-bgcl)",
               },
            },
         },
      },
   },
})
