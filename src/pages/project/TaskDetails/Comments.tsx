import { Avatar, Popover, styled } from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import { useUser, useUserInProject } from "../../../hooks/user"
import { displayPreTimePeriod, randomInteger } from "../../../utils/helpers"
import { addNewComment, deleteComment, editComment } from "../../../redux/project/project-slice"
import type { TCommentData, TUserData } from "../../../services/types"
import { Editor as TinyMCEEditor } from "tinymce"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../../hooks/redux"
import { CustomRichTextContent } from "../../../components/RichTextContent"
import { CustomRichTextEditor } from "../../../components/RichTextEditor"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import CloseIcon from "@mui/icons-material/Close"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { TIME_TO_DELETE_COMMENT, TIME_TO_EDIT_COMMENT } from "../../../utils/constants"

type TDeleteCommentProps = {
   commentId: number
   createdAt: string
}

const DeleteComment = ({ commentId, createdAt }: TDeleteCommentProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)
   const dispatch = useAppDispatch()

   const handleOpenDeleteMemberBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         const deleteExpires = dayjs().isAfter(dayjs(createdAt).add(TIME_TO_DELETE_COMMENT, "hour"))
         if (deleteExpires) {
            toast.warn("User just can delete user's comment within 2 hours")
            return
         }
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   const deleteCommentHandler = () => {
      dispatch(deleteComment(commentId))
   }

   return (
      <>
         <button onClick={handleOpenDeleteMemberBoard} className="hover:underline text-xs">
            Delete
         </button>
         <StyledPopover
            open={!!anchorEle}
            anchorEl={anchorEle}
            onClose={() => handleOpenDeleteMemberBoard()}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
         >
            <div className="bg-modal-popover-bgcl rounded-md p-3 text-regular-text-cl w-[300px]">
               <div className="relative w-full py-1">
                  <h3 className="w-full text-center text-sm font-bold">Members</h3>
                  <button
                     onClick={() => handleOpenDeleteMemberBoard()}
                     className="flex absolute right-0 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                  >
                     <CloseIcon className="text-regular-text-cl" fontSize="small" />
                  </button>
               </div>
               <p className="text-sm mt-2">Deleting a comment is forever. There is no undo.</p>
               <button
                  onClick={deleteCommentHandler}
                  className="text-sm mt-2 bg-delete-btn-bgcl rounded-md p-1 w-full text-black font-bold hover:bg-delete-btn-hover-bgcl"
               >
                  Delete comment
               </button>
            </div>
         </StyledPopover>
      </>
   )
}

type TUserCommentProps = {
   commentData: TCommentData
   onFocusEditor: (editorWrapperId: string) => void
   onBlurEditor: (editorWrapperId: string) => void
   userData: TUserData
}

const UserComment = ({ commentData, onFocusEditor, onBlurEditor, userData }: TUserCommentProps) => {
   const { user, content, createdAt, id } = commentData
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()

   const editCommentHandler = () => {
      const editor = editorRef.current
      if (editor) {
         const content = editor.getContent()
         if (content && content.length > 0) {
            dispatch(
               editComment({
                  content,
                  createdAt: new Date().toISOString(),
                  id,
               }),
            )
            setOpenEditor(false)
         }
      }
   }

   const editing = () => {
      const editExpires = dayjs().isAfter(dayjs(createdAt).add(TIME_TO_EDIT_COMMENT, "minute"))
      if (editExpires) {
         toast.warn("User just can edit user's comment within 15 minutes")
         return
      }
      setOpenEditor(true)
      eventEmitter.emit(EInternalEvents.OPENING_COMMENT_EDITOR, commentData.id)
   }

   useEffect(() => {
      const openCommentEditor = (commentId: number) => {
         setOpenEditor(commentId === commentData.id)
      }
      eventEmitter.on(EInternalEvents.OPENING_COMMENT_EDITOR, openCommentEditor)
      return () => {
         eventEmitter.removeListener(EInternalEvents.OPENING_COMMENT_EDITOR, openCommentEditor)
      }
   }, [])

   return (
      <div className="flex py-2 gap-x-1">
         <div className="w-10 pt-1">
            {user.avatar ? (
               <Avatar src={user.avatar} sx={{ height: 32, width: 32 }} />
            ) : (
               <Avatar sx={{ height: 32, width: 32 }}>{user.fullName[0]}</Avatar>
            )}
         </div>
         {openEditor ? (
            <div className="w-full">
               <CustomRichTextEditor
                  editorRef={editorRef}
                  defaultContent={content || undefined}
                  onFocus={() => onFocusEditor(`editor-wrapper-edit-comment-${id}`)}
                  onBlur={() => onBlurEditor(`editor-wrapper-edit-comment-${id}`)}
                  wrapperClassName="css-rich-text-editor-wrapper"
                  wrapperId={`editor-wrapper-edit-comment-${id}`}
               />
               <div className="flex gap-x-3 mt-2">
                  <button
                     onClick={editCommentHandler}
                     className="bg-confirm-btn-bgcl rounded font-medium hover:bg-outline-cl text-black text-sm py-2 px-3"
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
         ) : (
            <div className="w-full">
               <div className="flex items-center gap-x-3 text-regular-text-cl pl-1">
                  <h3 className="font-bold text-sm">{user.fullName}</h3>
                  <span className="text-xs">{displayPreTimePeriod(createdAt)}</span>
               </div>
               <div className="css-task-details-user-comment bg-focused-textfield-bgcl p-3 mt-[2px] rounded-md leading-tight">
                  <CustomRichTextContent content={content} />
               </div>
               {user.id === userData.id && (
                  <div className="flex items-center gap-x-1 pl-2 mt-1 text-regular-text-cl">
                     <button onClick={editing} className="hover:underline text-xs">
                        Edit
                     </button>
                     <span>•</span>
                     <DeleteComment commentId={id} createdAt={createdAt} />
                  </div>
               )}
            </div>
         )}
      </div>
   )
}

