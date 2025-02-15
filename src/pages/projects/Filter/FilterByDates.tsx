import { styled, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import type { TFilterTasksData } from "./sharing"
import { EPickDateValues } from "./sharing"

type TFilterByDueDateProps = {
   onFilter: (filterData: TFilterTasksData) => void
}

export const FilterByDueDate = ({ onFilter }: TFilterByDueDateProps) => {
   const pickDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dueDate = e.currentTarget.value as EPickDateValues
      onFilter({ dueDate })
   }

   return (
      <div className="mt-6">
         <h3 className="text-sm font-semibold mb-1">Due date</h3>
         <RadioGroup onChange={pickDate}>
            <FormControlLabel
               value={EPickDateValues.NO_DUE_DATES}
               control={<StyledRadio size="small" />}
               label={
                  <div className="flex items-center gap-x-2 text-sm">
                     <CalendarTodayIcon sx={{ width: 22, height: 22 }} />
                     <span>No Due Date</span>
                  </div>
               }
            />
            <FormControlLabel
               value={EPickDateValues.OVERDUE}
               control={<StyledRadio size="small" />}
               label={
                  <div className="flex items-center gap-x-2 text-sm text-delete-btn-bgcl">
                     <span className="text-black bg-delete-btn-bgcl rounded-full">
                        <AccessTimeIcon color="inherit" sx={{ width: 22, height: 22 }} />
                     </span>
                     <span>Overdue</span>
                  </div>
               }
            />
            <FormControlLabel
               value={EPickDateValues.DUE_IN_NEXT_DAY}
               control={<StyledRadio size="small" />}
               label={
                  <div className="flex items-center gap-x-2 text-sm text-warning-text-cl">
                     <span className="text-black bg-warning-text-cl rounded-full">
                        <AccessTimeIcon sx={{ width: 22, height: 22 }} />
                     </span>
                     <span>Due in the next day</span>
                  </div>
               }
            />
            <FormControlLabel
               value={EPickDateValues.DUE_IN_NEXT_WEEK}
               control={<StyledRadio size="small" />}
               label={
                  <div className="flex items-center gap-x-2 text-sm">
                     <AccessTimeIcon sx={{ width: 22, height: 22 }} />
                     <span>Due in the next week</span>
                  </div>
               }
            />
            <FormControlLabel
               value={EPickDateValues.DUE_IN_NEXT_MONTH}
               control={<StyledRadio size="small" />}
               label={
                  <div className="flex items-center gap-x-2 text-sm">
                     <AccessTimeIcon sx={{ width: 22, height: 22 }} />
                     <span>Due in the next month</span>
                  </div>
               }
            />
         </RadioGroup>
      </div>
   )
}

const StyledRadio = styled(Radio)({
   "& svg": {
      fill: "var(--ht-regular-text-cl)",
   },
   "& .MuiTouchRipple-child": {
      backgroundColor: "var(--ht-regular-text-cl)",
   },
})
