import { Fade, Modal, styled, TextField, AvatarGroup, Avatar, Tooltip } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../utils/events"
import SubtitlesIcon from "@mui/icons-material/Subtitles"
import CloseIcon from "@mui/icons-material/Close"
import { LogoLoading } from "../../components/Loadings"
import { projectService } from "../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setTaskData, updateTaskData } from "../../redux/project/project-slice"
import type { TCommentData, TTaskMemberData } from "../../services/types"
import AddIcon from "@mui/icons-material/Add"
import ReorderIcon from "@mui/icons-material/Reorder"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import GroupsIcon from "@mui/icons-material/Groups"
import { Editor } from "@tinymce/tinymce-react"
import { Editor as TinyMCEEditor } from "tinymce"
import parse from "html-react-parser"
import ChatIcon from "@mui/icons-material/Chat"
import { useUser } from "../../hooks/user"
import { displayPreTimePeriod } from "../../utils/helpers"

const { VITE_TINYMCE_API_KEY } = import.meta.env

type TCommentProps = {
   commentData: TCommentData
}

const Comment = ({ commentData }: TCommentProps) => {
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
            <div className="bg-[#22272B] p-3 mt-[2px] rounded-md">{parse(content)}</div>
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

const Comments = ({ comments }: TCommentsProps) => {
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorWrapperRef = useRef<HTMLDivElement>(null)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()
   const user = useUser()!

   const plugins: string[] = [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
      "autoresize",
   ]
   const toolbar: string =
      "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"

   const editing = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "#85B8FF"
      }
   }

   const blurEditor = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "transparent"
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
                  className="p-3 rounded-md bg-[#22272B] text-regular-text-cl w-full text-start"
                  hidden={openEditor}
               >
                  Write a comment...
               </button>
               <div className="pl-10 w-full" hidden={!openEditor}>
                  <div ref={editorWrapperRef} className="w-full rounded-md border-2 border-solid">
                     <Editor
                        apiKey={VITE_TINYMCE_API_KEY}
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        init={{
                           placeholder: "Write your comment here...",
                           min_height: 275,
                           menubar: false,
                           plugins,
                           toolbar,
                           skin: "oxide",
                           width: "100%",
                           statusbar: false,
                           content_css: "/src/styles/tinymce-content.css",
                        }}
                        onFocus={editing}
                        onBlur={blurEditor}
                     />
                  </div>
                  <div className="flex gap-x-3 mt-2">
                     <button
                        onClick={saveDescription}
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
            {!openEditor &&
               comments &&
               comments.length > 0 &&
               comments.map((comment) => <Comment key={comment.id} commentData={comment} />)}
         </div>
      </div>
   )
}

type TDescriptionProps = {
   description: string
}

const Description = ({ description }: TDescriptionProps) => {
   const [openEditor, setOpenEditor] = useState<boolean>(false)
   const editorWrapperRef = useRef<HTMLDivElement>(null)
   const editorRef = useRef<TinyMCEEditor | null>(null)
   const dispatch = useAppDispatch()

   const plugins: string[] = [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
      "autoresize",
   ]
   const toolbar: string =
      "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"

   const editing = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "#85B8FF"
      }
   }

   const blurEditor = () => {
      const editorWrapper = editorWrapperRef.current
      if (editorWrapper) {
         editorWrapper.style.borderColor = "transparent"
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
                  <div>{parse(description)}</div>
               ) : (
                  <div className="bg-modal-btn-bgcl rounded-md p-2 text-regular-text-cl text-sm font-medium">
                     Add a description for this task...
                  </div>
               ))}
            <div className="w-full" hidden={!openEditor}>
               <div ref={editorWrapperRef} className="w-full rounded-md border-2 border-solid">
                  <Editor
                     apiKey={VITE_TINYMCE_API_KEY}
                     onInit={(_evt, editor) => (editorRef.current = editor)}
                     initialValue={description}
                     init={{
                        min_height: 275,
                        menubar: false,
                        plugins,
                        toolbar,
                        skin: "oxide",
                        width: "100%",
                        statusbar: false,
                        content_css: "/src/styles/tinymce-content.css",
                     }}
                     onFocus={editing}
                     onBlur={blurEditor}
                  />
               </div>
               <div className="flex gap-x-3 mt-2">
                  <button
                     onClick={saveDescription}
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
      </div>
   )
}

type TTaskMemberProps = {
   members: TTaskMemberData[]
}

const Members = ({ members }: TTaskMemberProps) => {
   return (
      <div className="pl-10">
         <h3 className="text-regular-text-cl font-semibold text-sm">Members</h3>
         <div className="flex items-center gap-x-2 mt-1">
            <StyledAvatarGroup
               max={5}
               renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
            >
               {members.map(({ avatar, id, fullName }) => (
                  <Tooltip key={id} title={fullName} arrow>
                     {avatar ? (
                        <Avatar alt="User Avatar" src={avatar} />
                     ) : (
                        <Avatar alt="User Avatar">{fullName[0]}</Avatar>
                     )}
                  </Tooltip>
               ))}
            </StyledAvatarGroup>
            <Tooltip title="Add member">
               <button className="flex h-fit p-1 rounded-full bg-modal-btn-bgcl hover:bg-modal-btn-hover-bgcl">
                  <AddIcon className="text-regular-text-cl" />
               </button>
            </Tooltip>
         </div>
      </div>
   )
}

