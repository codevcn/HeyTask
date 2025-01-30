import {
   Popover,
   styled,
   FormHelperText,
   FormControl,
   MenuItem,
   InputLabel,
   Select,
} from "@mui/material"
import { useAppDispatch } from "../../../hooks/redux"
import { updateTaskData } from "../../../redux/project/project-slice"
import { useCallback, useEffect, useRef, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import dayjs, { Dayjs } from "dayjs"
import { TimeField } from "@mui/x-date-pickers/TimeField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateField } from "@mui/x-date-pickers/DateField"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

type TDatesBoardProps = {
   dueDate: string | null
   onOpenDatesBoard: (e?: React.MouseEvent<HTMLButtonElement>) => void
   anchorEle: HTMLButtonElement | null
}

enum EDuteDateReminder {
   MINUTES_BEFORE_0 = "0m",
   MINUTES_BEFORE_5 = "5m",
   MINUTES_BEFORE_10 = "10m",
}

export const DatesBoard = ({ dueDate, onOpenDatesBoard, anchorEle }: TDatesBoardProps) => {
   const [newDueDate, setNewDueDate] = useState<Dayjs | null>(dayjs(dueDate))
   const dateAdapter = new AdapterDayjs()
   const reminderRef = useRef<HTMLInputElement>()
   const dispatch = useAppDispatch()

   const handleTypeDate = (date: Dayjs | null) => {
      setNewDueDate(date)
   }

   const saveDates = useCallback(() => {
      if (newDueDate) {
         console.log(">>> task reminder:", reminderRef.current?.value)
         dispatch(updateTaskData({ dueDate: newDueDate.toISOString() }))
         onOpenDatesBoard()
      }
   }, [newDueDate])

   useEffect(() => {
      setNewDueDate(dayjs(dueDate))
   }, [dueDate])

   return (
      <>
         <StyledPopover
            open={!!anchorEle}
            anchorEl={anchorEle}
            onClose={() => onOpenDatesBoard()}
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
                     onClick={() => onOpenDatesBoard()}
                     className="flex absolute right-3 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                  >
                     <CloseIcon className="text-regular-text-cl" fontSize="small" />
                  </button>
               </div>
               <div className="max-h-[435px] px-3 overflow-y-auto mt-2 css-styled-vt-scrollbar">
                  <div className="w-full">
                     <StyledDateCalendar
                        value={newDueDate}
                        showDaysOutsideCurrentMonth
                        onChange={handleTypeDate}
                        dayOfWeekFormatter={(date) => dateAdapter.format(date, "weekdayShort")}
                        referenceDate={dayjs()}
                        yearsOrder="desc"
                        minDate={dayjs()}
                     />
                  </div>
                  <div className="w-full mt-3">
                     <h3 className="text-sm font-bold">Due Date & Due Time</h3>
                     <div className="flex pt-2 gap-x-2">
                        <StyledDueDate
                           label="Due Date"
                           value={newDueDate}
                           onChange={handleTypeDate}
                           format="DD/MM/YYYY"
                           minDate={dayjs()}
                        />
                        <StyledTimeDate
                           label="Due Time"
                           value={newDueDate}
                           onChange={handleTypeDate}
                           format="hh:mm a"
                           minTime={dayjs()}
                        />
                     </div>
                  </div>
                  <FormControl fullWidth sx={{ marginTop: 2 }}>
                     <StyledInputLabel id="due-date-reminder">
                        Set due date reminder
                     </StyledInputLabel>
                     <StyledSelectReminder
                        labelId="due-date-reminder"
                        label="Set due date reminder"
                        defaultValue=""
                        className=""
                        MenuProps={{
                           MenuListProps: {
                              className: "bg-modal-popover-bgcl bor border border-divider-bgcl",
                           },
                        }}
                        inputRef={reminderRef}
                     >
                        <StyledMenuItem value="">
                           <em>None</em>
                        </StyledMenuItem>
                        <StyledMenuItem value={EDuteDateReminder.MINUTES_BEFORE_0}>
                           At time of due date
                        </StyledMenuItem>
                        <StyledMenuItem value={EDuteDateReminder.MINUTES_BEFORE_5}>
                           5 Minutes before
                        </StyledMenuItem>
                        <StyledMenuItem value={EDuteDateReminder.MINUTES_BEFORE_10}>
                           10 Minutes before
                        </StyledMenuItem>
                     </StyledSelectReminder>
                     <FormHelperText sx={{ color: "var(--ht-regular-text-cl)" }}>
                        Reminders will be sent to all members and watchers of this card.
                     </FormHelperText>
                  </FormControl>
                  <div className="pb-4 mt-3">
                     <button
                        onClick={saveDates}
                        className="w-full rounded bg-confirm-btn-bgcl p-1 hover:bg-confirm-btn-hover-bgcl text-black text-sm font-semibold"
                     >
                        Save
                     </button>
                     <button
                        onClick={() => onOpenDatesBoard()}
                        className="mt-2 w-full rounded bg-modal-btn-bgcl p-1 hover:bg-modal-btn-hover-bgcl text-regular-text-cl text-sm font-semibold"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </StyledPopover>
      </>
   )
}

type TTaskDueDateProps = {
   dueDate: string | null
}

export const TaskDueDate = ({ dueDate }: TTaskDueDateProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)

   const openAssignDueDates = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   return (
      dueDate && (
         <div className="flex flex-col text-regular-text-cl">
            <h3 className="text-sm font-bold mb-1">Due Date</h3>
            <button
               onClick={openAssignDueDates}
               className="flex items-center grow gap-x-2 bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl rounded py-1 px-2"
            >
               <span className="text-sm">{dayjs(dueDate).format("LLL")}</span>
               <KeyboardArrowDownIcon fontSize="small" className="text-regular-text-cl" />
            </button>
            <DatesBoard
               dueDate={dueDate}
               anchorEle={anchorEle}
               onOpenDatesBoard={openAssignDueDates}
            />
         </div>
      )
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
            scrollbarWidth: "thin",
            scrollbarColor: "var(--ht-scrollbar-thumb-bgcl) var(--ht-scrollbar-track-bgcl)",
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
                  "&.Mui-disabled": {
                     opacity: 0.5,
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

const DueDateTimeStyling = {
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
}

const StyledDueDate = styled(DateField)(DueDateTimeStyling)

const StyledTimeDate = styled(TimeField)(DueDateTimeStyling)

const StyledSelectReminder = styled(Select)({
   "&.MuiInputBase-root": {
      "& .MuiSelect-select": {
         padding: 10,
      },
      "& svg": {
         fill: "var(--ht-regular-text-cl)",
      },
      "& .MuiInputBase-input": {
         color: "var(--ht-regular-text-cl)",
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
})

const StyledInputLabel = styled(InputLabel)({
   transform: "translate(14px, 10px) scale(1)",
   color: "var(--ht-regular-text-cl)",
   "&.Mui-focused": {
      color: "var(--ht-outline-cl)",
      transform: "translate(14px, -9px) scale(0.75)",
   },
   "&.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
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
