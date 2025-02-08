import { styled, Popover, Select, MenuItem, SelectChangeEvent, FormControl } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { moveTask } from "../../../redux/project/project-slice"
import type { TPhaseData } from "../../../services/types"

type TMoveTaskFormData = {
   toPhase: TPhaseData | null
   toPosition: number | null
}

type TMoveTaskProps = {
   taskId: number
   phaseId: number
}

export const MoveTask = ({ taskId, phaseId }: TMoveTaskProps) => {
   const phases = useAppSelector(({ project }) => project.phases)
   const [anchorEle, setAnchorEle] = useState<HTMLElement | null>(null)
   const [moveTo, setMoveTo] = useState<TMoveTaskFormData>({ toPhase: null, toPosition: null })
   const [phaseData, setPhaseData] = useState<TPhaseData>()
   const dispatch = useAppDispatch()

   const { toPhase, toPosition } = moveTo

   useEffect(() => {
      const phase = phases?.find(({ id }) => id === phaseId)
      if (phase) {
         setPhaseData(phases?.find(({ id }) => id === phaseId))
         const toPosition = phase.taskPreviews?.find(({ id }) => id === taskId)?.position || null
         setMoveTo({ toPosition, toPhase: phase })
      }
   }, [phases, phaseId])

   const moveTaskHandler = useCallback(() => {
      const { toPhase, toPosition } = moveTo
      if (toPhase && toPosition) {
         console.log(">>> move to:", {
            prePhaseId: phaseId,
            taskId,
            toPhaseId: toPhase.id,
            toPosition,
         })
         dispatch(moveTask({ prePhaseId: phaseId, taskId, toPhaseId: toPhase.id, toPosition }))
      }
   }, [moveTo])

   const handleOpen = (e?: React.MouseEvent<HTMLSpanElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   const onChangeMoveToPhase = (e: SelectChangeEvent<unknown>) => {
      setMoveTo((pre) => ({ ...pre, toPhaseId: parseInt(e.target.value as string) }))
   }

   const onChangeMoveToPosition = (e: SelectChangeEvent<unknown>) => {
      setMoveTo((pre) => ({ ...pre, toPosition: parseInt(e.target.value as string) }))
   }
   console.log(">>> stuff:", { phases, phaseData, toPhase, toPosition })
   return phases && phases.length > 0 && phaseData && toPhase && toPosition ? (
      <>
         <div className="flex items-center gap-1 text-regular-text-cl text-xs mt-1">
            <span className="ml-10">In Phase</span>
            <button
               onClick={handleOpen}
               className="p-1 font-semibold rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl cursor-pointer"
            >
               {phaseData.title}
            </button>
         </div>

         <StyledPopover
            open={!!anchorEle}
            anchorEl={anchorEle}
            onClose={() => handleOpen()}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
         >
            <div className="bg-modal-popover-bgcl rounded-md p-3 text-regular-text-cl w-[300px] text-sm">
               <header className="relative w-full py-1">
                  <h3 className="w-full text-center text-sm font-bold">Move Task</h3>
                  <button
                     onClick={() => handleOpen()}
                     className="flex absolute right-0 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                  >
                     <CloseIcon className="text-regular-text-cl" fontSize="small" />
                  </button>
               </header>
               <h2 className="mt-3 w-fit">Select destination</h2>
               <div className="w-full mt-2">
                  <div className="flex items-center gap-3">
                     <div className="grow">
                        <h3 className="mb-0.5 pl-1 font-semibold">Phase</h3>
                        <FormControl fullWidth>
                           <StyledSelect
                              size="small"
                              value={toPhase.id}
                              onChange={onChangeMoveToPhase}
                              MenuProps={{
                                 MenuListProps: {
                                    className:
                                       "bg-modal-popover-bgcl bor border border-regular-border-cl",
                                 },
                              }}
                           >
                              {phases.map(({ id, title }) => (
                                 <StyledMenuItem key={id} value={id}>
                                    {title}
                                 </StyledMenuItem>
                              ))}
                           </StyledSelect>
                        </FormControl>
                     </div>
                     <div className="w-[78px]">
                        <h3 className="mb-0.5 pl-1 font-semibold">Position</h3>
                        <FormControl fullWidth>
                           <StyledSelect
                              size="small"
                              value={toPosition}
                              onChange={onChangeMoveToPosition}
                              MenuProps={{
                                 MenuListProps: {
                                    className:
                                       "bg-modal-popover-bgcl bor border border-regular-border-cl",
                                 },
                              }}
                           >
                              {toPhase.taskPreviews?.map(({ id, position }) => (
                                 <StyledMenuItem key={id} value={position}>
                                    <span>{position}</span>
                                    {toPosition === position && <span>(current)</span>}
                                 </StyledMenuItem>
                              ))}
                           </StyledSelect>
                        </FormControl>
                     </div>
                  </div>
                  <button
                     onClick={moveTaskHandler}
                     type="submit"
                     className="rounded py-1.5 text-black mt-2 px-4 bg-confirm-btn-bgcl hover:bg-confirm-btn-hover-bgcl"
                  >
                     Move
                  </button>
               </div>
            </div>
         </StyledPopover>
      </>
   ) : (
      <span></span>
   )
}

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 6,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-regular-border-cl) solid",
   },
})

const StyledSelect = styled(Select)({
   fontSize: "15px",
   color: "var(--ht-modal-text-cl)",
   "& svg": {
      fill: "var(--ht-modal-text-cl)",
   },
   "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--ht-regular-border-cl)",
   },
   "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "var(--ht-outline-cl)",
      },
   },
   "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "var(--ht-outline-cl)",
      },
   },
})

const StyledMenuItem = styled(MenuItem)({
   color: "var(--ht-regular-text-cl)",
   "&:hover": {
      backgroundColor: "var(--ht-modal-btn-hover-bgcl)",
   },
   "&.Mui-selected": {
      fontWeight: "bold",
      color: "var(--ht-selected-text-cl)",
      backgroundColor: "#3299ff24",
   },
})