type TTitleProps = {
   taskTitle: string
   onClose: () => void
}

const Title = ({ taskTitle, onClose }: TTitleProps) => {
   // const quitEditing = (newTitle: string) => {
   //    if (newTitle && newTitle.length > 0) {
   //       dispatch(updateSinglePhase({ ...phaseData, title: newTitle }))
   //    }
   //    setIsEditing(false)
   // }

   // const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
   //    if (e.key === "Enter") {
   //       e.preventDefault()
   //       quitEditing((e.target as HTMLTextAreaElement).value || title)
   //    }
   // }

   // const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //    quitEditing((e.target as HTMLTextAreaElement).value || title)
   // }

   return (
      <header className="flex">
         <div className="w-8">
            <SubtitlesIcon className="text-regular-text-cl mt-1" />
         </div>
         <EditableTitle
            multiline
            fullWidth
            maxRows={5}
            defaultValue={taskTitle}
            // onKeyDown={catchEditingEnter}
            variant="outlined"
            // onBlur={blurListTitleInput}
         />
         <button onClick={onClose} className="p-1 hover:bg-hover-silver-bgcl rounded ml-3">
            <CloseIcon className="text-regular-text-cl" />
         </button>
      </header>
   )
}

const Actions = () => {
   return (
      <section className="flex flex-col gap-y-2 w-[168px] text-regular-text-cl">
         <Tooltip title="Join this task" arrow placement="left">
            <button className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl">
               <GroupRemoveIcon fontSize="small" />
               <span>Join</span>
            </button>
         </Tooltip>
         <Tooltip title="Leave this task" arrow placement="left">
            <button className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl">
               <GroupAddIcon fontSize="small" />
               <span>Leave</span>
            </button>
         </Tooltip>
         <Tooltip title="View members of this task" arrow placement="left">
            <button className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl">
               <GroupsIcon fontSize="small" />
               <span>Members</span>
            </button>
         </Tooltip>
      </section>
   )
}

export const TaskDetails = () => {
   const { taskData } = useAppSelector(({ project }) => project)
   const dispatch = useAppDispatch()
   const [open, setOpen] = useState<boolean>(false)

   const getTaskDetailsHandler = (taskId: number) => {
      projectService
         .getTaskDetails(taskId)
         .then((res) => {
            dispatch(setTaskData(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      eventEmitter.on(EInternalEvents.OPEN_PHASE_TASK_MODAL, (isOpen, taskId) => {
         setOpen(isOpen)
         if (isOpen) {
            if (taskData) {
               if (taskId !== taskData.id) {
                  dispatch(setTaskData(null))
                  getTaskDetailsHandler(taskId)
               }
            } else {
               getTaskDetailsHandler(taskId)
            }
         }
      })
      return () => {
         eventEmitter.off(EInternalEvents.OPEN_PHASE_TASK_MODAL)
      }
   }, [taskData])

   const closeModal = () => {
      setOpen(false)
   }

   return (
      <Modal sx={{ overflowY: "auto" }} keepMounted open={open}>
         <Fade in={open}>
            <div className="absolute inset-0 overflow-y-auto">
               <div className="absolute inset-0 z-10" onClick={closeModal}></div>
               <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-task-modal py-3 pl-5 pr-4 bg-modal-bgcl rounded-xl">
                  {taskData ? (
                     <>
                        <Title onClose={closeModal} taskTitle={taskData.title} />
                        <div className="flex justify-between gap-x-3 mt-6">
                           <section className="w-full">
                              <Members members={taskData.members || []} />
                              <Description description={taskData.description} />
                              <Comments comments={taskData.comments} />
                           </section>
                           <Actions />
                        </div>
                     </>
                  ) : (
                     <LogoLoading />
                  )}
               </div>
            </div>
         </Fade>
      </Modal>
   )
}

const EditableTitle = styled(TextField)({
   "& .MuiInputBase-formControl": {
      width: "100%",
      padding: "5px 8px",
      "& .MuiInputBase-input": {
         width: "100%",
         color: "#9fadbc",
         fontWeight: 700,
         fontSize: "1.1rem",
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
      "&:hover": {
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
         },
      },
      "&.Mui-focused": {
         backgroundColor: "#22272B",
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#85B8FF",
         },
      },
   },
})

const StyledAvatarGroup = styled(AvatarGroup)({
   "& .MuiAvatarGroup-avatar": {
      cursor: "pointer",
      height: 32,
      width: 32,
      border: "none",
      "&:hover": {
         outline: "2px solid white",
      },
   },
})
