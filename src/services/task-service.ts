import axios from "axios"
import { perfomDelay, randomInteger } from "../utils/helpers"
import type { TTaskFileData, TTaskData, TUploadedFileData } from "./types"

class TaskService {
   async getTaskDetails(taskId: number): Promise<TTaskData> {
      await perfomDelay(1000)
      const data: TTaskData = {
         description: `<p><span style="color: #ced4d9;">oke lala</span><span style="color: #3598db;"><em><strong> vcn! no no no.<a title="Gardfield and friends Cartoon!!!" href="https://www.imdb.com/title/tt0094469/" target="_blank" rel="noopener">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</a></strong></em></span></p><h1><span style="color: #ced4d9;">aaadadadda</span></h1><ol><li><span style="color: #ced4d9;">aaaa</span></li><li><span style="color: #ced4d9;">bbbb</span></li><li><span style="color: #ced4d9;">cc</span></li></ol><p style="text-align: center;"><span style="color: #ced4d9;">T.T</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><p style="text-align: center;"><span style="color: #ced4d9;">o</span></p><ul><li style="text-align: left;"><span style="color: #ced4d9;">1111</span></li><li style="text-align: left;"><span style="color: #ced4d9;">222</span></li><li style="text-align: left;"><span style="color: #ced4d9;">333</span></li><li style="text-align: left;"><span style="color: #ced4d9;">4</span></li><li style="text-align: left;">&nbsp;</li></ul>`,
         id: taskId,
         members: null,
         title: "Web to do okay? vcn",
         comments: null,
         dueDate: "2025-01-30T08:39:41.890Z",
         status: "uncomplete",
      }
      return data
   }

   async uploadTaskFile(file: File): Promise<TUploadedFileData> {
      const formData = new FormData()
      formData.append("file", file)
      await perfomDelay(1000)
      const data = {
         id: 1,
         // url: "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=ekgd62lu&dl=0",
         url:
            randomInteger(1, 2) % 2 === 0
               ? "https://res.cloudinary.com/doe8ogwij/image/upload/v1734920687/web-xem-phim/images/odlhurychbvf3iukjzkg.jpg"
               : "https://res.cloudinary.com/doe8ogwij/image/upload/v1734891046/web-xem-phim/images/dg0whhotakygd4cja442.png",
      }
      return data
   }

   async getTaskFileDetails(fileId: TTaskFileData["id"]): Promise<TTaskFileData> {
      await perfomDelay(1000)
      const data: TTaskFileData = {
         id: fileId,
         fileName: "file cua loi",
         fileSize: "111KB",
         uploadedAt: "2025-01-21T15:21:45.219Z",
         downloadUrl:
            "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=ekgd62lu&dl=1",
      }
      return data
   }

   async downloadTaskFile(): Promise<void> {
      await perfomDelay(1000)
      const { data } = await axios.get(
         "https://www.dropbox.com/scl/fi/ywyj0fc0dh5duf9dtlx3k/Bai-tap-Thuc-hanh-SQL.pdf?rlkey=xwebotclt9umt4njwul48pwt9&st=3yzhcmdq&dl=1",
         { responseType: "blob" },
      )
      console.log(">>> data:", data)
   }
}

export const taskService = new TaskService()
