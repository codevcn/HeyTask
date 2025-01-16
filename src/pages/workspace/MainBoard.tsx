import { workspaceService } from "../../services/workspace-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setLoading, setWorkspace } from "../../redux/workspace/workspace-slice"
import { useEffect } from "react"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import GroupIcon from "@mui/icons-material/Group"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useUser } from "../../hooks/user"
import { AvatarGroup, Avatar, styled, Tooltip } from "@mui/material"

export const MainBoard = () => {
   const { workspace } = useAppSelector(({ workspace }) => workspace)
   const dispatch = useAppDispatch()
   const user = useUser()!

   const getWorkspaceHandler = async () => {
      dispatch(setLoading("getting-workspace-data"))
      workspaceService
         .getWorkspaceData(1)
         .then((res) => {
            dispatch(setWorkspace(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
         .finally(() => {
            dispatch(setLoading(null))
         })
   }

   useEffect(() => {
      if (!workspace) {
         getWorkspaceHandler()
      }
   }, [])

   return (
      <div className="text-white css-main-board">
         <div className="flex justify-between items-center gap-x-5 py-3 px-5 bg-[#0000003d] backdrop-blur-sm w-full h-[56px]">
            <div className="flex gap-x-3 items-center">
               <div className="border-none bg-transparent text-base font-bold">
                  Blog Team Web App
               </div>
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <StarOutlineIcon fontSize="small" />
               </button>
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <GroupIcon fontSize="small" />
               </button>
            </div>
            <div className="flex gap-x-3 items-center">
               <StyledAvatarGroup
                  max={4}
                  renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
               >
                  <Tooltip title="codevcn">
                     <Avatar alt="User Avatar" src={user.avatar} />
                  </Tooltip>
                  <Tooltip title="codevcn">
                     <Avatar alt="User Avatar" src={user.avatar} />
                  </Tooltip>
                  <Tooltip title="codevcn">
                     <Avatar alt="User Avatar" src={user.avatar} />
                  </Tooltip>
                  <Tooltip title="codevcn">
                     <Avatar alt="User Avatar" src={user.avatar} />
                  </Tooltip>
               </StyledAvatarGroup>
               <button className="flex gap-x-1 items-center h-[32px] bg-[#FFFFFF] py-1 px-2 text-secondary-text-cl font-medium rounded">
                  <GroupAddIcon fontSize="small" />
                  <span>Share</span>
               </button>
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <MoreHorizIcon fontSize="small" />
               </button>
            </div>
         </div>
         <section></section>
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
