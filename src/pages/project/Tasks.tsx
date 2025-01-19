import { Avatar, styled, TextField, Tooltip } from "@mui/material"
import type { TTaskItemPreviewData } from "../../services/types"
import ReorderIcon from "@mui/icons-material/Reorder"
import AddIcon from "@mui/icons-material/Add"
import { FocusEvent, KeyboardEvent, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { addNewTaskPreview } from "../../redux/project/project-slice"
import { useAppDispatch } from "../../hooks/redux"
import { randomInteger } from "../../utils/helpers"

type TTaskProps = {
   taskData: TTaskItemPreviewData
}

const Task = ({ taskData }: TTaskProps) => {
   const { id, firstMember, hasDescription, title } = taskData

   return (
      <div
         key={id}
         className="bg-[#22272B] cursor-pointer mb-2 rounded-lg py-2 px-3 pr-2 hover:outline outline-2 outline-white"
      >
         <h3 className="text-sm">{title}</h3>
         <div className="flex items-center justify-between mt-2">
            {hasDescription && (
               <Tooltip title="This card has a description." arrow>
                  <div>
                     <ReorderIcon sx={{ fontSize: 16 }} />
                  </div>
               </Tooltip>
            )}
            {firstMember && (
               <div>
                  <Tooltip title={firstMember.fullName} arrow>
                     {firstMember.avatar ? (
                        <Avatar
                           alt="User Avatar"
                           src={firstMember.avatar}
                           sx={{ height: 24, width: 24 }}
                        />
                     ) : (
                        <Avatar sx={{ height: 24, width: 24 }}>{firstMember.fullName[0]}</Avatar>
                     )}
                  </Tooltip>
               </div>
            )}
         </div>
      </div>
   )
}

type TAddNewTaskProps = {
   phaseId: number
}

const AddNewTask = ({ phaseId }: TAddNewTaskProps) => {
   const [isAdding, setIsAdding] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const quitAdding = (title: string) => {
      if (title && title.length > 0) {
         dispatch(
            addNewTaskPreview({
               id: randomInteger(1, 1000),
               title,
               firstMember: null,
               hasDescription: false,
               phaseId,
            }),
         )
      }
      setIsAdding(false)
   }

   const catchAddingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         quitAdding((e.target as HTMLTextAreaElement).value || "")
      }
   }

   const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      quitAdding((e.target as HTMLTextAreaElement).value || "")
   }

   return (
      <div className="p-2">
         {isAdding ? (
            <div className="p-1 rounded-md bg-[#22272B]">
               <EditableTitle
                  multiline
                  maxRows={5}
                  variant="outlined"
                  placeholder="Enter a title..."
                  autoFocus
                  onBlur={blurListTitleInput}
                  onKeyDown={catchAddingEnter}
               />
               <div className="flex mt-3 gap-x-2">
                  <button className="py-[6px] px-3 leading-none border-none rounded bg-[#579DFF] text-[#1D2125] font-medium text-sm">
                     Add Task
                  </button>
                  <Tooltip title="Cancel adding new card.">
                     <button className="hover:bg-hover-silver-bgcl px-1 py-1 rounded">
                        <CloseIcon />
                     </button>
                  </Tooltip>
               </div>
            </div>
         ) : (
            <button
               onClick={() => setIsAdding(true)}
               className="flex items-center w-full gap-x-2 p-1 bg-transparent border-none cursor-pointer hover:bg-[#282F27] rounded-md"
            >
               <AddIcon fontSize="small" />
               <span className="text-sm">Add a task</span>
            </button>
         )}
      </div>
   )
}

type TTasksProps = {
   phaseId: number
   taskPreviews: TTaskItemPreviewData[] | null
}

export const TaskPreviews = ({ taskPreviews, phaseId }: TTasksProps) => {
   return (
      <>
         <div className="flex flex-col flex-[1_1_auto] overflow-y-auto min-h-[70px] px-2">
            {taskPreviews && taskPreviews.length > 0 ? (
               taskPreviews.map((task) => <Task key={task.id} taskData={task} />)
            ) : (
               <div className="text-regular-text-cl w-full text-center m-auto h-fit leading-tight">
                  This phase has no task now.
               </div>
            )}
         </div>
         <AddNewTask phaseId={phaseId} />
      </>
   )
}

const EditableTitle = styled(TextField)({
   width: "100%",
   "& .MuiInputBase-formControl": {
      width: "100%",
      padding: "5px 8px",
      "& .MuiInputBase-input": {
         width: "100%",
         color: "#9fadbc",
         fontWeight: 500,
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
   },
})
