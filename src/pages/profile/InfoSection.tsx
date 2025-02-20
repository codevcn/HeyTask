import { MenuItem, Select, styled, TextField } from "@mui/material"
import type { TUserData, TUserProfileData } from "../../services/types"
import { DateField } from "@mui/x-date-pickers/DateField"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import { userService } from "../../services/user-service"
import { EGenders } from "../../utils/enums"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import WarningIcon from "@mui/icons-material/Warning"
import { useAppDispatch } from "../../hooks/redux"
import { updateUserData } from "../../redux/user/user-slice"
import { LogoLoading } from "../../components/Loadings"

type TInputTypes = keyof TUserProfileData

type TSubmitSectionProps = {
   inputType: TInputTypes
   focused: TFocused
   onUpdateProfile: (e: React.MouseEvent<HTMLElement>, inputType: TInputTypes) => void
   cancelSubmit: (e: React.MouseEvent<HTMLElement>) => void
   loading: TInputTypes | undefined
}

export const SubmitSection = ({
   inputType,
   focused,
   onUpdateProfile,
   cancelSubmit,
   loading,
}: TSubmitSectionProps) => {
   return loading === inputType ? (
      <div className="flex gap-2 absolute top-full right-0 mt-1 z-20">
         <div className="pt-1.5 pr-1">
            <LogoLoading size="small" />
         </div>
      </div>
   ) : (
      <div
         hidden={focused.inputType !== inputType}
         className="flex gap-2 absolute top-full right-0 mt-1 z-20"
      >
         <button
            onClick={(e) => onUpdateProfile(e, inputType)}
            className="flex p-2 rounded bg-[#2d2d2d] hover:bg-[#3b3e41] border border-regular-border-cl"
         >
            <CheckIcon sx={{ height: 16, width: 16 }} />
         </button>
         <button
            onClick={cancelSubmit}
            className="flex p-2 rounded bg-[#2d2d2d] hover:bg-[#3b3e41] border border-regular-border-cl"
         >
            <CloseIcon sx={{ height: 16, width: 16 }} />
         </button>
      </div>
   )
}

type TErrorSectionProps = {
   error: string | undefined
}

export const ErrorSection = ({ error }: TErrorSectionProps) => {
   return (
      error && (
         <div className="flex items-center gap-1 text-error-text-cl pt-0.5 text-sm">
            <WarningIcon sx={{ height: 18, width: 18 }} color="inherit" />
            <span>{error}</span>
         </div>
      )
   )
}

type TProfileDataError = Partial<{
   [key in TInputTypes]: string
}>

type TFocused = {
   element?: HTMLElement
   inputType?: TInputTypes
}

type TInfoSectionProps = {
   userData: TUserData
}

