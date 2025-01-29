import { Popover, styled, Tooltip } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { removeTaskMember } from "../../../redux/project/project-slice"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import GroupsIcon from "@mui/icons-material/Groups"
import { checkIfUserInTaskSelector } from "../../../redux/project/selectors"
import { useUserInProject } from "../../../hooks/user"
import { addNewTaskMemberAction } from "../../../redux/project/actions"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { useState } from "react"
import { AddMemberBoard } from "./TaskMembers"
import CloseIcon from "@mui/icons-material/Close"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import dayjs, { Dayjs } from "dayjs"
import type { TTaskData } from "../../../services/types"
import { TimeField } from "@mui/x-date-pickers/TimeField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateField } from "@mui/x-date-pickers/DateField"

type TMembersProps = {
   phaseId: number
   taskId: number
}

const Members = ({ phaseId, taskId }: TMembersProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)

   const handleOpenAddMemberBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   return (
      <>
         <Tooltip title="View members of this task" arrow placement="left">
            <button
               onClick={handleOpenAddMemberBoard}
               className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
            >
               <GroupsIcon fontSize="small" />
               <span>Members</span>
            </button>
         </Tooltip>

         <AddMemberBoard
            phaseId={phaseId}
            taskId={taskId}
            onCloseBoard={() => handleOpenAddMemberBoard()}
            anchorEle={anchorEle}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
         />
      </>
   )
}

type TDatesProps = {
   taskData: TTaskData
}

const Dates = ({ taskData }: TDatesProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)
   const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs(taskData.dueDate))
   const dateAdapter = new AdapterDayjs()

   const openAssignDueDates = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   const handleTypeDate = (date: Dayjs | null) => {
      setDueDate(date)
   }

   return (
      <>
         <Tooltip title="View members of this task" arrow placement="left">
            <button
               onClick={openAssignDueDates}
               className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
            >
               <AccessTimeIcon fontSize="small" />
               <span>Dates</span>
            </button>
         </Tooltip>

         <StyledPopover
            open={!!anchorEle}
            anchorEl={anchorEle}
            onClose={() => openAssignDueDates()}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
         >
            <div className="bg-modal-popover-bgcl rounded-md pt-3 text-regular-text-cl w-[300px]">
               <div className="relative w-full py-1 px-3">
                  <h3 className="w-full text-center text-sm font-bold">Dates</h3>
                  <button
                     onClick={() => openAssignDueDates()}
                     className="flex absolute right-3 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                  >
                     <CloseIcon className="text-regular-text-cl" fontSize="small" />
                  </button>
               </div>
               <div className="max-h-[435px] px-3 overflow-y-auto mt-2 css-styled-vt-scrollbar">
                  <div className="w-full">
                     <StyledDateCalendar
                        value={dueDate}
                        showDaysOutsideCurrentMonth
                        onChange={handleTypeDate}
                        dayOfWeekFormatter={(date) => dateAdapter.format(date, "weekdayShort")}
                     />
                  </div>
                  <div className="w-full mt-3">
                     <h3 className="text-sm font-bold">Due Date & Due Time</h3>
                     <div className="flex pt-2 gap-x-2">
                        <StyledDueDate
                           label="Due Date"
                           value={dueDate}
                           onChange={handleTypeDate}
                           format="DD/MM/YYYY"
                        />
                        <StyledTimeDate
                           label="Due Time"
                           value={dueDate}
                           onChange={handleTypeDate}
                           format="hh:mm a"
                        />
                     </div>
                  </div>
                  <div className="pb-4 mt-3">
                     <button className="w-full rounded bg-confirm-btn-bgcl p-1 hover:bg-confirm-btn-hover-bgcl text-black text-sm font-semibold">
                        Save
                     </button>
                     <button className="mt-2 w-full rounded bg-modal-btn-bgcl p-1 hover:bg-modal-btn-hover-bgcl text-regular-text-cl text-sm font-semibold">
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </StyledPopover>
      </>
   )
}

type TUserActionsProps = {
   phaseId: number
   taskData: TTaskData
}

