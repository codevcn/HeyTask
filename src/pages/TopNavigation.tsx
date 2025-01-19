import { type MouseEvent, useRef, useState } from "react"
import appLogo from "../assets/app-logo.png"
import { Menu, MenuItem, Button, styled } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useUser } from "../hooks/user"
import { StyledIconButton } from "../components/StyledIconButton"

type TActive = "projects" | "more" | undefined

const MenuList = () => {
   const [active, setActive] = useState<TActive>()
   const anchorElRef = useRef<HTMLElement | null>(null)

   const handleActive = (value: TActive, e?: MouseEvent<HTMLButtonElement>) => {
      if (e) {
         anchorElRef.current = e.currentTarget
      } else {
         anchorElRef.current = null
      }
      setActive(value)
   }

   return (
      <div className="flex items-center gap-x-2 text-[#9FADBC]">
         <StyledButton onClick={(e) => handleActive("projects", e)} endIcon={<ExpandMoreIcon />}>
            Projects
         </StyledButton>
         <StyledButton onClick={(e) => handleActive("projects", e)} endIcon={<ExpandMoreIcon />}>
            More
         </StyledButton>

         <Menu
            anchorEl={anchorElRef.current}
            open={active === "projects"}
            onClose={() => handleActive(undefined)}
         >
            <MenuItem>Project 1</MenuItem>
            <MenuItem>Project 2</MenuItem>
            <MenuItem>Project 3</MenuItem>
         </Menu>
         <Menu
            anchorEl={anchorElRef.current}
            open={active === "more"}
            onClose={() => handleActive(undefined)}
         >
            <MenuItem>More 1</MenuItem>
            <MenuItem>More 2</MenuItem>
            <MenuItem>More 3</MenuItem>
         </Menu>
      </div>
   )
}

const UserSection = () => {
   const user = useUser()!

   return (
      <div className="flex items-center gap-x-1">
         <div className="border border-[#8C9BAB] border-solid rounded hover:bg-hover-silver-bgcl mr-2">
            <input
               type="text"
               className="text-[#8C9BAB] bg-transparent outline-none px-2 py-1 pr-3 text-sm"
               placeholder="Tìm kiếm..."
            />
            <SearchIcon className="text-[#8C9BAB] mr-2" fontSize="small" />
         </div>
         <StyledIconButton>
            <NotificationsIcon className="text-white" fontSize="small" />
         </StyledIconButton>
         <StyledIconButton>
            <img className="h-[24px] w-[24px]" src={user.avatar} alt="User Avatar" />
         </StyledIconButton>
      </div>
   )
}

export const TopNavigation = () => {
   return (
      <nav className="flex justify-between gap-x-5 h-top-nav bg-top-nav-bgcl py-2 px-4 border-b border-divider-cl">
         <div className="flex gap-x-5">
            <div className="flex gap-x-[5px] items-center text-[#9EACBA] cursor-pointer">
               <img src={appLogo} alt="App Logo" className="h-[1.2rem]" />
               <span className="text-[1.2rem] font-bold">HeyTask</span>
            </div>
            <MenuList />
         </div>
         <UserSection />
      </nav>
   )
}

const StyledButton = styled(Button)({
   fontWeight: "bold",
   color: "inherit",
   textTransform: "none",
   "&:hover": {
      backgroundColor: "#333C43",
   },
})
