import { Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import type { TCommentFileData } from "../../../services/types"
import { projectService } from "../../../services/project-service"
import { LogoLoading } from "../../../components/Loadings"
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

export const CommentFileDetails = () => {
   const [fileData, setFileData] = useState<TCommentFileData>()
   const [open, setOpen] = useState<boolean>(false)

   const showUploadedFileDetails = (isShown: boolean, fileId: number) => {
      setOpen(isShown)
      if (isShown) {
         projectService.getCommentFileDetails(fileId).then((res) => {
            setFileData(res)
         })
      }
   }

   useEffect(() => {
      eventEmitter.on(EInternalEvents.SHOW_UPLOADED_FILE_DETAILS, showUploadedFileDetails)
      return () => {
         eventEmitter.off(EInternalEvents.SHOW_UPLOADED_FILE_DETAILS)
      }
   }, [])

   const closeModal = () => {
      setOpen(false)
   }

   return (
      <Modal keepMounted open={open} onClose={closeModal} aria-hidden="true">
         <div className="flex relative bg-transparent text-white h-full w-full">
            <div
               onClick={closeModal}
               className="absolute top-3 right-7 hover:bg-modal-btn-hover-bgcl p-2 cursor-pointer rounded-md"
            >
               <CloseIcon />
            </div>
            {fileData ? (
               <div className="flex flex-col items-center gap-y-3 m-auto p-5">
                  <h2 className="text-xl font-semibold w-fit">{fileData.fileName}</h2>
                  <div className="flex gap-x-2 items-center mt-3">
                     <span>{`Added ${dayjs(fileData.uploadedAt).format("MMM D, YYYY, h:mm A")}`}</span>
                     <span>•</span>
                     <span>{fileData.fileSize}</span>
                  </div>
                  <div className="flex items-center gap-x-4">
                     <button className="flex items-center gap-x-2 rounded-md p-2 hover:bg-modal-btn-hover-bgcl">
                        <OpenInNewIcon fontSize="small" />
                        <span className="text-sm">Open in new tab</span>
                     </button>
                     <button className="flex items-center gap-x-2 rounded-md p-2 hover:bg-modal-btn-hover-bgcl">
                        <FileDownloadIcon />
                        <span className="text-sm">Download</span>
                     </button>
                     <button className="flex items-center gap-x-2 rounded-md p-2 hover:bg-modal-btn-hover-bgcl">
                        <DeleteForeverIcon />
                        <span className="text-sm">Delete</span>
                     </button>
                  </div>
               </div>
            ) : (
               <LogoLoading className="m-auto" />
            )}
         </div>
      </Modal>
   )
}
