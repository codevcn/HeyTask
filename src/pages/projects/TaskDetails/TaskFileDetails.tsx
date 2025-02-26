import { Modal, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import type { TTaskFileData } from "../../../services/types"
import { LogoLoading } from "../../../components/Loadings"
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { taskService } from "../../../services/task-service"

export const TaskFileDetails = () => {
   const [fileData, setFileData] = useState<TTaskFileData>()
   const [open, setOpen] = useState<boolean>(false)

   const showUploadedFileDetails = (isShown: boolean, fileId: string) => {
      setOpen(isShown)
      if (isShown) {
         if (fileData && fileData.id === fileId) return
         taskService
            .getTaskFileDetails(fileId)
            .then((res) => {
               setFileData(res)
            })
            .catch((error) => {
               toast.error(axiosErrorHandler.handleHttpError(error).message)
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

   const viewFileInNewTab = (downloadUrl: string) => {
      window.open(downloadUrl, "_blank", "noopener,noreferrer")
   }

   const downloadFile = (downloadUrl: string) => {
      const download = document.createElement("a")
      download.href =
         "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=3yzhcmdq&dl=1"
      download.download = "vcn file"
      document.body.appendChild(download)
      download.click()
      document.body.removeChild(download)
   }

   const deleteFile = (fileId: string) => {}

   return (
      <StyledModal
         open={open}
         onClose={closeModal}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
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
                     <button
                        onClick={() => viewFileInNewTab(fileData.downloadUrl)}
                        className="flex items-center gap-x-2 rounded-md p-2 hover:bg-modal-btn-hover-bgcl"
                     >
                        <OpenInNewIcon fontSize="small" />
                        <span className="text-sm">Open in new tab</span>
                     </button>
                     <button
                        onClick={() => downloadFile(fileData.downloadUrl)}
                        className="flex items-center gap-x-2 rounded-md p-2 hover:bg-modal-btn-hover-bgcl"
                     >
                        <FileDownloadIcon />
                        <span className="text-sm">Download</span>
                     </button>
                     <button
                        onClick={() => deleteFile(fileData.id)}
                        className="flex items-center gap-x-2 rounded-md p-2 hover:bg-modal-btn-hover-bgcl"
                     >
                        <DeleteForeverIcon />
                        <span className="text-sm">Delete</span>
                     </button>
                  </div>
               </div>
            ) : (
               <LogoLoading className="m-auto" />
            )}
         </div>
      </StyledModal>
   )
}

const StyledModal = styled(Modal)({
   "& .MuiBackdrop-root": {
      backgroundColor: "var(--ht-regular-modal-bgcl)",
   },
})
