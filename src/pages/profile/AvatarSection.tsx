import { Avatar, Dialog, styled, Slider } from "@mui/material"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import { useCallback, useEffect, useRef, useState } from "react"
import { userService } from "../../services/user-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import Cropper from "react-easy-crop"
import type { Point, Area } from "react-easy-crop"
import { getCroppedImg } from "../../utils/helpers"
import { useAppDispatch } from "../../hooks/redux"
import { updateUserData } from "../../redux/user/user-slice"
import { LogoLoading } from "../../components/Loadings"

type TAvatarPreviewSectionProps = {
   avatarURL: string
   onCropComplete: (croppedAreaPixels: Area) => void
}

const UpdateAvatarPreview = ({ avatarURL, onCropComplete }: TAvatarPreviewSectionProps) => {
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
   const [zoom, setZoom] = useState(1)

   const handleCropComplete = useCallback(
      (_: any, croppedAreaPixels: Area) => {
         onCropComplete(croppedAreaPixels)
      },
      [onCropComplete],
   )

   const zooming = (_: Event, zoomValue: number | number[]) => {
      setZoom(zoomValue as number)
   }

   return (
      <div className="flex flex-col items-center w-full">
         <div className="w-72 h-72 relative">
            <Cropper
               image={avatarURL}
               crop={crop}
               zoom={zoom}
               aspect={1}
               onCropChange={setCrop}
               onCropComplete={handleCropComplete}
               onZoomChange={setZoom}
            />
         </div>
         <div className="flex items-center gap-5 w-72 mt-5 text-confirm-btn-bgcl">
            <Slider
               value={zoom}
               shiftStep={1}
               step={0.1}
               marks
               min={1}
               max={3}
               onChange={zooming}
               sx={{ color: "inherit" }}
            />
         </div>
      </div>
   )
}

type TAvatarSectionProps = {
   originalAvatar: string | null
   fullName: string
}

