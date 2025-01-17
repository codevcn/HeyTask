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
import { BoardCanvas } from "./Lists"
import type { TUserData } from "../../utils/types"

type THeaderProps = {
   userData: TUserData
}

const Header = ({ userData }: THeaderProps) => {
   return (
      <section className="flex justify-between items-center gap-x-5 py-3 px-5 bg-[#0000003d] backdrop-blur-sm w-full h-[56px]">
         <div className="flex gap-x-3 items-center">
            <div className="border-none bg-transparent text-base font-bold">Blog Team Web App</div>
            <Tooltip
               title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
               arrow
            >
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <StarOutlineIcon fontSize="small" />
               </button>
            </Tooltip>
            <Tooltip title="Change visibility.">
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <GroupIcon fontSize="small" />
               </button>
            </Tooltip>
         </div>
         <div className="flex gap-x-3 items-center">
            <StyledAvatarGroup
               max={3}
               renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
            >
               <Tooltip title="codevcn" arrow>
                  <Avatar alt="User Avatar" src={userData.avatar} />
               </Tooltip>
               <Tooltip title="codevcn" arrow>
                  <Avatar alt="User Avatar" src={userData.avatar} />
               </Tooltip>
               <Tooltip title="codevcn" arrow>
                  <Avatar alt="User Avatar" src={userData.avatar} />
               </Tooltip>
               <Tooltip title="codevcn" arrow>
                  <Avatar alt="User Avatar" src={userData.avatar} />
               </Tooltip>
            </StyledAvatarGroup>
            <Tooltip title="Share this board with other people." arrow>
               <button className="flex gap-x-1 items-center h-[32px] bg-[#FFFFFF] py-1 px-2 text-secondary-text-cl font-medium rounded">
                  <GroupAddIcon fontSize="small" />
                  <span>Share</span>
               </button>
            </Tooltip>
            <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
               <MoreHorizIcon fontSize="small" />
            </button>
         </div>
      </section>
   )
}

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
         <Header userData={user} />
         <BoardCanvas />
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
