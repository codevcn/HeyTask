import FilterListIcon from "@mui/icons-material/FilterList"
import { Popover, Fade, styled, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { useDebounce } from "../../../hooks/debounce"
import { createWebWorker } from "../../../utils/helpers"
import type { TFilterTasksData } from "./sharing"
import { FilterByMembers } from "./FilterByMembers"
import { FilterByDueDate } from "./FilterByDates"
import type { TFilterTasksWorkerMsg, TFilterTasksWorkerRes } from "../../../utils/types"
import { setBackupPhases } from "../../../redux/project/project-slice"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { TPhaseData } from "../../../services/types"

type TFilterByKeywordProps = {
   onFilter: (filterData: TFilterTasksData) => void
}

const FilterByTaskTitle = ({ onFilter }: TFilterByKeywordProps) => {
   const doFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = e.currentTarget.value
      onFilter({ taskTitle: keyword })
   }

   return (
      <div>
         <label className="block text-sm font-bold mb-1 w-fit" htmlFor="filter-keyword">
            Keyword
         </label>
         <input
            className="w-full px-2 py-1 inset-0 focus:border-outline-cl bg-focused-textfield-bgcl border-2 border-regular-border-cl rounded text-regular-text-cl placeholder-gray-500"
            id="filter-keyword"
            placeholder="Enter a keyword..."
            type="text"
            onChange={doFilter}
         />
         <p className="text-xs text-gray-400 mt-1">Search cards, members, labels, and more.</p>
      </div>
   )
}

enum EPickStatusValues {
   COMPLETE = "complete",
   UNCOMPLETE = "uncomplete",
}

type TFilterByStatusProps = {
   onFilter: (filterData: TFilterTasksData) => void
}

const FilterByStatus = ({ onFilter }: TFilterByStatusProps) => {
   const pickStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilter({ taskStatus: e.currentTarget.value as EPickStatusValues })
   }

   return (
      <div className="mt-6">
         <h3 className="text-sm font-semibold mb-1">Task status</h3>
         <RadioGroup onChange={pickStatus}>
            <FormControlLabel
               value={EPickStatusValues.COMPLETE}
               control={<StyledRadio size="small" />}
               label={<p className="text-sm">Marked as complete</p>}
            />
            <FormControlLabel
               value={EPickStatusValues.UNCOMPLETE}
               control={<StyledRadio size="small" />}
               label={<p className="text-sm">Not marked as complete</p>}
            />
         </RadioGroup>
      </div>
   )
}

type TFilterTasksProps = {
   phases: TPhaseData[]
}

const Filter = ({ phases }: TFilterTasksProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLElement | null>(null)
   const filterTasksWorkerRef = useRef<Worker>()
   const debounce = useDebounce()
   const filterDataRef = useRef<TFilterTasksData>({})
   const dispatch = useAppDispatch()

   const filterTasks = useCallback(
      debounce((partialData: TFilterTasksData): void => {
         filterDataRef.current = { ...filterDataRef.current, ...partialData }
         const message: TFilterTasksWorkerMsg = {
            phases,
            filterData: filterDataRef.current,
         }
         filterTasksWorkerRef.current?.postMessage(message)
      }, 400),
      [phases],
   )

   const handleOpenFilterBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   useEffect(() => {
      filterTasksWorkerRef.current = createWebWorker("/src/workers/filter-tasks-worker.ts")
      filterTasksWorkerRef.current?.addEventListener(
         "message",
         (e: MessageEvent<TFilterTasksWorkerRes>) => {
            console.log(">>> data:", e.data)
            const taskIds = e.data
            dispatch((dispatch, getState) => {
               const currentPhases = getState().project.phases
               dispatch(setBackupPhases(currentPhases))
               // ...
            })
         },
      )
      return () => {
         filterTasksWorkerRef.current?.terminate()
      }
   }, [])

   return (
      <>
         <button
            onClick={handleOpenFilterBoard}
            className="flex items-center py-1 px-2 gap-x-1 rounded hover:bg-[#ffffff33]"
         >
            <FilterListIcon fontSize="small" />
            <span className="text-base">Filter</span>
         </button>

         <FilterTasksBoard
            anchorEl={anchorEle}
            open={!!anchorEle}
            onClose={() => handleOpenFilterBoard()}
            TransitionComponent={Fade}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
         >
            <div className="flex flex-col bg-modal-popover-bgcl text-modal-text-cl pt-3 rounded-lg w-full h-full">
               <header className="pt-1 pb-4 px-5 items-center">
                  <h3 className="text-regular-text-cl font-semibold text-base text-center">
                     Filter tasks
                  </h3>
                  <button
                     onClick={() => handleOpenFilterBoard()}
                     className="flex h-8 w-8 hover:bg-hover-silver-bgcl rounded absolute top-2 right-2"
                  >
                     <CloseIcon fontSize="small" className="text-regular-text-cl m-auto" />
                  </button>
               </header>
               <div className="css-styled-vt-scrollbar overflow-y-auto grow px-4 pb-3">
                  <FilterByTaskTitle onFilter={filterTasks} />
                  <FilterByMembers onFilter={filterTasks} />
                  <FilterByStatus onFilter={filterTasks} />
                  <FilterByDueDate onFilter={filterTasks} />
               </div>
            </div>
         </FilterTasksBoard>
      </>
   )
}

export const FilterTasks = () => {
   const phases = useAppSelector(({ project }) => project.phases)

   return phases && phases.length > 0 && <Filter phases={phases} />
}

const FilterTasksBoard = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 8,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      height: "calc(100vh - var(--ht-top-nav-height) - var(--ht-top-nav-height))",
      width: 380,
      "& .MuiList-root": {
         backgroundColor: "var(--ht-modal-popover-bgcl)",
         borderRadius: 8,
      },
   },
})

const StyledRadio = styled(Radio)({
   "& svg": {
      fill: "var(--ht-regular-text-cl)",
   },
   "& .MuiTouchRipple-child": {
      backgroundColor: "var(--ht-regular-text-cl)",
   },
})
