type TRichFileTitleTemplateProps = {
   textContent: string
   fileId: number
}

export const RichFileTitleTemplate = ({ textContent, fileId }: TRichFileTitleTemplateProps) => (
   <span className="css-rich-file-title-template" data-ht-file-id={fileId}>
      {textContent}
   </span>
)
