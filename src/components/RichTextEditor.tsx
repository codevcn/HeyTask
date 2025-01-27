import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import { TTinyMCEFilePickerCallback } from "../utils/types"
import { projectService } from "../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../utils/axios-error-handler"
import { RichFileTitleTemplate } from "../components/NonInteractiveTemplates"
import { renderToStaticMarkup } from "react-dom/server"
import { useState } from "react"
import { LogoLoading } from "./Loadings"
import { openFixedLoadingHandler } from "../utils/helpers"

const { VITE_TINYMCE_API_KEY } = import.meta.env

type TRichTextEditorProps = {
   onFocus: () => void
   onBlur: () => void
   editorRef: React.MutableRefObject<TinyMCEEditor | null>
   placeholder?: string
   defaultContent?: string
   cssFilePath?: string
   wrapperClassName?: string
}

export const CustomRichTextEditor = ({
   placeholder,
   onBlur,
   onFocus,
   editorRef,
   defaultContent,
   cssFilePath,
   wrapperClassName,
}: TRichTextEditorProps) => {
   const [isReady, setIsReady] = useState<boolean>(true)

   const plugins: string = "autolink lists link image fullscreen code autoresize"

   const toolbar: string =
      "blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat link | image customUploadFileButton"

   const pickingImage: TTinyMCEFilePickerCallback = (callback, _, { filetype }) => {
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
            openFixedLoadingHandler(true)
            projectService
               .uploadTaskFile(file)
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
               .finally(() => {
                  openFixedLoadingHandler(false)
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
                  projectService
                     .uploadTaskFile(file)
                     .then((res) => {
                        editor.insertContent(
                           renderToStaticMarkup(
                              <RichFileTitleTemplate textContent={file.name} fileId={res.id} />,
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
      setTimeout(() => {
         setIsReady(false)
      }, 500)
   }

   return (
      <>
         <div hidden={isReady} className={wrapperClassName || ""}>
            <Editor
               apiKey={VITE_TINYMCE_API_KEY}
               onInit={(_evt, editor) => (editorRef.current = editor)}
               initialValue={defaultContent}
               init={{
                  placeholder,
                  width: "100%",
                  menubar: false,
                  plugins,
                  toolbar,
                  skin: "oxide",
                  statusbar: false,
                  content_css: cssFilePath || "/src/styles/tinymce-content.css",
                  toolbar_mode: "wrap",
                  autoresize_bottom_margin: 0,
                  file_picker_types: "file image",
                  file_picker_callback: pickingImage,
                  setup: onInitRichTextEditor,
               }}
               onFocus={() => onFocus()}
               onBlur={() => onBlur()}
            />
         </div>
         <div hidden={!isReady} className="flex py-5 w-full bg-focused-textfield-bgcl">
            <LogoLoading className="m-auto -translate-y-2" />
         </div>
      </>
   )
}
