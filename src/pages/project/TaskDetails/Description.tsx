import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import ReorderIcon from "@mui/icons-material/Reorder"
import { updateTaskData } from "../../../redux/project/project-slice"
import { CustomRichTextContent } from "../../../components/RichTextContent"

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
      "blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat link"

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