export const UserActions = ({ phaseId, taskData }: TUserActionsProps) => {
   const { id } = taskData
   const userInProject = useUserInProject()!
   const isUserInTask = useAppSelector(checkIfUserInTaskSelector(userInProject.id))
   const dispatch = useAppDispatch()

   const joinTask = () => {
      dispatch(addNewTaskMemberAction(userInProject, phaseId, id))
   }

   const leaveTask = () => {
      dispatch(removeTaskMember({ memberId: userInProject.id, phaseId, taskId: id }))
   }

   return (
      <>
         <h3 className="text-xs">User actions</h3>
         <div className="flex flex-col gap-y-2 mt-1">
            {isUserInTask ? (
               <Tooltip title="Leave this task" arrow placement="left">
                  <button
                     onClick={leaveTask}
                     className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
                  >
                     <GroupRemoveIcon fontSize="small" />
                     <span>Leave</span>
                  </button>
               </Tooltip>
            ) : (
               <Tooltip title="Join this task" arrow placement="left">
                  <button
                     onClick={joinTask}
                     className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
                  >
                     <GroupAddIcon fontSize="small" />
                     <span>Join</span>
                  </button>
               </Tooltip>
            )}
            <Members taskId={id} phaseId={phaseId} />
            <Dates taskData={taskData} />
         </div>
      </>
   )
}

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 6,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-divider-bgcl) solid",
   },
})

const StyledDateCalendar = styled(DateCalendar)({
   "&.MuiDateCalendar-root": {
      width: "100%",
      height: 278,
      "& .MuiButtonBase-root": {
         "& svg": {
            fill: "var(--ht-regular-text-cl)",
         },
      },
      "& .MuiPickersCalendarHeader-root": {
         marginTop: 3,
      },
      "& .MuiDayCalendar-root": {
         "& .MuiDayCalendar-header": {
            "& .MuiDayCalendar-weekDayLabel": {
               color: "var(--ht-regular-text-cl)",
               fontWeight: "bold",
            },
         },
         "& .MuiDayCalendar-slideTransition": {
            minHeight: 190,
            "& .MuiDayCalendar-monthContainer": {
               "& .MuiPickersDay-root": {
                  color: "#B6C2CF",
                  height: 34,
                  width: 34,
                  "&.MuiPickersDay-dayOutsideMonth": {
                     color: "#7c8998",
                  },
                  "&:hover": {
                     backgroundColor: "var(--ht-modal-btn-hover-bgcl)",
                  },
                  "&:focus": {
                     backgroundColor: "#1976d261",
                  },
                  "&.Mui-selected": {
                     backgroundColor: "var(--ht-confirm-btn-bgcl)",
                     color: "black",
                  },
                  "&:not(.Mui-selected)": {
                     borderColor: "var(--ht-outline-cl)",
                  },
               },
            },
         },
      },
      "& .MuiYearCalendar-root": {
         width: "100%",
         height: 230,
         scrollbarWidth: "thin",
         scrollbarColor: "var(--ht-scrollbar-thumb-bgcl) var(--ht-scrollbar-track-bgcl)",
         "& .MuiPickersYear-root": {
            "& .MuiPickersYear-yearButton": {
               "&:hover": {
                  backgroundColor: "var(--ht-modal-btn-hover-bgcl)",
               },
            },
         },
      },
   },
})

// >>> go on here: reduce to using just one styled()
const StyledDueDate = styled(DateField)({
   "&.MuiFormControl-root": {
      "& .MuiFormLabel-root": {
         color: "var(--ht-regular-text-cl)",
      },
      "& .MuiInputBase-root": {
         "& .MuiInputBase-input": {
            color: "var(--ht-regular-text-cl)",
            padding: 10,
         },
         "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: "var(--ht-divider-bgcl)",
         },
         "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--ht-outline-cl)",
         },
         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--ht-outline-cl)",
         },
      },
   },
})

const StyledTimeDate = styled(TimeField)({
   "&.MuiFormControl-root": {
      "& .MuiFormLabel-root": {
         color: "var(--ht-regular-text-cl)",
      },
      "& .MuiInputBase-root": {
         "& .MuiInputBase-input": {
            color: "var(--ht-regular-text-cl)",
            padding: 10,
         },
         "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
            borderColor: "var(--ht-divider-bgcl)",
         },
         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--ht-outline-cl)",
         },
      },
   },
})
