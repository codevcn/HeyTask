import { Avatar, styled, TextField } from "@mui/material"
import { useUser } from "../../hooks/user"
import { TopNavigation } from "../TopNavigation"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import type { TUserData } from "../../services/types"
import { DateField } from "@mui/x-date-pickers/DateField"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs"

type TAvatarSectionProps = {
   avatar: string | null
   fullName: string
}

const AvatarSection = ({ avatar, fullName }: TAvatarSectionProps) => {
   return (
      <section className="rounded-lg shadow-lg p-6 w-full max-w-2xl">
         <h2 className="text-lg font-semibold mb-2 text-regular-text-cl">
            Profile photo and header image
         </h2>
         <div
            style={{
               backgroundImage:
                  "linear-gradient(to bottom, var(--ht-purple-from-ligr), var(--ht-pink-to-ligr))",
            }}
            className="flex w-full h-32 rounded-t-lg bg-cover bg-center"
         >
            <div className="group/root relative m-auto">
               {avatar ? (
                  <Avatar
                     alt="User Avatar"
                     className="w-24 h-24 rounded-full border-2 border-white"
                     src={avatar}
                     sx={{ height: 96, width: 96 }}
                  />
               ) : (
                  <Avatar sx={{ height: 96, width: 96 }}>{fullName[0]}</Avatar>
               )}
               <button className="hidden group-hover/root:flex absolute inset-0 items-center justify-center text-white bg-fade-layer-bgcl rounded-full">
                  <CameraAltIcon sx={{ height: 30, width: 30 }} color="inherit" />
               </button>
            </div>
         </div>
      </section>
   )
}

type TInfoSectionProps = {
   userData: TUserData
}

const InfoSection = ({ userData }: TInfoSectionProps) => {
   return (
      <section className="w-full p-6 rounded-lg shadow-md">
         <h2 className="text-lg leading-5 font-semibold">About you</h2>
         <hr className="my-4" />
         <div className="space-y-5">
            <div className="flex justify-between items-center">
               <div className="w-fit relative">
                  <label className="block text-sm">Full name</label>
                  <input
                     className="peer/input text-base bg-regular-bgcl px-4 py-2 rounded min-w-32 hover:bg-hover-silver-bgcl focus:bg-hover-silver-bgcl"
                     defaultValue={userData.fullName}
                  />
                  <div className="hidden peer-focus/input:flex gap-2 absolute top-full right-0 pt-1 z-20">
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CheckIcon sx={{ height: 16, width: 16 }} />
                     </button>
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CloseIcon sx={{ height: 16, width: 16 }} />
                     </button>
                  </div>
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit relative">
                  <label className="block text-sm">Email</label>
                  <input
                     className="text-base bg-regular-bgcl px-4 py-2 rounded min-w-32"
                     readOnly
                     defaultValue={userData.email}
                  />
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-full relative">
                  <label className="block text-sm">Bio</label>
                  <UserBioInput
                     slotProps={{ htmlInput: { className: "css-styled-vt-scrollbar peer/input" } }}
                     fullWidth
                     multiline
                     maxRows={4}
                     defaultValue={userData.bio || ""}
                     placeholder="Enter your bio here..."
                  />
                  <div className="hidden peer-focus/input:flex gap-2 absolute top-full right-0 pt-1 z-20">
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CheckIcon sx={{ height: 16, width: 16 }} />
                     </button>
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CloseIcon sx={{ height: 16, width: 16 }} />
                     </button>
                  </div>
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit relative">
                  <label className="block text-sm">Birthday</label>
                  <UserBirthdayInput
                     format="DD-MM-YYYY"
                     defaultValue={dayjs(userData.birthday || "")}
                     slotProps={{ textField: { className: "peer/input" } }}
                  />
                  <div className="hidden peer-focus/input:flex gap-2 absolute top-full right-0 pt-1 z-20">
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CheckIcon sx={{ height: 16, width: 16 }} />
                     </button>
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CloseIcon sx={{ height: 16, width: 16 }} />
                     </button>
                  </div>
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit relative">
                  <label className="block text-sm">Social link</label>
                  <input
                     className="peer/input text-base bg-regular-bgcl px-4 py-2 rounded min-w-32 hover:bg-hover-silver-bgcl focus:bg-hover-silver-bgcl"
                     placeholder="https://facebook.com/your-profile..."
                     defaultValue={userData.socialLink || ""}
                  />
                  <div className="hidden peer-focus/input:flex gap-2 absolute top-full right-0 pt-1 z-20">
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CheckIcon sx={{ height: 16, width: 16 }} />
                     </button>
                     <button className="flex p-2 rounded bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl border border-regular-border-cl">
                        <CloseIcon sx={{ height: 16, width: 16 }} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

const MainSection = () => {
   const user = useUser()!

   return (
      <div className="flex flex-col items-center bg-regular-bgcl text-regular-text-cl">
         <div className="border border-divider-cl w-[625px] mt-5 mb-10 rounded-md">
            <AvatarSection avatar={user.avatar} fullName={user.fullName} />
            <hr />
            <InfoSection userData={user} />
         </div>
      </div>
   )
}

const ProfilePage = () => {
   return (
      <div>
         <TopNavigation />
         <MainSection />
      </div>
   )
}

export default ProfilePage

const UserBioInput = styled(TextField)({
   "& .MuiInputBase-root": {
      color: "var(--ht-regular-text-cl)",
      padding: "8px 16px",
      "&:hover": {
         backgroundColor: "var(--ht-hover-silver-bgcl)",
      },
      "&.Mui-focused": {
         backgroundColor: "var(--ht-hover-silver-bgcl)",
      },
   },
   "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
   },
})

const UserBirthdayInput = styled(DateField)({
   "& .MuiInputBase-root": {
      color: "var(--ht-regular-text-cl)",
      padding: "8px 16px",
      "& .MuiInputBase-input": {
         padding: 0,
         lineHeight: "1.5rem",
      },
      "&:hover": {
         backgroundColor: "var(--ht-hover-silver-bgcl)",
      },
      "&.Mui-focused": {
         backgroundColor: "var(--ht-hover-silver-bgcl)",
      },
   },
   "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
   },
})