type TUserEditorProps = {
   onFocusEditor: (editorWrapperId: string) => void
   onBlurEditor: (editorWrapperId: string) => void
}

const MakeNewComment = ({ onBlurEditor, onFocusEditor }: TUserEditorProps) => {
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()
   const user = useUserInProject()!

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

   const openCommentEditor = () => {
      setOpenEditor(true)
      eventEmitter.emit(EInternalEvents.OPENING_COMMENT_EDITOR, -1)
   }

   useEffect(() => {
      const openEditorListener = (commentId: number) => {
         setOpenEditor(commentId === -1)
      }
      eventEmitter.on(EInternalEvents.OPENING_COMMENT_EDITOR, openEditorListener)
      return () => {
         eventEmitter.removeListener(EInternalEvents.OPENING_COMMENT_EDITOR, openEditorListener)
      }
   }, [])

   return (
      <>
         <div className="w-10">
            {user.avatar ? (
               <Avatar src={user.avatar} alt="User Avatar" sx={{ height: 32, width: 32 }} />
            ) : (
               <Avatar sx={{ height: 32, width: 32 }}>{user.fullName[0]}</Avatar>
            )}
         </div>
         <button
            onClick={openCommentEditor}
            className="px-3 py-2 rounded-md bg-focused-textfield-bgcl text-regular-text-cl w-full text-start hover:bg-[#292f35]"
            hidden={openEditor}
         >
            Write a comment...
         </button>
         <div className="w-full" hidden={!openEditor}>
            <CustomRichTextEditor
               editorRef={editorRef}
               placeholder="Write your comment here..."
               onFocus={() => onBlurEditor("editor-wrapper-make-new-comment")}
               onBlur={() => onFocusEditor("editor-wrapper-make-new-comment")}
               wrapperId="editor-wrapper-make-new-comment"
               wrapperClassName="css-rich-text-editor-wrapper"
            />
            <div className="flex gap-x-3 mt-2">
               <button
                  onClick={addNewCommentHandler}
                  className="bg-confirm-btn-bgcl rounded font-medium hover:bg-outline-cl text-black text-sm py-2 px-3"
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
      </>
   )
}

type TCommentsProps = {
   comments: TCommentData[] | null
}

export const Comments = ({ comments }: TCommentsProps) => {
   const editorsContainerRef = useRef<HTMLDivElement>(null)
   const user = useUser()!

   const focusBlurEditor = (editorWrapperId: string, type: "focus" | "blur") => {
      const editorWrapper = editorsContainerRef.current?.querySelector<HTMLDivElement>(
         `#${editorWrapperId}`,
      )
      if (editorWrapper) {
         editorWrapper.style.borderColor = type === "focus" ? "var(--ht-outline-cl)" : "#738496"
      }
   }

   return (
      <div className="mt-6">
         <div className="flex items-center text-regular-text-cl">
            <div className="w-10">
               <ChatIcon />
            </div>
            <h3 className="text-base font-bold">Comments</h3>
         </div>
         <div className="mt-2 w-full" ref={editorsContainerRef}>
            <div className="flex items-center gap-x-1 mb-2">
               <MakeNewComment
                  onBlurEditor={(editorWrapperId) => focusBlurEditor(editorWrapperId, "blur")}
                  onFocusEditor={(editorWrapperId) => focusBlurEditor(editorWrapperId, "focus")}
               />
            </div>
            {comments &&
               comments.length > 0 &&
               comments.map((comment) => (
                  <UserComment
                     key={comment.id}
                     commentData={comment}
                     onBlurEditor={(editorWrapperId) => focusBlurEditor(editorWrapperId, "blur")}
                     onFocusEditor={(editorWrapperId) => focusBlurEditor(editorWrapperId, "focus")}
                     userData={user}
                  />
               ))}
         </div>
      </div>
   )
}

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 6,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-regular-border-cl) solid",
   },
})
