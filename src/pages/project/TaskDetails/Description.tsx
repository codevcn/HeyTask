import { Editor as TinyMCEEditor } from "tinymce"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import ReorderIcon from "@mui/icons-material/Reorder"
import { updateTaskData } from "../../../redux/project/project-slice"
import { CustomRichTextContent } from "../../../components/RichTextContent"
import { CustomRichTextEditor } from "../../../components/RichTextEditor"

type TDescriptionProps = {
   description: string | null
}

export const Description = ({ description }: TDescriptionProps) => {
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorsContainerRef = useRef<HTMLDivElement>(null)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()

   const focusBlurEditor = (editorWrapperId: string, type: "focus" | "blur") => {
      const editorWrapper = editorsContainerRef.current?.querySelector<HTMLDivElement>(
         `#${editorWrapperId}`,
      )
      if (editorWrapper) {
         editorWrapper.style.borderColor = type === "focus" ? "var(--ht-outline-cl)" : "transparent"
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
            <div className="w-full" hidden={!openEditor} ref={editorsContainerRef}>
               <div className="css-rich-text-editor-wrapper">
                  <CustomRichTextEditor
                     editorRef={editorRef}
                     defaultContent={description || undefined}
                     onFocus={() => focusBlurEditor("editor-wrapper-make-new-comment", "focus")}
                     onBlur={() => focusBlurEditor("editor-wrapper-make-new-comment", "blur")}
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