export const InfoSection = ({ userData }: TInfoSectionProps) => {
   const [loading, setLoading] = useState<TInputTypes>()
   const [error, setError] = useState<TProfileDataError>({})
   const [focused, setFocused] = useState<TFocused>({})
   const formRef = useRef<HTMLFormElement>(null)
   const dispatch = useAppDispatch()

   const onFocusInput = (e: React.MouseEvent<HTMLElement>, inputType: TInputTypes) => {
      setFocused({ element: e.currentTarget as HTMLElement, inputType })
   }

   const validate = (profileData: string, inputType: TInputTypes): string | null => {
      if (!profileData) {
         if (inputType === "fullName") {
            setError({ [inputType]: "Full name must not be empty!" })
         } else if (inputType === "birthday") {
            setError({ [inputType]: "Birthday must not be empty!" })
         } else if (inputType === "bio") {
            setError({ [inputType]: "Bio must not be empty!" })
         } else if (inputType === "socialLink") {
            setError({ [inputType]: "Social link must not be empty!" })
         }
         setFocused({})
         return null
      }
      return profileData
   }

   const updateProfileHandler = (e: React.MouseEvent<HTMLElement>, inputType: TInputTypes) => {
      e.stopPropagation()
      const formData = new FormData(formRef.current!)
      const data = validate(formData.get(inputType) as string, inputType)
      if (data) {
         setFocused({})
         setLoading(inputType)
         userService
            .updateProfile({ [inputType]: data })
            .then(() => {
               toast.success("Update profile successfully!")
               dispatch(updateUserData({ [inputType]: data }))
            })
            .catch((error) => {
               toast.error(axiosErrorHandler.handleHttpError(error).message)
            })
            .finally(() => {
               setLoading(undefined)
            })
      }
   }

   const quitFocused = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      setFocused({})
   }

   const handleMouseClickOnPage = (e: MouseEvent) => {
      const inputEle = focused.element
      if (inputEle && !inputEle.contains(e.target as Node)) {
         setFocused({})
      }
   }

   useEffect(() => {
      document.addEventListener("mousedown", handleMouseClickOnPage)
      return () => {
         document.removeEventListener("mousedown", handleMouseClickOnPage)
      }
   }, [focused])

   return (
      <section className="w-full p-6 rounded-lg shadow-md">
         <h2 className="text-lg leading-5 font-semibold">About you</h2>
         <hr className="my-4" />
         <form onSubmit={(e) => e.preventDefault()} ref={formRef} className="space-y-7">
            <div className="flex justify-between items-center">
               <div className="w-fit">
                  <label className="block text-sm">Full name</label>
                  <div className="relative w-fit" onClick={(e) => onFocusInput(e, "fullName")}>
                     <input
                        className={`${loading === "fullName" ? "bg-hover-silver-bgcl" : ""} text-base bg-regular-bgcl px-4 py-2 rounded min-w-32 hover:bg-hover-silver-bgcl focus:bg-hover-silver-bgcl`}
                        defaultValue={userData.fullName}
                        placeholder="Enter your full name here..."
                        name="fullName"
                     />
                     <SubmitSection
                        focused={focused}
                        inputType="fullName"
                        cancelSubmit={quitFocused}
                        onUpdateProfile={updateProfileHandler}
                        loading={loading}
                     />
                  </div>
                  <ErrorSection error={error["fullName"]} />
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit">
                  <label className="block text-sm">Email (Read only)</label>
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
                  <div className="relative w-full" onClick={(e) => onFocusInput(e, "bio")}>
                     <UserBioInput
                        slotProps={{
                           htmlInput: { className: "css-styled-vt-scrollbar" },
                           input: { name: "bio" },
                        }}
                        fullWidth
                        multiline
                        maxRows={10}
                        defaultValue={userData.bio || ""}
                        placeholder="Enter your bio here..."
                     />
                     <SubmitSection
                        focused={focused}
                        inputType="bio"
                        cancelSubmit={quitFocused}
                        onUpdateProfile={updateProfileHandler}
                        loading={loading}
                     />
                  </div>
                  <ErrorSection error={error["bio"]} />
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit">
                  <label className="block text-sm">Gender</label>
                  <StyledSelect
                     defaultValue={userData.gender}
                     size="small"
                     name="gender"
                     MenuProps={{
                        MenuListProps: {
                           className: "bg-modal-popover-bgcl bor border border-regular-border-cl",
                        },
                     }}
                  >
                     <StyledMenuItem value={EGenders.FEMALE}>Female</StyledMenuItem>
                     <StyledMenuItem value={EGenders.MALE}>Male</StyledMenuItem>
                     <StyledMenuItem value={EGenders.OTHERS}>Other</StyledMenuItem>
                  </StyledSelect>
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit">
                  <label className="block text-sm">Birthday</label>
                  <div className="relative w-fit" onClick={(e) => onFocusInput(e, "birthday")}>
                     <UserBirthdayInput
                        format="DD-MM-YYYY"
                        defaultValue={dayjs(userData.birthday || "")}
                        slotProps={{ textField: { name: "birthday" } }}
                     />
                     <SubmitSection
                        focused={focused}
                        inputType="birthday"
                        onUpdateProfile={updateProfileHandler}
                        cancelSubmit={quitFocused}
                        loading={loading}
                     />
                  </div>
                  <ErrorSection error={error["birthday"]} />
               </div>
            </div>
            <div className="flex justify-between items-center">
               <div className="w-fit">
                  <label className="block text-sm">Social link</label>
                  <div className="relative w-fit" onClick={(e) => onFocusInput(e, "socialLink")}>
                     <input
                        className={`${loading === "socialLink" ? "bg-hover-silver-bgcl" : ""} text-base bg-regular-bgcl px-4 py-2 rounded min-w-32 hover:bg-hover-silver-bgcl focus:bg-hover-silver-bgcl`}
                        placeholder="Ex: https://facebook.com/your-profile..."
                        defaultValue={userData.socialLink || ""}
                        name="socialLink"
                     />
                     <SubmitSection
                        focused={focused}
                        inputType="socialLink"
                        onUpdateProfile={updateProfileHandler}
                        cancelSubmit={quitFocused}
                        loading={loading}
                     />
                  </div>
                  <ErrorSection error={error["socialLink"]} />
               </div>
            </div>
         </form>
      </section>
   )
}

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
      backgroundColor: "var(--ht-hover-silver-bgcl)",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "var(--ht-regular-border-cl)",
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
