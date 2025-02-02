import GroupAddIcon from "@mui/icons-material/GroupAdd"
import { AvatarGroup, Avatar, styled, Tooltip, Dialog, Fade, DialogContent } from "@mui/material"
import type { TProjectData } from "../../services/types"
import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"

type TShareProjectProps = {
   projectData: TProjectData
}

export const ShareProject = ({ projectData }: TShareProjectProps) => {
   const { members } = projectData
   const [openDialog, setOpenDialog] = useState<boolean>(false)

   return (
      <div className="flex items-center gap-x-3">
         <StyledAvatarGroup
            max={3}
            renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
         >
            {members.map((member) => (
               <Tooltip key={member.id} title="codevcn" arrow>
                  {member.avatar ? (
                     <Avatar alt="User Avatar" src={member.avatar} />
                  ) : (
                     <Avatar>{member.fullName[0]}</Avatar>
                  )}
               </Tooltip>
            ))}
         </StyledAvatarGroup>
         <Tooltip title="Share this board with other people." arrow>
            <button
               onClick={() => setOpenDialog(true)}
               className="flex gap-x-1 items-center h-[32px] bg-[#FFFFFF] py-1 px-2 text-secondary-text-cl font-medium rounded"
            >
               <GroupAddIcon fontSize="small" />
               <span>Share</span>
            </button>
         </Tooltip>

         <StyledDialog
            TransitionComponent={Fade}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            scroll="body"
            maxWidth="sm"
            fullWidth
            aria-hidden="true"
         >
            <DialogContent>
               <div className="flex flex-col rounded-xl min-h-[300px]">
                  <header className="relative py-1 w-full">
                     <h3 className="w-full text-lg font-bold text-regular-text-cl pl-3">
                        Share project
                     </h3>
                     <button
                        onClick={() => setOpenDialog(false)}
                        className="flex absolute right-0 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                     >
                        <CloseIcon className="text-regular-text-cl" />
                     </button>
                  </header>
               </div>
            </DialogContent>
         </StyledDialog>
      </div>
   )
}

const StyledAvatarGroup = styled(AvatarGroup)({
   "& .MuiAvatarGroup-avatar": {
      cursor: "pointer",
      height: 28,
      width: 28,
      border: "none",
      "&:hover": {
         outline: "2px solid white",
      },
   },
})

const StyledDialog = styled(Dialog)({
   "& .MuiPaper-root": {
      borderRadius: 9,
      backgroundColor: "var(--ht-modal-board-bgcl)",
      "& .MuiDialogContent-root": {
         backgroundColor: "var(--ht-modal-board-bgcl)",
         padding: 15,
      },
   },
})
