import { Avatar, Tooltip, AvatarGroup, styled, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import type { TProjectMemberData, TTaskMemberData } from "../../../services/types"
import AddIcon from "@mui/icons-material/Add"
import Popover from "@mui/material/Popover"
import type { PopoverOrigin } from "@mui/material/Popover"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { addNewTaskMember, removeTaskMember } from "../../../redux/project/project-slice"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { getMembersSelector } from "../../../redux/project/selectors"

type TAddMemberBoardProps = {
   onCloseBoard: () => void
   anchorEle: HTMLButtonElement | null
   anchorOrigin?: PopoverOrigin
   transformOrigin?: PopoverOrigin
}

export const AddMemberBoard = ({
   onCloseBoard,
   anchorEle,
   anchorOrigin,
   transformOrigin,
}: TAddMemberBoardProps) => {
   const { projectMembers, taskMembers } = useAppSelector(getMembersSelector())
   const [searchResult, setSearchResult] = useState<TProjectMemberData[]>()
   const dispatch = useAppDispatch()

   const filteredProjectMembers = useMemo<TProjectMemberData[]>(() => {
      const list = searchResult ? searchResult : projectMembers
      if (taskMembers && taskMembers.length > 0) {
         return list.filter(
            (member) => !taskMembers.some((taskMember) => taskMember.id === member.id),
         )
      }
      return list
   }, [projectMembers, searchResult, taskMembers])

   const searchingMember = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = e.target.value
      if (inputValue && inputValue.length > 0) {
         setSearchResult(projectMembers.filter((member) => member.fullName.includes(inputValue)))
      } else {
         setSearchResult(undefined)
      }
   }

   const handleAddRemoveTaskMember = (member: TTaskMemberData, isAdding: boolean) => {
      if (isAdding) {
         dispatch(addNewTaskMember(member))
      } else {
         dispatch(removeTaskMember(member.id))
      }
   }

   const handleCloseBoard = () => {
      onCloseBoard()
      setSearchResult(undefined)
   }

   return (
      <StyledPopover
         open={!!anchorEle}
         anchorEl={anchorEle}
         onClose={handleCloseBoard}
         anchorOrigin={
            anchorOrigin || {
               vertical: "bottom",
               horizontal: "left",
            }
         }
         transformOrigin={
            transformOrigin || {
               vertical: "top",
               horizontal: "left",
            }
         }
      >
         <div className="bg-modal-popover-bgcl rounded-md p-3 text-regular-text-cl w-[300px]">
            <div className="relative w-full py-1">
               <h3 className="w-full text-center text-sm font-bold">Members</h3>
               <button
                  onClick={handleCloseBoard}
                  className="flex absolute right-0 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
               >
                  <CloseIcon className="text-regular-text-cl" fontSize="small" />
               </button>
            </div>
            <div className="w-full mt-2">
               <SearchInput
                  multiline
                  fullWidth
                  maxRows={5}
                  placeholder="Search members..."
                  variant="outlined"
                  onChange={searchingMember}
               />
            </div>
            {!searchResult && (
               <div className="mt-3 w-full">
                  <h3 className="text-sm font-bold">Card members</h3>
                  <div className="mt-2">
                     {(taskMembers || []).map((member) => (
                        <div
                           key={member.id}
                           className="flex relative items-center gap-x-2 p-1 rounded-md cursor-pointer hover:bg-modal-btn-hover-bgcl"
                        >
                           {member.avatar ? (
                              <Avatar
                                 alt="User Avatar"
                                 src={member.avatar}
                                 sx={{ height: 30, width: 30 }}
                              />
                           ) : (
                              <Avatar sx={{ height: 30, width: 30 }}>{member.fullName[0]}</Avatar>
                           )}
                           <span className="text-sm text-regular-text-cl">{member.fullName}</span>
                           <Tooltip title="Remove member">
                              <button
                                 onClick={() => handleAddRemoveTaskMember(member, false)}
                                 className="absolute right-2 top-1/2 -translate-y-1/2"
                              >
                                 <HighlightOffIcon fontSize="small" className="hover:scale-110" />
                              </button>
                           </Tooltip>
                        </div>
                     ))}
                  </div>
               </div>
            )}
            <div className="mt-3 w-full">
               <h3 className="text-sm font-bold">Project members</h3>
               <div className="mt-2">
                  {filteredProjectMembers.map((member) => (
                     <div
                        key={member.id}
                        className="flex items-center gap-x-2 p-1 rounded-md cursor-pointer hover:bg-modal-btn-hover-bgcl"
                        onClick={() => handleAddRemoveTaskMember(member, true)}
                     >
                        {member.avatar ? (
                           <Avatar
                              alt="User Avatar"
                              src={member.avatar}
                              sx={{ height: 30, width: 30 }}
                           />
                        ) : (
                           <Avatar sx={{ height: 30, width: 30 }}>{member.fullName[0]}</Avatar>
                        )}
                        <span className="text-sm text-regular-text-cl">{member.fullName}</span>
                     </div>
                  ))}
               </div>
               {filteredProjectMembers.length === 0 && (
                  <div className="w-full text-regular-text-cl font-medium italic text-sm text-center mt-4">
                     No member found
                  </div>
               )}
            </div>
         </div>
      </StyledPopover>
   )
}

const CurrentTaskMembers = () => {
   const taskMembers = useAppSelector(({ project }) => project.taskData!.members)

   return (
      taskMembers &&
      taskMembers.length > 0 &&
      taskMembers.map(({ avatar, id, fullName }) => (
         <Tooltip key={id} title={fullName} arrow>
            {avatar ? (
               <Avatar alt="User Avatar" src={avatar} sx={{ height: 30, width: 30 }} />
            ) : (
               <Avatar alt="User Avatar" sx={{ height: 30, width: 30 }}>
                  {fullName[0]}
               </Avatar>
            )}
         </Tooltip>
      ))
   )
}

export const TaskMembers = () => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)

   const handleOpenAddMemberBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   return (
      <div className="pl-10">
         <h3 className="text-regular-text-cl font-semibold text-sm">Members</h3>
         <div className="flex items-center gap-x-2 mt-1">
            <StyledAvatarGroup
               max={5}
               renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
            >
               <CurrentTaskMembers />
            </StyledAvatarGroup>
            <Tooltip title="Add member">
               <button
                  onClick={handleOpenAddMemberBoard}
                  className="flex h-fit p-1 rounded-full bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl"
               >
                  <AddIcon className="text-regular-text-cl" />
               </button>
            </Tooltip>
         </div>
         <AddMemberBoard anchorEle={anchorEle} onCloseBoard={() => handleOpenAddMemberBoard()} />
      </div>
   )
}

const StyledAvatarGroup = styled(AvatarGroup)({
   "& .MuiAvatarGroup-avatar": {
      cursor: "pointer",
      height: 32,
      width: 32,
      border: "none",
      "&:hover": {
         outline: "2px solid white",
      },
   },
})

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 6,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-divider-bgcl) solid",
   },
})

const SearchInput = styled(TextField)({
   "& .MuiInputBase-formControl": {
      width: "100%",
      padding: "5px 8px",
      border: "1px #738496 solid",
      "& .MuiInputBase-input": {
         width: "100%",
         color: "var(--ht-regular-text-cl)",
         fontWeight: 700,
         fontSize: "0.9rem",
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
      "&:hover": {
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
         },
      },
      "&.Mui-focused": {
         backgroundColor: "var(--ht-focused-textfield-bgcl)",
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--ht-outline-cl)",
         },
      },
   },
})
