type TRichFileTitleTemplateProps = {
   textContent: string
   fileURL: string
   fileId: number
}

export const RichFileTitleTemplate = ({
   textContent,
   fileURL,
   fileId,
}: TRichFileTitleTemplateProps) => (
   <span
      className="css-rich-file-title-template"
      data-ht-file-url={fileURL}
      data-ht-file-id={fileId}
   >
      {textContent}
   </span>
)
