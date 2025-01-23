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
               const { htFileId } = fileTitle.dataset
               if (htFileId && htFileId.length > 0) {
                  const fileId = parseInt(htFileId)
                  if (fileId) {
                     eventEmitter.emit(EInternalEvents.SHOW_UPLOADED_FILE_DETAILS, true, fileId)
                  }
               }
            }
         }
      }
   }

   useEffect(() => {
      initClickOnFileHandlers()
   }, [content])

   return (
      <div
         ref={contentWrapperRef}
         dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      ></div>
   )
}
