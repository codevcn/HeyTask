import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import ReorderIcon from "@mui/icons-material/Reorder"
import { updateTaskData } from "../../../redux/project/project-slice"
import { CustomRichTextContent } from "../../../components/RichTextContent"
import { TTinyMCEFilePickerCallback } from "../../../utils/types"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { RichFileTitleTemplate } from "../../../components/NonInteractiveTemplates"
import { renderToStaticMarkup } from "react-dom/server"
import { EInternalEvents, eventEmitter } from "../../../utils/events"

const { VITE_TINYMCE_API_KEY } = import.meta.env

type TDescriptionProps = {
   description: string
}

export const Description = ({ description }: TDescriptionProps) => {
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorWrapperRef = useRef<HTMLDivElement>(null)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()

   const plugins: string = "autolink lists link image fullscreen code autoresize"

   const toolbar: string =
      "blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat link | image customUploadFileButton"

   const focusEditor = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "var(--ht-outline-cl)"
      }
   }

   const blurEditor = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "#738496"
      }
   }

   const saveDescription = () => {
      const editor = editorRef.current
      if (editor) {
         const content = editor.getContent()
         if (content && content.length > 0) {
            dispatch(updateTaskData({ description: content }))
            setOpenEditor(false)
         }
      }
   }

   const uploadTaskFileHandler = async (file: File) => {
      eventEmitter.emit(EInternalEvents.OPEN_FIXED_LOADING, true)
      const result = await projectService.uploadTaskFile(file)
      eventEmitter.emit(EInternalEvents.OPEN_FIXED_LOADING, false)
      return result
   }

   const pickingFile: TTinyMCEFilePickerCallback = (callback, _, { filetype }) => {
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
            uploadTaskFileHandler(file)
               .then((res) => {
                  if (filetype === "image") {
                     callback(res.url, { alt: file.name })
                  } else if (filetype === "file") {
                     callback(res.url, { text: file.name })
                  }
               })
               .catch((error) => {
                  toast.error(axiosErrorHandler.handleHttpError(error).message)
               })
         }
      }
      input.click()
   }

   const onInitRichTextEditor = (editor: TinyMCEEditor) => {
      editor.ui.registry.addButton("customUploadFileButton", {
         icon: "new-document",
         tooltip: "Upload a file",
         onAction: (_) => {
            const input = document.createElement("input")
            input.setAttribute("type", "file")
            input.setAttribute("accept", ".doc,.docx,.xls,.xlsx,.pdf")
            input.onchange = (e) => {
               const file = (e.target as HTMLInputElement | undefined)?.files?.[0]
               if (file && file instanceof File) {
                  uploadTaskFileHandler(file)
                     .then((res) => {
                        editor.insertContent(
                           renderToStaticMarkup(
                              <RichFileTitleTemplate
                                 textContent={file.name}
                                 fileURL={res.url}
                                 fileId={res.id}
                              />,
                           ),
                        )
                     })
                     .catch((error) => {
                        toast.error(axiosErrorHandler.handleHttpError(error).message)
                     })
               }
            }
            input.click()
         },
      })
   }

   return (
      <div className="mt-6">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <div className="w-10">
                  <ReorderIcon className="text-regular-text-cl" />
               </div>
               <h3 className="text-regular-text-cl font-bold text-base">Description</h3>
            </div>
            <button
               hidden={openEditor}
               onClick={() => setOpenEditor(true)}
               className="py-[5px] px-4 rounded text-regular-text-cl text-sm font-semibold bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl"
            >
               Edit
            </button>
         </div>
         <div className="mt-2 pl-10 w-full">
            {!openEditor &&
               (description ? (
                  <div className="css-task-details-description leading-tight">
                     <CustomRichTextContent content={description} />
                  </div>
               ) : (
                  <div className="bg-modal-btn-bgcl rounded-md p-2 text-regular-text-cl text-sm font-medium">
                     Add a description for this task...
                  </div>
               ))}
            <div className="w-full" hidden={!openEditor}>
               <div ref={editorWrapperRef} className="css-rich-text-editor-wrapper">
                  <Editor
                     apiKey={VITE_TINYMCE_API_KEY}
                     onInit={(_evt, editor) => (editorRef.current = editor)}
                     initialValue={description}
                     init={{
                        placeholder: "Write your description here...",
                        height: 275,
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
                        setup: onInitRichTextEditor,
                     }}
                     onFocus={focusEditor}
                     onBlur={blurEditor}
                  />
               </div>
               <div className="flex gap-x-3 mt-2">
                  <button
                     onClick={saveDescription}
                     className="bg-confirm-btn-bgcl font-bold rounded hover:bg-outline-cl text-black text-sm py-2 px-3"
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
      </div>
   )
}
