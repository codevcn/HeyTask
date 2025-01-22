import { Avatar } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import { useUser } from "../../../hooks/user"
import { displayPreTimePeriod, randomInteger } from "../../../utils/helpers"
import { addNewComment } from "../../../redux/project/project-slice"
import type { TCommentData } from "../../../services/types"
import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import parse from "html-react-parser"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import { TTinyMCEFilePickerCallback } from "../../../utils/types"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"

const { VITE_TINYMCE_API_KEY } = import.meta.env

type TCommentProps = {
   commentData: TCommentData
}

const UserComment = ({ commentData }: TCommentProps) => {
   const { user, content, createdAt } = commentData

   return (
      <div className="flex py-2 gap-x-1">
         <div className="w-10 pt-1">
            {user.avatar ? (
               <Avatar src={user.avatar} sx={{ height: 32, width: 32 }} />
            ) : (
               <Avatar sx={{ height: 32, width: 32 }}>{user.fullName[0]}</Avatar>
            )}
         </div>
         <div className="w-full">
            <div className="flex items-center gap-x-3 text-regular-text-cl pl-1">
               <h3 className="font-bold text-sm">{user.fullName}</h3>
               <span className="text-xs">{displayPreTimePeriod(createdAt)}</span>
            </div>
            <div className="Task-details-user-comment bg-focused-textfield-bgcl p-3 mt-[2px] rounded-md leading-tight">
               {parse(content)}
            </div>
            <div className="flex items-center gap-x-1 pl-2 mt-1 text-regular-text-cl">
               <button className="hover:underline text-xs">Edit</button>
               <span>•</span>
               <button className="hover:underline text-xs">Delete</button>
            </div>
         </div>
      </div>
   )
}

type TCommentsProps = {
   comments: TCommentData[] | null
}

export const Comments = ({ comments }: TCommentsProps) => {
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorWrapperRef = useRef<HTMLDivElement>(null)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()
   const user = useUser()!

   const plugins: string = "autolink lists link image fullscreen code autoresize"

   const toolbar: string =
      "blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat link | image"

   const focusEditor = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "var(--ht-outline-cl)"
      }
   }

   const blurEditor = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "transparent"
      }
   }

   const addNewCommentHandler = () => {
      const editor = editorRef.current
      if (editor) {
         const content = editor.getContent()
         if (content && content.length > 0) {
            dispatch(
               addNewComment({
                  content,
                  createdAt: new Date().toISOString(),
                  id: randomInteger(1, 1000),
                  user,
               }),
            )
            setOpenEditor(false)
            editor.setContent("")
         }
      }
   }

   const pickingFile: TTinyMCEFilePickerCallback = (callback, value, { filetype }) => {
      const input = document.createElement("input")
      input.setAttribute("type", "file")
      if (filetype === "image") {
         input.setAttribute("accept", "image/*")
      } else if (filetype === "file") {
         input.setAttribute("accept", ".doc,.docx,.xls,.xlsx,.pdf")
      }
      input.onchange = (e) => {
         const file = (e.target as HTMLInputElement | undefined)?.files?.[0]
         if (file && file instanceof File) {
            projectService
               .uploadTaskFile(file)
               .then((res) => {
                  if (filetype === "image") {
                     callback(res, { alt: file.name })
                  } else if (filetype === "file") {
                     callback("UploadedFile.html", { text: "file gi do" })
                  }
               })
               .catch((error) => {
                  toast.error(axiosErrorHandler.handleHttpError(error).message)
               })
         }
      }
      input.click()
   }

   return (
      <div className="mt-6">
         <div className="flex items-center text-regular-text-cl">
            <div className="w-10">
               <ChatIcon />
            </div>
            <h3 className="text-base font-bold">Comments</h3>
         </div>
         <div className="mt-2 w-full">
            <div className="flex items-center gap-x-1 mb-2">
               <div className="w-10">
                  {user.avatar ? (
                     <Avatar src={user.avatar} alt="User Avatar" sx={{ height: 32, width: 32 }} />
                  ) : (
                     <Avatar sx={{ height: 32, width: 32 }}>{user.fullName[0]}</Avatar>
                  )}
               </div>
               <button
                  onClick={() => setOpenEditor(true)}
                  className="p-3 rounded-md bg-focused-textfield-bgcl text-regular-text-cl w-full text-start hover:bg-[#292f35]"
                  hidden={openEditor}
               >
                  Write a comment...
               </button>
               <div className="w-full" hidden={!openEditor}>
                  <div ref={editorWrapperRef} className="w-full rounded-md border-2 border-solid">
                     <Editor
                        apiKey={VITE_TINYMCE_API_KEY}
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        init={{
                           placeholder: "Write your comment here...",
                           height: 65,
                           menubar: false,
                           plugins,
                           toolbar,
                           skin: "oxide",
                           width: "100%",
                           statusbar: false,
                           content_css: "/src/styles/tinymce-content.css",
                           toolbar_mode: "wrap",
                           autoresize_bottom_margin: 0,
                           file_picker_types: "file image",
                           file_picker_callback: pickingFile,
                        }}
                        onFocus={focusEditor}
                        onBlur={blurEditor}
                     />
                  </div>
                  <div className="flex gap-x-3 mt-2">
                     <button
                        onClick={addNewCommentHandler}
                        className="bg-dark-outline-cl rounded font-medium hover:bg-outline-cl text-black text-sm py-2 px-3"
                     >
                        Save
                     </button>
                     <button
                        onClick={() => setOpenEditor(false)}
                        className="hover:bg-modal-btn-hover-bgcl text-regular-text-cl text-sm font-semibold py-2 px-3 rounded"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
            {comments &&
               comments.length > 0 &&
               comments.map((comment) => <UserComment key={comment.id} commentData={comment} />)}
         </div>
      </div>
   )
}
