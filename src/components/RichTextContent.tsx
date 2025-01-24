import DOMPurify from "dompurify"
import { useEffect, useRef } from "react"
import { EInternalEvents, eventEmitter } from "../utils/events"

type TRichTextContentProps = {
   content: string
}

export const CustomRichTextContent = ({ content }: TRichTextContentProps) => {
   const contentWrapperRef = useRef<HTMLDivElement>(null)

   const initClickOnFileHandlers = () => {
      const fileTitles = contentWrapperRef.current?.querySelectorAll<HTMLSpanElement>(
         ".css-rich-file-title-template",
      )
      if (fileTitles && fileTitles.length > 0) {
         for (const fileTitle of fileTitles) {
            fileTitle.onclick = () => {
               const { htFileId: fileId } = fileTitle.dataset
               if (fileId && fileId.length > 0) {
                  if (fileId) {
                     eventEmitter.emit(EInternalEvents.SHOW_UPLOADED_FILE_DETAILS, true, fileId)
                  }
               }
            }
         }
      }
   }

   const initClickOnImageHandler = () => {
      const images = contentWrapperRef.current?.querySelectorAll<HTMLImageElement>("img")
      if (images && images.length > 0) {
         for (const img of images) {
            img.onclick = () => {}
         }
      }
   }

   useEffect(() => {
      initClickOnFileHandlers()
      initClickOnImageHandler()
   }, [content])

   return (
      <div
         ref={contentWrapperRef}
         className="css-original-rich-text"
         dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      ></div>
   )
}