export const AvatarSection = ({ originalAvatar, fullName }: TAvatarSectionProps) => {
   const [openUploadAvatar, setOpenUploadAvatar] = useState<boolean>(false)
   const [imgPreview, setImgPreview] = useState<string>()
   const avatarInputRef = useRef<HTMLInputElement>(null)
   const [loading, setLoading] = useState<boolean>(false)
   const croppedAvatarRef = useRef<Area>()
   const dispatch = useAppDispatch()

   const handleCropComplete = (croppedAreaPixels: Area) => {
      croppedAvatarRef.current = croppedAreaPixels
   }

   const handleDropImage = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      const image = e.dataTransfer.files?.[0]
      if (image) {
         setImgPreview(URL.createObjectURL(image))
      }
   }

   const pickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0]
      if (image) {
         setImgPreview(URL.createObjectURL(image))
      }
   }

   const uploadUserAvatar = (avatar: Blob) => {
      userService
         .uploadImage(avatar)
         .then((res) => {
            const { imageURL } = res
            userService
               .updateProfile({ avatar: imageURL })
               .then(() => {
                  toast.success("Update user avatar successfully!")
                  dispatch(updateUserData({ avatar: imageURL }))
               })
               .catch((error) => {
                  toast.error(axiosErrorHandler.handleHttpError(error).message)
               })
               .finally(() => {
                  setLoading(false)
               })
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
            setLoading(false)
         })
   }

   const updateUserAvatarHandler = () => {
      if (imgPreview) {
         setLoading(true)
         const croppedPixels = croppedAvatarRef.current
         if (croppedPixels) {
            getCroppedImg(imgPreview, croppedPixels)
               .then((img) => {
                  if (img) {
                     uploadUserAvatar(img)
                  }
               })
               .catch((error) => {
                  toast.error(axiosErrorHandler.handleHttpError(error).message)
               })
         } else {
            const img = avatarInputRef.current?.files?.[0]
            if (img) {
               uploadUserAvatar(img)
            }
         }
      }
   }

   const closeUpdateAvatarSection = () => {
      const avtarInputEle = avatarInputRef.current
      if (avtarInputEle) {
         avtarInputEle.value = ""
      }
      setOpenUploadAvatar(false)
      setImgPreview(undefined)
   }

   useEffect(() => {
      return () => {
         if (imgPreview) URL.revokeObjectURL(imgPreview)
      }
   }, [imgPreview])

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
            <button
               className="group/root relative m-auto"
               onClick={() => setOpenUploadAvatar(true)}
            >
               {originalAvatar ? (
                  <Avatar
                     alt="User Avatar"
                     className="w-24 h-24 rounded-full border-2 border-white"
                     src={originalAvatar}
                     sx={{ height: 96, width: 96 }}
                  />
               ) : (
                  <Avatar sx={{ height: 96, width: 96 }}>{fullName[0]}</Avatar>
               )}
               <div className="hidden group-hover/root:flex absolute inset-0 items-center justify-center text-white bg-fade-layer-bgcl rounded-full">
                  <CameraAltIcon sx={{ height: 30, width: 30 }} color="inherit" />
               </div>
            </button>
         </div>

         <UpdateAvatarSection
            maxWidth="xs"
            fullWidth
            open={openUploadAvatar}
            onClose={closeUpdateAvatarSection}
         >
            <div className="p-6 rounded-lg shadow-md text-center text-regular-text-cl relative">
               {loading && (
                  <div className="flex absolute inset-0 z-20 bg-regular-modal-bgcl">
                     <LogoLoading className="m-auto" />
                  </div>
               )}
               <h1 className="text-xl font-semibold mb-6">Change profile photo</h1>
               {imgPreview ? (
                  <UpdateAvatarPreview avatarURL={imgPreview} onCropComplete={handleCropComplete} />
               ) : (
                  <>
                     <label
                        onDrop={handleDropImage}
                        onDragOver={(e) => e.preventDefault()}
                        htmlFor="user-avatar-input"
                        className="flex flex-col items-center justify-center gap-3 w-52 h-52 p-5 mx-auto mb-4 border-2 border-dashed border-regular-text-cl rounded-full"
                     >
                        <input
                           id="user-avatar-input"
                           type="file"
                           accept="image/*"
                           hidden
                           ref={avatarInputRef}
                           onChange={pickImage}
                        />
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           height="78px"
                           viewBox="0 0 1024 1024"
                           version="1.1"
                        >
                           <path
                              d="M736.68 435.86a173.773 173.773 0 0 1 172.042 172.038c0.578 44.907-18.093 87.822-48.461 119.698-32.761 34.387-76.991 51.744-123.581 52.343-68.202 0.876-68.284 106.718 0 105.841 152.654-1.964 275.918-125.229 277.883-277.883 1.964-152.664-128.188-275.956-277.883-277.879-68.284-0.878-68.202 104.965 0 105.842zM285.262 779.307A173.773 173.773 0 0 1 113.22 607.266c-0.577-44.909 18.09-87.823 48.461-119.705 32.759-34.386 76.988-51.737 123.58-52.337 68.2-0.877 68.284-106.721 0-105.842C132.605 331.344 9.341 454.607 7.379 607.266 5.417 759.929 135.565 883.225 285.262 885.148c68.284 0.876 68.2-104.965 0-105.841z"
                              fill="#4A5699"
                           />
                           <path
                              d="M339.68 384.204a173.762 173.762 0 0 1 172.037-172.038c44.908-0.577 87.822 18.092 119.698 48.462 34.388 32.759 51.743 76.985 52.343 123.576 0.877 68.199 106.72 68.284 105.843 0-1.964-152.653-125.231-275.917-277.884-277.879-152.664-1.962-275.954 128.182-277.878 277.879-0.88 68.284 104.964 68.199 105.841 0z"
                              fill="#C45FA0"
                           />
                           <path
                              d="M545.039 473.078c16.542 16.542 16.542 43.356 0 59.896l-122.89 122.895c-16.542 16.538-43.357 16.538-59.896 0-16.542-16.546-16.542-43.362 0-59.899l122.892-122.892c16.537-16.542 43.355-16.542 59.894 0z"
                              fill="#F39A2B"
                           />
                           <path
                              d="M485.17 473.078c16.537-16.539 43.354-16.539 59.892 0l122.896 122.896c16.538 16.533 16.538 43.354 0 59.896-16.541 16.538-43.361 16.538-59.898 0L485.17 532.979c-16.547-16.543-16.547-43.359 0-59.901z"
                              fill="#F39A2B"
                           />
                           <path
                              d="M514.045 634.097c23.972 0 43.402 19.433 43.402 43.399v178.086c0 23.968-19.432 43.398-43.402 43.398-23.964 0-43.396-19.432-43.396-43.398V677.496c0.001-23.968 19.433-43.399 43.396-43.399z"
                              fill="#E5594F"
                           />
                        </svg>
                        <p className="text-gray-500">Drag and drop your image here</p>
                     </label>
                     <p className="text-gray-500 mb-4">or</p>
                     <label
                        htmlFor="user-avatar-input"
                        className="bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl cursor-pointer text-regular-text-cl py-2 px-4 rounded"
                     >
                        Upload a photo
                     </label>
                  </>
               )}
               <div className="flex justify-end gap-2 mt-8">
                  <button
                     onClick={closeUpdateAvatarSection}
                     className="bg-delete-btn-bgcl hover:bg-delete-btn-hover-bgcl text-black py-1.5 px-4 rounded font-bold"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={updateUserAvatarHandler}
                     className={`${imgPreview ? "" : "cursor-no-drop opacity-70"} flex gap-2 items-center bg-confirm-btn-bgcl hover:bg-confirm-btn-hover-bgcl text-black py-1.5 px-4 rounded font-bold`}
                  >
                     <CloudUploadIcon fontSize="small" />
                     <span>Upload</span>
                  </button>
               </div>
            </div>
         </UpdateAvatarSection>
      </section>
   )
}

const UpdateAvatarSection = styled(Dialog)({
   "& .MuiPaper-root": {
      backgroundColor: "var(--ht-modal-board-bgcl)",
   },
})
